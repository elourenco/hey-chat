import swaggerJSDoc, { type Options } from "swagger-jsdoc";

const options: Options = {
	definition: {
		openapi: "3.0.0",
		info: {
			title: "Hey Chat API",
			version: "1.0.0",
			description: "Backend API for the Hey Chat application.",
		},
		servers: [
			{
				url: "/",
			},
		],
	},
	apis: ["src/**/*.ts", "dist/**/*.js"],
};

export const openapiSpecification = swaggerJSDoc(options);
