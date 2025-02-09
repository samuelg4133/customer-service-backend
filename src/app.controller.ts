import { Controller, Get } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

@Controller()
@ApiTags("AppController")
export class AppController {
  @Get()
  getHello(): string {
    return "Hello World";
  }
}
