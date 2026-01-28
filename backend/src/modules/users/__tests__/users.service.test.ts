import { UsersService } from "../users.service";
import type { CreateUserPayload } from "../users.types";

jest.mock("bcryptjs", () => ({
  __esModule: true,
  default: { hash: jest.fn() },
}));

jest.mock("../../../config/prisma", () => ({
  prisma: {
    user: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
    },
  },
}));

type PrismaMock = {
  user: {
    create: jest.Mock;
    findMany: jest.Mock;
    findUnique: jest.Mock;
  };
};

const prismaMock = jest.requireMock("../../../config/prisma").prisma as PrismaMock;
const bcryptMock = (
  jest.requireMock("bcryptjs") as { default: { hash: jest.Mock } }
).default;

describe("UsersService", () => {
  it("hashes password and creates user", async () => {
    const payload: CreateUserPayload = {
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

    bcryptMock.hash.mockResolvedValue("hashed-password");
    prismaMock.user.create.mockResolvedValue(createdUser);

    const result = await UsersService.create(payload);

    expect(bcryptMock.hash).toHaveBeenCalledWith(payload.password, 10);
    expect(prismaMock.user.create).toHaveBeenCalledWith({
      data: { ...payload, password: "hashed-password" },
      select: {
        id: true,
        fullname: true,
        username: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    expect(result).toEqual(createdUser);
  });

  it("lists users ordered by fullname", async () => {
    const users = [
      { id: "user-1", fullname: "Ada", username: "ada", createdAt: new Date(), updatedAt: new Date() },
    ];
    prismaMock.user.findMany.mockResolvedValue(users);

    const result = await UsersService.list();

    expect(prismaMock.user.findMany).toHaveBeenCalledWith({
      select: {
        id: true,
        fullname: true,
        username: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: { fullname: "asc" },
    });
    expect(result).toEqual(users);
  });

  it("finds user by id", async () => {
    prismaMock.user.findUnique.mockResolvedValue({ id: "user-1" });

    await UsersService.findById("user-1");

    expect(prismaMock.user.findUnique).toHaveBeenCalledWith({
      where: { id: "user-1" },
      select: {
        id: true,
        fullname: true,
        username: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  });

  it("finds user by username", async () => {
    prismaMock.user.findUnique.mockResolvedValue({ id: "user-1" });

    await UsersService.findByUsername("ada");

    expect(prismaMock.user.findUnique).toHaveBeenCalledWith({
      where: { username: "ada" },
      select: {
        id: true,
        fullname: true,
        username: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  });

  it("finds auth data by username", async () => {
    prismaMock.user.findUnique.mockResolvedValue({ id: "user-1" });

    await UsersService.findAuthByUsername("ada");

    expect(prismaMock.user.findUnique).toHaveBeenCalledWith({
      where: { username: "ada" },
      select: {
        id: true,
        fullname: true,
        username: true,
        password: true,
      },
    });
  });
});
