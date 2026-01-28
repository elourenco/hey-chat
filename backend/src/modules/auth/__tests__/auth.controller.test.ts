import type { NextFunction, Request, Response } from "express";
import { AuthController } from "../auth.controller";

jest.mock("../auth.service", () => ({
  AuthService: {
    register: jest.fn(),
    issueToken: jest.fn(),
  },
}));

type AuthServiceMock = {
  register: jest.Mock;
  issueToken: jest.Mock;
};

const authServiceMock = jest.requireMock("../auth.service").AuthService as AuthServiceMock;

const createResponse = () =>
  ({
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  }) as unknown as Response;

describe("AuthController", () => {
  it("registers user and returns 201", async () => {
    const req = { body: { fullname: "Ada", username: "ada", password: "secret" } } as Request;
    const res = createResponse();
    const next = jest.fn() as NextFunction;
    const createdUser = { id: "user-1", fullname: "Ada", username: "ada" };

    authServiceMock.register.mockResolvedValue(createdUser);

    await AuthController.register(req, res, next);

    expect(authServiceMock.register).toHaveBeenCalledWith(req.body);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(createdUser);
  });

  it("issues token for authenticated user", async () => {
    const user = { id: "user-1", username: "ada", fullname: "Ada" };
    const req = { user } as Request & { user: typeof user };
    const res = createResponse();
    const next = jest.fn() as NextFunction;
    const token = { token: "signed-token" };

    authServiceMock.issueToken.mockReturnValue(token);

    await AuthController.login(req, res, next);

    expect(authServiceMock.issueToken).toHaveBeenCalledWith(user);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(token);
  });

  it("forwards unauthorized errors when user is missing", async () => {
    const req = {} as Request;
    const res = createResponse();
    const next = jest.fn() as NextFunction;

    await AuthController.login(req, res, next);

    expect(next).toHaveBeenCalled();
    const error = (next as jest.Mock).mock.calls[0][0] as Error;
    expect(error.message).toBe("Unauthorized");
  });
});
