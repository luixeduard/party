import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { TablesService } from './tables.service';
import { ApiOperation, ApiCreatedResponse, ApiConflictResponse, ApiOkResponse, ApiNotFoundResponse, ApiTags } from '@nestjs/swagger';
import { FindOnePopulateDTO } from 'src/core/global/dto/findOnePopulate.dto';
import { CreateTablesDTO } from './dto/create.dto';
import { FindTablesDTO } from './dto/find.dto';
import { UpdateTablesDTO } from './dto/update.dto';

@ApiTags("Mesas")
@Controller('tables')
export class TablesController {
  constructor(private readonly tablesService: TablesService) { }

  @Post()
  @ApiOperation({
    summary: 'Crear',
    description: 'Método para crear un registro',
  })
  @ApiCreatedResponse({
    description: 'Creado con éxito'
  })
  @ApiConflictResponse({
    description: 'Ocurrio un error al guardar el registro'
  })
  create(@Body() data: CreateTablesDTO) {
    return this.tablesService.create(data);
  }

  @Get()
  @ApiOperation({
    summary: 'Obtener todo',
    description: 'Obtener todos los registros registrados',
  })
  @ApiOkResponse({
    description: 'Obtenido con éxito',
  })
  @ApiConflictResponse({
    description: 'Ocurrio un error al obtener los registros'
  })
  findAll(@Query() query: FindTablesDTO) {
    return this.tablesService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Obtener único',
    description: 'Obtener un unico registro',
  })
  @ApiOkResponse({
    description: 'Obtenido con éxito'
  })
  @ApiConflictResponse({
    description: 'Ocurrio un error al obtener el registro'
  })
  findOne(@Param("id") id: string, @Query() query: FindOnePopulateDTO) {
    return this.tablesService.findOne(id, query);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Actualizar',
    description: 'Actualizar un registro dado su id',
  })
  @ApiOkResponse({
    description: 'Actualizado con éxito',
  })
  @ApiConflictResponse({
    description: 'Ocurrio un error al actualizar el registro'
  })
  @ApiNotFoundResponse({
    description: 'No se encontro el registro'
  })
  update(@Param('id') id: string, @Body() data: UpdateTablesDTO) {
    return this.tablesService.update(id, data);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Eliminar',
    description: 'Eliminar un registro dado su id',
  })
  @ApiOkResponse({
    description: 'Eliminado con éxito',
  })
  @ApiConflictResponse({
    description: 'Ocurrio un error al eliminar el registro'
  })
  @ApiNotFoundResponse({
    description: 'No se encontro el registro'
  })
  remove(@Param('id') id: string) {
    return this.tablesService.remove(id);
  }
}
