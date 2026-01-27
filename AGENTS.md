# AGENTS.md

Este documento descreve os **agentes**, suas **responsabilidades**, **decisões arquiteturais** e **limites de escopo** do sistema de chat em tempo real, conforme o teste técnico solicitado.

---

## 🎯 Objetivo do Sistema

Construir uma aplicação mobile que permita:
- Cadastro e autenticação de usuários
- Troca de mensagens em tempo real
- Persistência de mensagens
- Exibição de status online/offline
- Notificações em tempo real

Requisitos técnicos:
- Backend em Node.js (REST + WebSockets)
- Frontend em React Native (sem Expo)
- Persistência de dados em MongoDB
- Docker para ambiente de desenvolvimento/produção

---

## 🧠 Visão Geral dos Agentes

### 1. Backend API (Node.js / Express)

**Responsabilidades**
- Expor APIs REST:
  - Cadastro de usuários
  - Login e autenticação
  - Consulta de histórico de mensagens
- Controlar autenticação/autorizações
- Expor eventos WebSocket autenticados
- Persistir dados em MongoDB
- Gerenciar estado de usuários online/offline

**Tecnologias**
- Node.js
- Express.js
- Passport.js (autenticação local)
- Socket.IO (WebSockets)
- Mongoose (ODM MongoDB)
- Docker + Docker Compose

**Decisões de Arquitetura**
- Separação entre rotas, services e modelos para clareza e testabilidade
- Passport.js para padronizar autenticação e middleware de proteção de rotas
- Socket.IO para gerenciamento de eventos em tempo real
- MongoDB para flexibilidade do modelo de mensagens

---

## 📁 Estrutura de Pastas – Backend

```txt
backend/
├─ src/
│  ├─ config/
│  │  ├─ database.ts
│  │  ├─ passport.ts
│  │  └─ index.ts
│  │
│  ├─ modules/
│  │  ├─ auth/
│  │  │  ├─ auth.controller.ts
│  │  │  ├─ auth.routes.ts
│  │  │  ├─ auth.service.ts
│  │  │  ├─ auth.types.ts
│  │  │  └─ index.ts
│  │  │
│  │  ├─ users/
│  │  │  ├─ users.controller.ts
│  │  │  ├─ users.routes.ts
│  │  │  ├─ users.service.ts
│  │  │  ├─ users.model.ts
│  │  │  ├─ users.types.ts
│  │  │  └─ index.ts
│  │  │
│  │  ├─ messages/
│  │  │  ├─ messages.controller.ts
│  │  │  ├─ messages.routes.ts
│  │  │  ├─ messages.service.ts
│  │  │  ├─ messages.model.ts
│  │  │  ├─ messages.types.ts
│  │  │  └─ index.ts
│  │  │
│  │  └─ presence/
│  │     ├─ presence.service.ts
│  │     ├─ presence.types.ts
│  │     └─ index.ts
│  │
│  ├─ sockets/
│  │  ├─ index.ts
│  │  ├─ socket.events.ts
│  │  └─ socket.handlers.ts
│  │
│  ├─ shared/
│  │  ├─ middleware/
│  │  │  ├─ auth.middleware.ts
│  │  │  └─ error.middleware.ts
│  │  ├─ utils/
│  │  │  ├─ httpResponse.ts
│  │  │  └─ logger.ts
│  │  └─ dtos/
│  │     └─ index.ts
│  │
│  ├─ app.ts
│  └─ server.ts
│
├─ .env.example
├─ Dockerfile
├─ docker-compose.yml
├─ package.json
└─ tsconfig.json