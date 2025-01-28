import { Module } from '@nestjs/common';
import { TableLikesService } from './table_likes.service';
import { TableLikesController } from './table_likes.controller';
import { TableLikes } from './entities/table_likes.entity';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [
    SequelizeModule.forFeature(
      [TableLikes]
    )
  ],
  controllers: [TableLikesController],
  providers: [TableLikesService],
})
export class TableLikesModule { }
