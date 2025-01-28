import { Injectable } from '@nestjs/common';
import { Tables } from './entities/tables.entity';
import { InjectModel } from '@nestjs/sequelize';
import { BaseService } from 'src/core/services/global.service';
import { CreateTablesDTO } from './dto/create.dto';
import { UpdateTablesDTO } from './dto/update.dto';
import { FindTablesDTO } from './dto/find.dto';

@Injectable()
export class TablesService extends BaseService<Tables, CreateTablesDTO, FindTablesDTO, UpdateTablesDTO>{
  constructor(@InjectModel(Tables) private readonly TablesModel: typeof Tables) {
    super(TablesModel, "Tables")
  }
}