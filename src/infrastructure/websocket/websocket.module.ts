import { Module } from "@nestjs/common";

import { QueueManagementGateway } from "./gateways/queue-management.gateway";

@Module({
  providers: [QueueManagementGateway],
})
export class WebsocketModule {}
