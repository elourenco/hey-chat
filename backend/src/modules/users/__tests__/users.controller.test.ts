import type { NextFunction, Request, Response } from "express";
import { UsersController } from "../users.controller";

jest.mock("../users.service", () => ({
  UsersService: {
    create: jest.fn(),
    list: jest.fn(),
    findById: jest.fn(),
  },
}));

jest.mock("../../presence", () => ({
  PresenceService: {
    listOnlineIds: jest.fn(),
  },
}));

type UsersServiceMock = {
  create: jest.Mock;
  list: jest.Mock;
  findById: jest.Mock;
};

type PresenceServiceMock = {
  listOnlineIds: jest.Mock;
};

const usersServiceMock = jest.requireMock("../users.service").UsersService as UsersServiceMock;
const presenceServiceMock = jest.requireMock("../../presence").PresenceService as PresenceServiceMock;

const createResponse = () =>
  ({
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  }) as unknown as Response;

describe("UsersController", () => {
  it("creates a user and returns 201", async () => {
    const req = { body: { fullname: "Ada", username: "ada", password: "secret" } } as Request;
    const res = createResponse();
    const next = jest.fn() as NextFunction;
    const createdUser = { id: "user-1", fullname: "Ada", username: "ada" };

    usersServiceMock.create.mockResolvedValue(createdUser);

    await UsersController.create(req, res, next);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(createdUser);
    expect(next).not.toHaveBeenCalled();
  });

  it("lists users with online status", async () => {
    const req = {} as Request;
    const res = createResponse();
    const next = jest.fn() as NextFunction;

    usersServiceMock.list.mockResolvedValue([
      { id: "user-1", fullname: "Ada", username: "ada" },
      { id: "user-2", fullname: "Grace", username: "grace" },
    ]);
    presenceServiceMock.listOnlineIds.mockReturnValue(["user-2"]);

    await UsersController.list(req, res, next);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith([
      { id: "user-1", fullname: "Ada", username: "ada", online: false },
      { id: "user-2", fullname: "Grace", username: "grace", online: true },
    ]);
  });

  it("returns user by id", async () => {
    const req = { params: { id: "user-1" } } as unknown as Request;
    const res = createResponse();
    const next = jest.fn() as NextFunction;

    usersServiceMock.findById.mockResolvedValue({ id: "user-1", fullname: "Ada" });

    await UsersController.getById(req, res, next);

    expect(usersServiceMock.findById).toHaveBeenCalledWith("user-1");
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ id: "user-1", fullname: "Ada" });
  });

  it("forwards errors to next", async () => {
    const req = {} as Request;
    const res = createResponse();
    const next = jest.fn() as NextFunction;
    const error = new Error("boom");

    usersServiceMock.list.mockRejectedValue(error);

    await UsersController.list(req, res, next);

    expect(next).toHaveBeenCalledWith(error);
  });
});
