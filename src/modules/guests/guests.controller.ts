import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Redirect, UnauthorizedException, UseGuards } from '@nestjs/common';
import { GuestsService } from './guests.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiBasicAuth, ApiConflictResponse, ApiConsumes, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { FindOnePopulateDTO } from 'src/core/global/dto/findOnePopulate.dto';
import { CreateGuestsDTO } from './dto/create.dto';
import { FindGuestsDTO } from './dto/find.dto';
import { UpdateGuestsDTO } from './dto/update.dto';
import { ConfigService } from '@nestjs/config';
import { encryptID } from 'src/libs/hashing';

@ApiTags("Invitados")
@Controller('guests')
export class GuestsController {
  constructor(
    private readonly guestsService: GuestsService,
    private readonly configService: ConfigService
  ) { }

  @Post()
  @UseGuards(AuthGuard('basic'))
  @ApiBasicAuth()
  @ApiConsumes('application/json', 'application/x-www-form-urlencoded')
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
  async create(@Body() data: CreateGuestsDTO) {
    const guest = await this.guestsService.create(data);
    const url = `${this.configService.get("app_url")}/api/guests/verify_invitation/${encodeURIComponent(encryptID(guest.id))}`
    return {...guest.get(), url }
  }

  @Get()
  @UseGuards(AuthGuard('basic'))
  @ApiBasicAuth()
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
  findAll(@Query() query: FindGuestsDTO) {
    return this.guestsService.findAll(query);
  }

  @Get(':id')
  @UseGuards(AuthGuard('basic'))
  @ApiBasicAuth()
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
    return this.guestsService.findOne(id, query);
  }

  @Get('verify_invitation/:id')
  @Redirect(process.env.APP_URL, 302)
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
  async verify(@Param("id") id: string) {
    const guest = await this.guestsService.findOne(id, {});
    if (!guest) {
      return { url: `${this.configService.get("app_url")}/no_invitation` };
    }
    if (!guest.confirmated) {
      return { url: `${this.configService.get("app_url")}/update_registry/${encodeURIComponent(encryptID(guest.id))}` };
    }
    return { url: `${this.configService.get("app_url")}/welcome/${encodeURIComponent(encryptID(guest.id))}` };
  }

  @Patch(':id')
  @UseGuards(AuthGuard('basic'))
  @ApiBasicAuth()
  @ApiConsumes('application/json', 'application/x-www-form-urlencoded')
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
  update(@Param('id') id: string, @Body() data: UpdateGuestsDTO) {
    return this.guestsService.update(id, data);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('basic'))
  @ApiBasicAuth()
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
    return this.guestsService.remove(id);
  }
}
