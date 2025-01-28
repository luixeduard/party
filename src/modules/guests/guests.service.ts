import { Injectable } from '@nestjs/common';
import { Guests } from './entities/guests.entity';
import { InjectModel } from '@nestjs/sequelize';
import { BaseService } from 'src/core/services/global.service';
import { CreateGuestsDTO } from './dto/create.dto';
import { FindGuestsDTO } from './dto/find.dto';
import { UpdateGuestsDTO } from './dto/update.dto';

@Injectable()
export class GuestsService extends BaseService<Guests, CreateGuestsDTO, FindGuestsDTO, UpdateGuestsDTO>{
  constructor(@InjectModel(Guests) private readonly GuestsModel: typeof Guests) {
    super(GuestsModel, "Guests")
  }
}
