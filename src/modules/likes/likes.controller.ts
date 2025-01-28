import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { LikesService } from './likes.service';
import { ApiConflictResponse, ApiConsumes, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { FindOnePopulateDTO } from 'src/core/global/dto/findOnePopulate.dto';
import { CreateLikesDTO } from './dto/create.dto';
import { FindLikesDTO } from './dto/find.dto';
import { UpdateLikesDTO } from './dto/update.dto';

@ApiTags("Gustos")
@Controller('likes')
@ApiConsumes('application/json', 'application/x-www-form-urlencoded')
export class LikesController {
  constructor(private readonly likesService: LikesService) { }

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
  create(@Body() data: CreateLikesDTO) {
    return this.likesService.create(data);
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
  findAll(@Query() query: FindLikesDTO) {
    return this.likesService.findAll(query);
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
    return this.likesService.findOne(id, query);
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
  update(@Param('id') id: string, @Body() data: UpdateLikesDTO) {
    return this.likesService.update(id, data);
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
    return this.likesService.remove(id);
  }
}
