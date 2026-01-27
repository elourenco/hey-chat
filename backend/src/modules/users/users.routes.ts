import { Router } from "express";
import { UsersController } from "./users.controller";

export const usersRoutes = Router();

/**
 * @openapi
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: 64c1f7b8a7b9c2d3e4f56789
 *         name:
 *           type: string
 *           example: Ada Lovelace
 *         email:
 *           type: string
 *           example: ada@hey.chat
 *     CreateUserPayload:
 *       type: object
 *       required: [name, email, password]
 *       properties:
 *         name:
 *           type: string
 *           example: Ada Lovelace
 *         email:
 *           type: string
 *           example: ada@hey.chat
 *         password:
 *           type: string
 *           example: secret123
 */

/**
 * @openapi
 * /users:
 *   post:
 *     summary: Create user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/CreateUserPayload"
 *     responses:
 *       201:
 *         description: User created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/User"
 */
usersRoutes.post("/", UsersController.create);

/**
 * @openapi
 * /users/{id}:
 *   get:
 *     summary: Get user by id
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/User"
 */
usersRoutes.get("/:id", UsersController.getById);
