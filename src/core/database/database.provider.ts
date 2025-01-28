import { SequelizeOptions } from 'sequelize-typescript';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Client } from 'pg'
import { SequelizeModule } from '@nestjs/sequelize';
import { Guests } from 'src/modules/guests/entities/guests.entity';
import { Likes } from 'src/modules/likes/entities/likes.entity';
import { Tables } from 'src/modules/tables/entities/tables.entity';
import { GuestLikes } from 'src/modules/guest_likes/entities/guest_likes.entity';
import { TableLikes } from 'src/modules/table_likes/entities/table_likes.entity';

async function createDatabaseIfNotExists(config: SequelizeOptions) {
  const client = new Client({
    user: config.username,
    password: config.password,
    host: config.host,
    port: config.port,
    database: 'postgres',
  });

  try {
    await client.connect();
    const {rows} = await client.query(`SELECT datname FROM pg_database;`);
    if (rows.find((row: {datname: string}) => row.datname === config.database)) {
      return
    }
    await client.query(`CREATE DATABASE ${config.database}`);
    console.info('Database created or already exists.');
  } catch (error) {
    console.error('Error creating database:', error);
  } finally {
    await client.end();
  }
}

export const DatabaseModules = [
  SequelizeModule.forRootAsync({
    imports: [ConfigModule],
    useFactory: async (configService: ConfigService) => {
      const config = configService.get<SequelizeOptions>('db')
      await createDatabaseIfNotExists(config)
      return {
        ...config,
        autoLoadModels: true,
        synchronize: true,
        models: [
          Guests,
          Likes,
          Tables,
          GuestLikes,
          TableLikes
        ]
      }
    },
    inject: [ConfigService],
  }),
]
