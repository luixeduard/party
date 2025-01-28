import { Module } from '@nestjs/common';
import { GuestLikesService } from './guest_likes.service';
import { GuestLikesController } from './guest_likes.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { GuestLikes } from './entities/guest_likes.entity';

@Module({
  imports: [
    SequelizeModule.forFeature(
      [GuestLikes]
    )
  ],
  controllers: [GuestLikesController],
  providers: [GuestLikesService],
})
export class GuestLikesModule { }
