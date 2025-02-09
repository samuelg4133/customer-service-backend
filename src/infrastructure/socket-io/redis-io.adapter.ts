import { INestApplicationContext } from "@nestjs/common";
import { IoAdapter } from "@nestjs/platform-socket.io";
import { createAdapter } from "@socket.io/redis-adapter";
import { createClient } from "redis";
import { Server, ServerOptions } from "socket.io";

import { EnvService } from "../env/env.service";

export class RedisIoAdapter extends IoAdapter {
  private adapterConstructor: ReturnType<typeof createAdapter>;

  constructor(
    appOrHttpServer: INestApplicationContext | object,
    private readonly env: EnvService,
  ) {
    super(appOrHttpServer);
    this.connectToRedis();
  }

  async connectToRedis(): Promise<void> {
    const pubClient = createClient({
      username: this.env.get("REDIS_USER"),
      password: this.env.get("REDIS_PASSWORD"),
      database: this.env.get("REDIS_DB"),
      socket: {
        host: this.env.get("REDIS_HOST"),
        port: this.env.get("REDIS_PORT"),
        tls: this.env.get("REDIS_TLS"),
      },
    });
    const subClient = pubClient.duplicate();

    await Promise.all([pubClient.connect(), subClient.connect()]);

    this.adapterConstructor = createAdapter(pubClient, subClient);
  }

  createIOServer(port: number, options?: ServerOptions): Server {
    const server = super.createIOServer(port, options) as Server;
    server.adapter(this.adapterConstructor);
    return server;
  }
}
