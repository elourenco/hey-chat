import { AuthService } from "../auth.service";
import type { RegisterPayload } from "../auth.types";

jest.mock("../../users/users.service", () => ({
  UsersService: {
    findByUsername: jest.fn(),
    create: jest.fn(),
  },
}));

jest.mock("jsonwebtoken", () => ({
  __esModule: true,
  default: { sign: jest.fn() },
}));

type UsersServiceMock = {
  findByUsername: jest.Mock;
  create: jest.Mock;
};

const usersServiceMock = jest.requireMock(
  "../../users/users.service",
).UsersService as UsersServiceMock;

const jwtMock = (
  jest.requireMock("jsonwebtoken") as { default: { sign: jest.Mock } }
).default;

describe("AuthService", () => {
  beforeEach(() => {
    process.env.JWT_SECRET = "secret";
    process.env.JWT_EXPIRES_IN = "1h";
  });

  afterEach(() => {
    delete process.env.JWT_SECRET;
    delete process.env.JWT_EXPIRES_IN;
  });

  it("registers a new user when username is available", async () => {
    const payload: RegisterPayload = {
      fullname: "Ada Lovelace",
      username: "ada",
      password: "secret",
    };
    const createdUser = {
      id: "user-1",
      fullname: payload.fullname,
      username: payload.username,
      createdAt: new Date("2024-01-01T00:00:00.000Z"),
      updatedAt: new Date("2024-01-01T00:00:00.000Z"),
    };

    usersServiceMock.findByUsername.mockResolvedValue(null);
    usersServiceMock.create.mockResolvedValue(createdUser);

    const result = await AuthService.register(payload);

    expect(usersServiceMock.findByUsername).toHaveBeenCalledWith(payload.username);
    expect(usersServiceMock.create).toHaveBeenCalledWith(payload);
    expect(result).toEqual(createdUser);
  });

  it("throws when username already registered", async () => {
    usersServiceMock.findByUsername.mockResolvedValue({ id: "user-1" });

    await expect(
      AuthService.register({
        fullname: "Ada Lovelace",
        username: "ada",
        password: "secret",
      }),
    ).rejects.toThrow("Username already registered");
  });

  it("issues jwt token with configured secret", () => {
    const user = { id: "user-1", username: "ada", fullname: "Ada" };

    jwtMock.sign.mockReturnValue("signed-token");

    const result = AuthService.issueToken(user);

    expect(jwtMock.sign).toHaveBeenCalledWith(
      {
        sub: user.id,
        username: user.username,
      },
      "secret",
      { expiresIn: "1h" },
    );
    expect(result).toEqual({ token: "signed-token" });
  });

  it("throws when JWT_SECRET is missing", () => {
    delete process.env.JWT_SECRET;

    expect(() =>
      AuthService.issueToken({ id: "user-1", username: "ada", fullname: "Ada" }),
    ).toThrow("JWT_SECRET is not configured");
  });
});
