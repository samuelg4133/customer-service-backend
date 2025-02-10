import { BadRequestException, ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { NestExpressApplication } from "@nestjs/platform-express";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

import { description, title, version } from "../package.json";
import { AppModule } from "./app.module";
import { EnvService } from "./infrastructure/env/env.service";
import { AppErrorFilter } from "./infrastructure/http/filters/app-error.filter";
import { RedisIoAdapter } from "./infrastructure/websocket/redis-io.adapter";

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const configService = app.get(EnvService);
  const port = configService.get("PORT");

  const redisIoAdapter = new RedisIoAdapter(app, configService);
  await redisIoAdapter.connectToRedis();

  app.enableCors({
    origin: "*",
  });

  app.useWebSocketAdapter(redisIoAdapter);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      exceptionFactory(errors) {
        const errorMessages = errors.map((error) => ({
          constraints: error.constraints,
          property: error.property,
          value: error.value,
        }));
        return new BadRequestException({
          code: "validation",
          errors: errorMessages,
          message: "Validation failed",
        });
      },
    }),
  );

  app.useGlobalFilters(new AppErrorFilter());

  const config = new DocumentBuilder()
    .setTitle(title)
    .setDescription(description)
    .setVersion(version)
    .addSecurity("Auth", {
      bearerFormat: "Bearer",
      description: "Bearer <JWT>",
      in: "Header",
      name: "Authorization",
      scheme: "Bearer",
      type: "http",
    })
    .addSecurityRequirements("Auth")
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document);

  await app.listen(port);
}
void bootstrap();
