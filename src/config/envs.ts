import "dotenv/config";
import * as Joi from "joi";



interface EnvVars {
  PORT: number;
  DATABASE_URL:string
}

const envSchema = Joi.object({
  PORT: Joi.number().required(),
  DATABASE_URL : Joi.string().required(),
}).unknown(true);

const { error, value } = envSchema.validate(process.env);

if (error) {
  throw new Error(`Error en configuración del servidor: ${error.message}`);
}

const envVars: EnvVars = value;

export const envs = {
  port: envVars.PORT,
  databaseurl:envVars.DATABASE_URL
};
