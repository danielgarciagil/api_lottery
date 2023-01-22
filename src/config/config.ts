import { registerAs } from '@nestjs/config';
import * as Joi from 'joi';

export const config = registerAs('config', () => {
  return {
    POSTGRES: {
      DB_NAME: process.env.DB_NAME,
      DB_USER: process.env.DB_USER,
      DB_PASSWORD: process.env.DB_PASSWORD,
      DB_PORT: Number(process.env.DB_PORT),
      DB_HOST: process.env.DB_HOST,
    },
  };
});

export const validationENV = () => {
  return Joi.object({
    DB_NAME: Joi.string().required(),
    DB_USER: Joi.string().required(),
    DB_PASSWORD: Joi.string().required(),
    DB_PORT: Joi.number().required(),
    DB_HOST: Joi.string().required(),
  });
};

export const enviroments = {
  dev: '.env',
  pro: '.prod.env',
};
