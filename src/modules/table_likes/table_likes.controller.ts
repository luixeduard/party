import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { TableLikesService } from './table_likes.service';
import { ApiOperation, ApiCreatedResponse, ApiConflictResponse, ApiOkResponse, ApiNotFoundResponse, ApiTags } from '@nestjs/swagger';
import { FindOnePopulateDTO } from 'src/core/global/dto/findOnePopulate.dto';
import { CreateTableLikesDTO } from './dto/create.dto';
import { FindTableLikesDTO } from './dto/find.dto';
import { UpdateTableLikesDTO } from './dto/update.dto';

@ApiTags("Mesas - Gustos")
@Controller('table-likes')
export class TableLikesController {
  constructor(private readonly tableLikesService: TableLikesService) { }

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
  create(@Body() data: CreateTableLikesDTO) {
    return this.tableLikesService.create(data);
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
  findAll(@Query() query: FindTableLikesDTO) {
    return this.tableLikesService.findAll(query);
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
    return this.tableLikesService.findOne(id, query);
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
  update(@Param('id') id: string, @Body() data: UpdateTableLikesDTO) {
    return this.tableLikesService.update(id, data);
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
    return this.tableLikesService.remove(id);
  }
}
