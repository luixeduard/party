import { Op, Order, Includeable, FindOptions, FindAndCountOptions, Attributes, where, cast, col, literal } from 'sequelize';
import { ForbiddenException } from '@nestjs/common';
import { Model } from 'sequelize-typescript';
import { PaggingDTO } from 'src/core/global/dto/pagging.dto';

export function getConditions<Query extends PaggingDTO, M extends Model>(query: Query, querySequelice: Omit<FindAndCountOptions<Attributes<M>>, 'group'>) {
  //Del query que mandaron filtramos todos los elementos con keys que no ocupamos o puedan hacer algun fallo
  const keys = Object.keys(query).filter(value => !["rows", "include", "search", "records", "page", "order", "deletedAt", "paranoid"].includes(value));
  //Por cada key vamos a obtener la condición mencionada
  keys.forEach(key => {
    if (query[key]) {
      querySequelice[key] = query[key];
    }
  })
}

/**
 * Obtiene las busquedas a realizar del find
 * @param query Query que llega del usuario
 * @param querySequelice Query final de sequelize
 */
export function getSearch<Query extends PaggingDTO, M extends Model>(query: Query, querySequelice: Omit<FindAndCountOptions<Attributes<M>>, 'group'>, table_name: string) {
  if (query.search && query.rows) {
    const rows: string[] = query.rows.split(",");
    const search = `%${query.search.toUpperCase()}%`;
    querySequelice[Op.or] = rows.filter(row => !(row === 'id' || row.endsWith('_id'))).map(row => { return getCol(row, search, table_name) });
  }
}

function getCol(row: string, search: string, table_name: string) {
  if (row.includes(":")) return formatKeySearch(row, search, table_name);
  else if (row.includes('.')) return where(col(row), { [Op.iLike]: search })
  return { [row]: { [Op.iLike]: search } }
}

export function formatKeySearch(row: string, search: string, table_name: string) {
  const [key, type] = row.split(/::?/);
  const col_name = `${row.includes('.') ? '' : `${table_name}.`}${key}`
  switch (type) {
    case 'BOOLEAN':
      return literal(`CASE WHEN "${col_name.split('.').join('"."')}" THEN 'SI' ELSE 'NO' END ILIKE '${search}'`);
    default:
      return where(cast(col(table_name), 'varchar'), { [Op.iLike]: search })
  }
}

/**
 * 
 * @param value nombre del field a popular
 * @returns Inclusion de sequelize con parametros de paranoid
 */
