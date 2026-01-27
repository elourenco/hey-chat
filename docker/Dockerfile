FROM node:20-alpine

WORKDIR /app

RUN apk add --no-cache openssl

COPY backend/package.json backend/yarn.lock ./
COPY backend/prisma ./prisma
RUN corepack enable && yarn install --frozen-lockfile

COPY backend/ ./

RUN yarn db:generate
RUN yarn build

EXPOSE 3000

CMD ["yarn", "start"]
