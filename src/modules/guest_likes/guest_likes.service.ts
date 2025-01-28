import { Injectable } from '@nestjs/common';
import { GuestLikes } from './entities/guest_likes.entity';
import { InjectModel } from '@nestjs/sequelize';
import { BaseService } from 'src/core/services/global.service';
import { CreateGuestLikesDTO } from './dto/create.dto';
import { FindGuestLikesDTO } from './dto/find.dto';
import { UpdateGuestLikesDTO } from './dto/update.dto';

@Injectable()
export class GuestLikesService extends BaseService<GuestLikes, CreateGuestLikesDTO, FindGuestLikesDTO, UpdateGuestLikesDTO>{
  constructor(@InjectModel(GuestLikes) private readonly GuestLikesModel: typeof GuestLikes) {
    super(GuestLikesModel, "GuestLikes")
  }
}