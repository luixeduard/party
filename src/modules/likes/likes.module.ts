import { Module } from '@nestjs/common';
import { LikesService } from './likes.service';
import { LikesController } from './likes.controller';
import { Likes } from './entities/likes.entity';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [
    SequelizeModule.forFeature(
      [Likes]
    )
  ],
  controllers: [LikesController],
  providers: [LikesService],
})
export class LikesModule { }
