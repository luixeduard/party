import { Module } from '@nestjs/common';
import { GuestsService } from './guests.service';
import { GuestsController } from './guests.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Guests } from './entities/guests.entity';

@Module({
  imports: [
    SequelizeModule.forFeature(
      [Guests]
    )
  ],
  controllers: [GuestsController],
  providers: [GuestsService],
})
export class GuestsModule {}
