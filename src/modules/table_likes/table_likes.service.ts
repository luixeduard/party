import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { BaseService } from 'src/core/services/global.service';
import { CreateTableLikesDTO } from './dto/create.dto';
import { FindTableLikesDTO } from './dto/find.dto';
import { UpdateTableLikesDTO } from './dto/update.dto';
import { TableLikes } from './entities/table_likes.entity';

@Injectable()
export class TableLikesService extends BaseService<TableLikes, CreateTableLikesDTO, FindTableLikesDTO, UpdateTableLikesDTO>{
  constructor(@InjectModel(TableLikes) private readonly TableLikesModel: typeof TableLikes) {
    super(TableLikesModel, "TableLikes")
  }
}
