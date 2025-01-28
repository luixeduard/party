import { Model, ModelCtor } from "sequelize-typescript";
import { FindAndCountOptions, Attributes } from "sequelize";
import getQuery, { cleanKeys, getConditions, getIncludes, getPaggination, getSearch } from "src/libs/queries";
import { NotFoundException } from "@nestjs/common";
import { Transaction } from 'sequelize'
import { FindOnePopulateDTO } from "../global/dto/findOnePopulate.dto";
import { PaggingDTO } from "../global/dto/pagging.dto";

export interface IBaseService<M, TCreate, TFind, TUpdate> {
  create(data: TCreate): Promise<Model<TCreate, TCreate>>;
  findAll(query: TFind): Promise<{ rows: M[], count: number, skip?: number, limit?: number }>;
  findOne(id: string, data: FindOnePopulateDTO): Promise<M>;
  update(id: string, data: TUpdate): Promise<Model<any, any>>;
  remove(id: string): Promise<number>
  restore(id: string): Promise<void>
};

export class BaseService<M extends Model, TCreate, TFind extends PaggingDTO, TUpdate> implements IBaseService<M, TCreate, TFind, TUpdate> {
  protected Model!: ModelCtor<M>;
  protected table_name: string;
  constructor(Model: ModelCtor<M>, table_name: string) {
    this.Model = Model;
    this.table_name = table_name
  }

  async create(data: TCreate) {
    const newRecord = this.Model.build<Model<TCreate>>(data as any);
    await newRecord.validate();
    await newRecord.save();
    await newRecord.reload();
    return newRecord
  }

  async findAll(query: TFind) {
    const paggination = getPaggination(query)
    const querySequelice: Omit<FindAndCountOptions<Attributes<M>>, 'group'> = {};
    getConditions(query, querySequelice);
    const includes = getIncludes(query)
    getSearch(query, querySequelice, this.table_name)
    const data = await this.Model.findAndCountAll<M>(getQuery(query, querySequelice, paggination, includes));
    return { page: query.page, records: query.records, ...data }
  }

  findOne(id: string, { paranoid, include: includeParams, rows }: FindOnePopulateDTO, transaction?: Transaction) {
    const include = getIncludes({ includeParams, rows });
    const attributes = rows ? cleanKeys(rows).split(",").filter(row => !row.includes('.')) : undefined;
    return this.Model.findByPk<M>(id, { ...include, paranoid, attributes, transaction });
  }

  async update(id: string, data: TUpdate) {
    const [affectedRows, rows] = await this.Model.update<Model<any, any>>(data, { where: { id } as any, returning: true })
    if (affectedRows === 0) {
      throw new NotFoundException('Registro no encontrado')
    }
    return rows[0]
  }

  remove(id: string) {
    return this.Model.sequelize.transaction(async transaction => {
      const find = await this.Model.findByPk(id, { transaction });
      if (!find) {
        throw new NotFoundException("No se encontro el registro a eliminar")
      }
      return this.Model.destroy<Model<{ id: string }>>({ where: { id }, individualHooks: true, transaction });
    })
  }

  restore(id: string) {
    return this.Model.restore<Model<{ id: string }>>({ where: { id }, individualHooks: true });
  }
}