function getAssociationName(value: string): Includeable {
  //QUITAMOS LOS + - y # por uno unico, si aparece una vez no tiene sentido tener muchos
  value = value.replace(/-+/g, '-').replace(/\++/g, '+').replace(/#+/g, '#')
  //Extraemos si existe paranoid o required o demas
  const [paranoid, required] = [value.includes('+'), value.includes('-'), , value.includes('#')]
  //QUITAMOS LOS CARACTERES ESPECIALES
  value = value.replace(/-+/g, '').replace(/\++/g, '').replace(/#+/g, '')
  //INSTANCIAMOS EL INCLUDEABLE
  const include: Includeable = {}
  if (paranoid) { //SI EXISTE PARANOID, QUITAMOS EL PARANOID TRUE
    include.paranoid = false
  }
  if (required) { //SI EXISTE REQUIRED, QUITAMOS EL REQUIRED
    include.required = true
  }
  if (value.endsWith('_id')) {
    value = value.replace('_id', '')
  }
  include.association = value
  if (!value) {
    return undefined
  }
  return include
}

/**
 * 
 * @param elemt el objeto, string o array
 * @returns FindOptions o Includeable
 */
function transformerIncludes(elemt: any): FindOptions | Includeable {
  //INSTANCIAMOS EL FIND OPTION
  const includes: FindOptions = {};
  //INICIALIZAMOS EL INCLUDE
  includes.include = []
  //SI EL ELEMENTO PASADO ES UN ARREGLO
  if (Array.isArray(elemt)) {
    const values = Object.values(elemt); //OBTENEMOS LOS ELEMENTOS DEL ARREGLO
    values.forEach((value) => {//POR CADA ELEMENTO DEL ARREGLO
      (includes.include as Includeable[]).push(transformerIncludes(value) as Includeable)
    });
  } else {
    //SI EL ELEMENTO ES UN STRING
    if (typeof elemt === 'string') {
      //RETORNAMOS EL MODELO DEPENDIENDO DE LA CLAVE 
      return getAssociationName(elemt)
      //SI EL ELEMENTO ES UN OBJETO
    } else if (typeof elemt === 'object') {
      //OBTENEMOS EL PAIR
      const [[key, value]] = Object.entries(elemt);
      //OBTENEMOS EL INCLUDE DEL KEY Y ESTABLECEMOS COMO PADRE
      const include: any = getAssociationName(key)
      //SI EXISTE EL INCLUDE
      if (include) {
        //OBTENEMOS LOS INCLUDE DE TODOS LOS ELEMENTOS DEL ARRAY
        const includes = transformerIncludes(value) as FindOptions
        //AGREGAMOS EN LOS CHILDREN (INCLUDE) TODOS LOS ELEMENTOS DEPENDIENTES
        includes.include = (includes.include as Includeable[]).filter((value: any) => value !== undefined)
        //AGREGAMOS EN INCLUDE EL INCLUDE RECIEN CREADO
        include.include = includes.include
      }
      return include
    } else {
      //SI PASAN ALGO QUE NO ES UN OBJETO O STRING O ARRAY
      throw new ForbiddenException('Error en la consulta de include')
    }
  }
  //FILTRAMOS TODO LO QUE SEA INDEFINIDO (NO PUSIMOS EN EL getModelName)
  includes.include = includes.include.filter(value => value !== undefined)
  return includes
}

export function getIncludes<Query extends PaggingDTO>(query: Query): FindOptions {
  if (query.include) {
    //TRANSFORMAMOS A UN JSON EL INCLUDES
    const includesPattern = JSON.parse(query.include)
    //OBTENEMOS EL ARRAY DE INCLUDES
    const includes = transformerIncludes(includesPattern) as FindOptions
    //SI NOS PASARON ROWS
    if (query.rows) {
      //OBTENEMOS TODOS LOS ROWS UNICAMENTE DE LOS INCLUDES
      const rows: string[] = query.rows.replaceAll(' ', '').split(",").filter(row => row.includes('.'));
      //POR CADA ROW A MOSTRAR
      rows.forEach((row: string) => {
        //SETEAMOS EL NIVEL 0 DEL INCLUDES
        let includesRec = includes.include as any[];
        //ROMPEMOS EL ROWS
        const rows = row.split(".");
        //OBTENEMOS EL KEY QUE VAMOS A MOSTRAR SOLAMENTE Y LOS DEMAS ROWS
        const [key, mapping] = [rows.slice(-1), rows.slice(0, -1)]
        //SI NO HAY CLAVE MANDAMOS ERROR
        if (!key[0] || mapping.length === 0) {
          throw new ForbiddenException(`No se definio la clave del populate`)
        }
        //POR CADA ELEMENTO DEL MAPEO
        mapping.forEach((m, index) => {
          //BUSCAMOS SI EXISTE
          const include = includesRec.find(include => include.association === m)
          //SI NO EXISTE ERROR
          if (!include) {
            throw new ForbiddenException(`No existe el include con clave: ${mapping}`)
          }
          //SI ESTAMOS AUN SIN FINALIZAR Y HAY HIJOS EN EL INCLUDE ACTUAL ESTABLECEMOS EL NUEVO NIVEL
          if (include.include && index < (mapping.length - 1)) {
            includesRec = include.include
            //SI EL INDICE FINALIZO VERIFICAMOS QUE EXISTA ATTRIBUTES Y AGREGAMOS LA KEY
          } else if (index == (mapping.length - 1)) {
            if (!include.attributes) {
              include.attributes = []
            }
            include.attributes.push(key[0].includes("::") ? key[0].substring(0, key[0].indexOf(':')): key[0])
          } else {
            throw new ForbiddenException(`El populate es incorrecto`)
          }
        })

      })
    }
    return includes
  }
  return {}
}

export function getOrder<Query extends PaggingDTO>(query: Query) {
  const order = query.order.split(' ');
  if (order[0].includes('.')) {
    const modelCol = order[0].split('.');
    return [[modelCol[0], modelCol[1], order[1]]]
  }
  return [[order[0], order[1]]]
}

export default function getQuery<Query extends PaggingDTO, M extends Model>(query: Query, querySequelice: Omit<FindAndCountOptions<Attributes<M>>, 'group'>, paggination: {skip?: number, limit?: number}, includes?: any, attributes?: any) {
  const total: Omit<FindAndCountOptions<Attributes<M>>, 'group'> = { ...includes, where: querySequelice };
  if (query.rows && !attributes) {
    total.attributes = cleanKeys(query.rows).split(",").filter(row => !row.includes('.'));
  } else {
    total.attributes = attributes
  }
  if (paggination.skip) {
    total.offset = paggination.skip;
  }
  if (paggination.limit) {
    total.limit = paggination.limit;
  }
  if ("paranoid" in query) {
    total.paranoid = query.paranoid
  }
  if ("deletedAt" in query) {
    (total.where as any).deletedAt = query.deletedAt ? { [Op.ne]: null } : null
  }
  if (query.order) {
    total.order = getOrder(query) as Order
  }
  return total
}

export function getPaggination<Query extends PaggingDTO>({records, page}: Query) {
  if (!isNaN(page) && !isNaN(records)) {
    return { limit: records, skip: records * page }
  }
  return {}
}

export function cleanKeys(text: string) {
  return text.replace(/::?\w*/g, "");
}