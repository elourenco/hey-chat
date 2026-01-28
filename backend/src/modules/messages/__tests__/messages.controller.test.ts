import type { NextFunction, Request, Response } from "express";
import { MessagesController } from "../messages.controller";

jest.mock("../messages.service", () => ({
  MessagesService: {
    send: jest.fn(),
    listByUser: jest.fn(),
  },
}));

type MessagesServiceMock = {
  send: jest.Mock;
  listByUser: jest.Mock;
};

const messagesServiceMock = jest.requireMock("../messages.service").MessagesService as MessagesServiceMock;

const createResponse = () =>
  ({
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  }) as unknown as Response;

describe("MessagesController", () => {
  it("sends message and returns 201", async () => {
    const req = { body: { from: "user-1", to: "user-2", body: "Hello" } } as Request;
    const res = createResponse();
    const next = jest.fn() as NextFunction;
    const createdMessage = { id: "msg-1", ...req.body };

    messagesServiceMock.send.mockResolvedValue(createdMessage);

    await MessagesController.send(req, res, next);

    expect(messagesServiceMock.send).toHaveBeenCalledWith(req.body);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(createdMessage);
  });

  it("lists messages for user", async () => {
    const req = { params: { userId: "user-1" } } as unknown as Request;
    const res = createResponse();
    const next = jest.fn() as NextFunction;
    const messages = [{ id: "msg-1" }];

    messagesServiceMock.listByUser.mockResolvedValue(messages);

    await MessagesController.list(req, res, next);

    expect(messagesServiceMock.listByUser).toHaveBeenCalledWith("user-1");
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(messages);
  });

  it("forwards errors to next", async () => {
    const req = { params: { userId: "user-1" } } as unknown as Request;
    const res = createResponse();
    const next = jest.fn() as NextFunction;
    const error = new Error("boom");

    messagesServiceMock.listByUser.mockRejectedValue(error);

    await MessagesController.list(req, res, next);

    expect(next).toHaveBeenCalledWith(error);
  });
});
