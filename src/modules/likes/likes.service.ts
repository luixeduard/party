import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/core/services/global.service';
import { Likes } from './entities/likes.entity';
import { CreateLikesDTO } from './dto/create.dto';
import { FindLikesDTO } from './dto/find.dto';
import { UpdateLikesDTO } from './dto/update.dto';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class LikesService extends BaseService<Likes, CreateLikesDTO, FindLikesDTO, UpdateLikesDTO>{
  constructor(@InjectModel(Likes) private readonly LikesModel: typeof Likes) {
    super(LikesModel, "Likes")
  }
}
