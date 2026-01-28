import { Router } from "express";
import { z } from "zod";
import passport from "passport";
import { AuthController } from "./auth.controller";
import { validate } from "../../shared/middleware/validate.middleware";

export const authRoutes = Router();
const registerSchema = z.object({
	fullname: z.string().min(1),
	username: z.string().min(1),
	password: z.string().min(1),
});
const loginSchema = z.object({
	username: z.string().min(1),
	password: z.string().min(1),
});

/**
 * @openapi
 * components:
 *   schemas:
 *     RegisterPayload:
 *       type: object
 *       required: [fullname, username, password]
 *       properties:
 *         fullname:
 *           type: string
 *           example: Ada Lovelace
 *         username:
 *           type: string
 *           example: ada@hey.chat
 *         password:
 *           type: string
 *           example: secret123
 *     LoginPayload:
 *       type: object
 *       required: [username, password]
 *       properties:
 *         username:
 *           type: string
 *           example: ada@hey.chat
 *         password:
 *           type: string
 *           example: secret123
 *     AuthResponse:
 *       type: object
 *       properties:
 *         token:
 *           type: string
 *           example: jwt-token
 */

/**
 * @openapi
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegisterPayload'
 *     responses:
 *       201:
 *         description: User created
 */
authRoutes.post("/register", validate({ body: registerSchema }), AuthController.register);

/**
 * @openapi
 * /auth/login:
 *   post:
 *     summary: Authenticate user and return token
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginPayload'
 *     responses:
 *       200:
 *         description: Authenticated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthResponse'
 */
authRoutes.post(
	"/login",
	validate({ body: loginSchema }),
	passport.authenticate("local", { session: false }),
	AuthController.login,
);
