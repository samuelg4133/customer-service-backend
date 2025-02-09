import { Module } from "@nestjs/common";

import { AppController } from "./app.controller";
import { InfraModule } from "./infrastructure/infrasctructure.module";

@Module({
  imports: [InfraModule],
  controllers: [AppController],
})
export class AppModule {}
