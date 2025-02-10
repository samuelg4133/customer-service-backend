import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { plainToInstance } from "class-transformer";

import { Env } from "./env/env.dto";
import { EnvModule } from "./env/env.module";
import { WebsocketModule } from "./websocket/websocket.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (env) => {
        const values = plainToInstance(Env, env);
        const errors = values.validate();

        if (errors) {
          console.error(errors);
        }

        return values;
      },
      isGlobal: true,
    }),
    EnvModule,
    WebsocketModule,
  ],
})
export class InfraModule {}
