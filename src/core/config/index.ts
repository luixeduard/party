
import { Dialect } from 'sequelize';
import { IConfig } from './interface/config.interface';

export function config(): IConfig {
  
  const env = process.env.NODE_ENV;
  
  function getName(name: string) {
    switch (process.env.NODE_ENV) {
      case 'production':
        return `${name}_production`;
      case 'test':
        return `${name}_test`;
      default:
        return `${name}_development`;
    }  
  }

  return {
    port: Number(process.env.PORT),
    local_pass: process.env.LOCAL_PASS,
    app_url: process.env.APP_URL,
    ENC_KEY: process.env.ENC_KEY,
    IV: process.env.IV,
    db: {
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: getName(process.env.DB_NAME),
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      dialect: (process.env.DB_DIALECT as Dialect),
      ...process.env.DB_USE_UTC === 'true' && {
        dialectOptions: {
          useUTC: process.env.DB_USE_UTC === 'true'
        },
        timezone: process.env.DB_TIMEZONE
      },
      logging: true
    },
    env,
  };
}