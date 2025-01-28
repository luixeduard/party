import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { GuestLikesService } from './guest_likes.service';
import { ApiConflictResponse, ApiConsumes, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateGuestLikesDTO } from './dto/create.dto';
import { FindGuestLikesDTO } from './dto/find.dto';
import { UpdateGuestLikesDTO } from './dto/update.dto';
import { FindOnePopulateDTO } from 'src/core/global/dto/findOnePopulate.dto';

@ApiTags("Invitados - Gustos")
@Controller('guest-likes')
@ApiConsumes('application/json', 'application/x-www-form-urlencoded')
export class GuestLikesController {
  constructor(private readonly guestLikesService: GuestLikesService) { }
  
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
  create(@Body() data: CreateGuestLikesDTO) {
    return this.guestLikesService.create(data);
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
  findAll(@Query() query: FindGuestLikesDTO) {
    return this.guestLikesService.findAll(query);
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
    return this.guestLikesService.findOne(id, query);
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
  update(@Param('id') id: string, @Body() data: UpdateGuestLikesDTO) {
    return this.guestLikesService.update(id, data);
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
    return this.guestLikesService.remove(id);
  }
}
