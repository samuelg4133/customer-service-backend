import { Transform } from "class-transformer";
import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  validateSync,
} from "class-validator";

export class Env {
  // @IsString()
  // DATABASE_URL: string;

  // @IsString()
  // JWT_PRIVATE_KEY: string;

  // @IsString()
  // JWT_PUBLIC_KEY: string;

  @IsNumber()
  @Transform(({ value }) => (value ? Number(value) : 3333))
  PORT: number;

  @IsNumber()
  @Transform(({ value }) => (value ? Number(value) : 0))
  REDIS_DB: number;

  @IsString()
  @IsOptional()
  REDIS_HOST: string = "127.0.0.1";

  @IsString()
  @IsOptional()
  REDIS_USER: string;

  @IsString()
  @IsOptional()
  REDIS_PASSWORD?: string;

  @IsNumber()
  @Transform(({ value }) => (value ? Number(value) : 6379))
  REDIS_PORT: number;

  @IsBoolean()
  @Transform(({ value }) => (value ? value === "true" : false))
  REDIS_TLS: boolean;

  public validate() {
    const errors = validateSync(this);

    if (errors.length) {
      return errors.map((error) => ({
        constraints: error.constraints,
        property: error.property,
        value: error.value,
      }));
    }

    return null;
  }
}
