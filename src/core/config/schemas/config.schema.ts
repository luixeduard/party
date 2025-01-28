import * as Joi from 'joi';

export const validationSchema = Joi.object({
  //DB
  DB_HOST: Joi.string().required(),
  DB_PORT: Joi.number().required(),
  DB_USER: Joi.string().required(),
  DB_PASS: Joi.string().required(),
  DB_DIALECT: Joi.string().required(),
  DB_NAME: Joi.string().required(),
  //DB CONFIG
  DB_USE_UTC: Joi.boolean().required(),
  DB_TIMEZONE: Joi.string().required(),
  //APP CONFIG
  NODE_ENV: Joi.string().required(),
  LOCAL_PASS: Joi.string().required(),
  PORT: Joi.number().required(),
  APP_URL: Joi.string().required(),
  ENC_KEY: Joi.string().required(),
  IV: Joi.string().required(),
});