import { MessagesService } from "../messages.service";
import type { SendMessagePayload } from "../messages.types";

jest.mock("../../../config/prisma", () => ({
  prisma: {
    message: {
      create: jest.fn(),
      findMany: jest.fn(),
    },
  },
}));

type PrismaMock = {
  message: {
    create: jest.Mock;
    findMany: jest.Mock;
  };
};

const prismaMock = jest.requireMock("../../../config/prisma").prisma as PrismaMock;

describe("MessagesService", () => {
  it("persists a new message", async () => {
    const payload: SendMessagePayload = {
      from: "user-1",
      to: "user-2",
      body: "Hello!",
    };
    const createdMessage = { id: "msg-1", ...payload, createdAt: new Date() };

    prismaMock.message.create.mockResolvedValue(createdMessage);

    const result = await MessagesService.send(payload);

    expect(prismaMock.message.create).toHaveBeenCalledWith({ data: payload });
    expect(result).toEqual(createdMessage);
  });

  it("lists messages by user with descending order", async () => {
    const messages = [{ id: "msg-1", from: "user-1", to: "user-2", body: "Hi" }];
    prismaMock.message.findMany.mockResolvedValue(messages);

    const result = await MessagesService.listByUser("user-1");

    expect(prismaMock.message.findMany).toHaveBeenCalledWith({
      where: {
        OR: [{ from: "user-1" }, { to: "user-1" }],
      },
      orderBy: { createdAt: "desc" },
    });
    expect(result).toEqual(messages);
  });
});
