import express, { type RequestHandler } from "express";
import cors from "cors";
import http from "node:http";
import passport from "passport";
import { authRoutes } from "./modules/auth";
import { messagesRoutes } from "./modules/messages";
import { usersRoutes } from "./modules/users";
import { configurePassport } from "./config/passport";
import swaggerUi from "swagger-ui-express";
import { openapiSpecification } from "./docs/openapi";
import { errorMiddleware } from "./shared/middleware/error.middleware";
import { initSockets } from "./sockets";

const app = express();

app.use(cors());
app.use(express.json());

configurePassport();

app.use(passport.initialize() as RequestHandler);

/**
 * @openapi
 * /health:
 *   get:
 *     summary: Health check
 *     tags: [System]
 *     responses:
 *       200:
 *         description: Service is healthy
 */
app.get("/health", (_req, res) => res.status(200).json({ status: "ok" }));

app.get("/openapi.json", (_req, res) => res.json(openapiSpecification));
app.use("/docs", ...swaggerUi.serve, swaggerUi.setup(openapiSpecification));
app.use("/auth", authRoutes);
app.use("/users", usersRoutes);
app.use("/messages", messagesRoutes);

app.use(errorMiddleware);

const server = http.createServer(app);

initSockets(server);

export { app, server };
