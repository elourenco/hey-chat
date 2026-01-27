import { Router } from "express";
import { MessagesController } from "./messages.controller";

export const messagesRoutes = Router();

/**
 * @openapi
 * components:
 *   schemas:
 *     Message:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: 64c1f7b8a7b9c2d3e4f56789
 *         from:
 *           type: string
 *           example: 64c1f7b8a7b9c2d3e4f56780
 *         to:
 *           type: string
 *           example: 64c1f7b8a7b9c2d3e4f56781
 *         body:
 *           type: string
 *           example: Olá!
 *         createdAt:
 *           type: string
 *           format: date-time
 *     SendMessagePayload:
 *       type: object
 *       required: [from, to, body]
 *       properties:
 *         from:
 *           type: string
 *           example: 64c1f7b8a7b9c2d3e4f56780
 *         to:
 *           type: string
 *           example: 64c1f7b8a7b9c2d3e4f56781
 *         body:
 *           type: string
 *           example: Olá!
 */

/**
 * @openapi
 * /messages:
 *   post:
 *     summary: Send a message
 *     tags: [Messages]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/SendMessagePayload"
 *     responses:
 *       201:
 *         description: Message created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Message"
 */
messagesRoutes.post("/", MessagesController.send);

/**
 * @openapi
 * /messages/user/{userId}:
 *   get:
 *     summary: List messages by user
 *     tags: [Messages]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of messages
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/Message"
 */
messagesRoutes.get("/user/:userId", MessagesController.list);
