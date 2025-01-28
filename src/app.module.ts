import { Module } from '@nestjs/common';
import { GuestsModule } from './modules/guests/guests.module';
import { TablesModule } from './modules/tables/tables.module';
import { TableLikesModule } from './modules/table_likes/table_likes.module';
import { GuestLikesModule } from './modules/guest_likes/guest_likes.module';
import { LikesModule } from './modules/likes/likes.module';
import { ConfigModule } from '@nestjs/config';
import { validationSchema } from './core/config/schemas/config.schema';
import { config } from './core/config';
import { DatabaseModules } from './core/database/database.provider';
import { BasicStrategy } from './core/strategies/basic.strategy';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema,
      envFilePath: '.env',
      load: [config],
    }),
    ...DatabaseModules,
    GuestsModule,
    TablesModule,
    TableLikesModule,
    GuestLikesModule,
    LikesModule
  ],
  controllers: [],
  providers: [BasicStrategy],
})
export class AppModule {}
