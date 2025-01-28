import { SequelizeOptions } from 'sequelize-typescript';

export interface IConfig {
  port: number;
  db: SequelizeOptions;
  env: string;
  local_pass: string;
  app_url: string;
  ENC_KEY: string;
  IV: string;
}