# Checklist de Requisitos

## Objetivo
- [X] Implementar um app mobile com cadastro, login e chat em tempo real entre usuários cadastrados.

## Backend (Node.js + MongoDB)
- [X] Criar rota de cadastro de usuários.
- [X] Coletar nome, username e senha no cadastro.
- [X] Persistir usuários no MongoDB.
- [X] Retornar feedback de sucesso/falha no cadastro.

- [X] Criar rota de login.
- [X] Autenticar com username e senha cadastrados.
- [X] Usar Passport.js para autenticação (preferencial).
- [X] Proteger rotas públicas/privadas com middleware de auth.

- [X] Implementar chat em tempo real com WebSockets.
- [X] Persistir mensagens no MongoDB.
- [X] Permitir consulta do histórico de mensagens entre usuários.

- [X] Implementar notificações em tempo real para novas mensagens.

- [X] Controlar status online/offline no login/logout.
- [X] Enviar atualizações de presença em tempo real aos clientes.

# Banco de dados MongoDB
- [X] Usando o [Atlas](https://www.mongodb.com/products/platform)

## Frontend (React Native, sem Expo)
- [X] Criar tela de login.
- [X] Validar inputs de username e password.
- [X] Exibir feedback de erro ao usuário.
- [X] Redirecionar para o chat após login com sucesso.

- [X] Criar UI de chat para enviar/receber mensagens.
- [X] Exibir novas mensagens imediatamente na conversa.
- [X] Exibir notificações em tempo real para novas mensagens, fora do chat com o app aberto.
- [X] Exibir lista de usuários com status online/offline.
- [X] Atualizar presença automaticamente no login/logout.

## Comunicação
- [X] Usar REST sobre HTTP para APIs padrão.
- [X] Usar WebSockets para comunicação em tempo real.

## Docker
- [X] Criar Dockerfile para o backend Node.js.
- [X] Criar Docker Compose para subir app.

## Repositório & Documentação
- [X] Publicar em repositório público (GitHub/GitLab).
- [X] README com instruções de instalação, configuração e execução.
- [X] README explicando o uso do Docker (se implementado).
