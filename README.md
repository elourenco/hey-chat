# Hey Chat

[Download APK (DEV)](dist/android/hey-chat-dev.apk.zip) - modo DEV (debug).

Aplicação mobile de chat em tempo real com cadastro, login, presença online/offline e notificações. O backend expõe APIs REST e eventos via WebSocket, com persistência em MongoDB.

![Unit Tests](resouces/UnitTests.png)

## Stack
- **Frontend:** React Native (CLI, sem Expo)
- **Backend:** Node.js + Express + Passport + Socket.IO
- **Banco:** MongoDB (Atlas) via Prisma
- **Docker:** Dockerfile e Docker Compose (backend)

## Pré-requisitos
- **Node.js 20+**
- **Yarn** (recomendado, há `yarn.lock`)
- **Android Studio + JDK** (Android)
- **Xcode + CocoaPods** (iOS)
- **MongoDB** (Atlas)

> Dica: siga o guia oficial de ambiente do React Native antes de rodar o app.

## Instalação

### 1) Dependências do app (mobile)
```bash
yarn install

# iOS (somente macOS)
yarn pods
```

### 2) Dependências do backend
```bash
cd backend
yarn install
```

## Configuração

### mobile (`.env` na raiz)
Arquivo usado pelo `react-native-config`.
```env
baseUrl=http://localhost:3000
versionApp=1.0.0
```

> **Android emulador:** use `http://10.0.2.2:3000` no `baseUrl`.

### Backend (`backend/.env`)
```env
NODE_ENV=development
PORT=3000
DATABASE_URL=mongodb://USER:PASS@HOST:PORT/DBNAME
JWT_SECRET=troque-este-segredo
```

> **Boas práticas:** não versionar segredos reais. Use valores próprios em ambientes locais/CI.

## Banco de Dados (Prisma + MongoDB)
Na primeira vez, gere o client e aplique o schema:
```bash
cd backend
yarn db:generate
yarn db:migration
```

## Execução do backend

### Opção prática (Docker + Mongo online)
Se você já tem **Docker instalado** e um **MongoDB online** (Atlas ou outro), a forma mais simples é subir o backend via Compose.  
Execute **dentro da pasta `backend`**:
```bash
cd backend
yarn docker:up
```

> Essa opção é a mais prática para rodar rapidamente o Node.js já com build e start configurados.

### Opção local (sem Docker)
Se preferir rodar localmente (ou não tiver Docker), siga os passos abaixo:
```bash
cd backend
yarn dev
```

## Frontend
Em outro terminal, na raiz do projeto:

### Execução local do app (scripts do package.json)
Use os scripts já existentes no `package.json`:
```bash
# Inicie o Metro
yarn start

# Android
yarn android

# iOS (somente macOS)
yarn ios
```

## Docker (backend)
O Docker está configurado para **subir apenas o backend**.  
Você precisa apontar o `DATABASE_URL` para um MongoDB acessível (Atlas ou container externo).

### Subir
```bash
cd backend
yarn docker:up
```

### Parar
```bash
cd backend
yarn docker:down
```

> Se for usar MongoDB local com Docker, suba um container separado e ajuste o `DATABASE_URL` para ele.

## Scripts úteis
- **Lint:** `yarn lint`
- **Lint (fix):** `yarn lint:fix`
- **Type check:** `yarn ts:check`
- **Tests:** `yarn test`

## Testes
- O backend possui testes unitários em `backend/src/**/__tests__` usando Jest + ts-jest.
- Para executar: `cd backend && yarn test`.

## Estrutura do projeto
- `src/` → App React Native
- `backend/` → API, WebSockets e persistência
- `docker/` → Dockerfile e Compose

---
