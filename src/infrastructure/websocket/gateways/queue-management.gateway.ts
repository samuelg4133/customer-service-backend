import { SubscribeMessage, WebSocketGateway } from "@nestjs/websockets";

@WebSocketGateway()
export class QueueManagementGateway {
  @SubscribeMessage("message")
  handleMessage(): string {
    return "Hello world!";
  }
}
