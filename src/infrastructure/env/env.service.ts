import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

import { Env } from "./env.dto";

@Injectable()
export class EnvService {
  constructor(private configService: ConfigService<Env, true>) {}

  get<T extends keyof Env>(key: T): Env[T] {
    return this.configService.get(key, { infer: true }) as Env[T];
  }
}
