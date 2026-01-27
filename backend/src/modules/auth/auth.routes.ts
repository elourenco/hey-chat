import { Router } from 'express';
import { AuthController } from './auth.controller';

export const authRoutes = Router();

/**
 * @openapi
 * components:
 *   schemas:
 *     RegisterPayload:
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
 *     LoginPayload:
 *       type: object
 *       required: [email, password]
 *       properties:
 *         email:
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
authRoutes.post('/register', AuthController.register);

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
authRoutes.post('/login', AuthController.login);
