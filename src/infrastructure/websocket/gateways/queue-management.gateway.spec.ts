import { Test, TestingModule } from "@nestjs/testing";

import { QueueManagementGateway } from "./queue-management.gateway";

describe("QueueManagementGateway", () => {
  let gateway: QueueManagementGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QueueManagementGateway],
    }).compile();

    gateway = module.get<QueueManagementGateway>(QueueManagementGateway);
  });

  it("should be defined", () => {
    expect(gateway).toBeDefined();
  });
});
