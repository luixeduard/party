import { Module } from '@nestjs/common';
import { TablesService } from './tables.service';
import { TablesController } from './tables.controller';
import { Tables } from './entities/tables.entity';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [
    SequelizeModule.forFeature(
      [Tables]
    )
  ],
  controllers: [TablesController],
  providers: [TablesService],
})
export class TablesModule { }
