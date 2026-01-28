# Checklist de Requisitos

## Objetivo
- [ ] Implementar um app mobile com cadastro, login e chat em tempo real entre usuários cadastrados.

## Backend (Node.js + MongoDB)
- [ ] Criar rota de cadastro de usuários.
- [ ] Coletar nome, username e senha no cadastro.
- [ ] Persistir usuários no MongoDB.
- [ ] Retornar feedback de sucesso/falha no cadastro.

- [ ] Criar rota de login.
- [ ] Autenticar com username e senha cadastrados.
- [ ] Usar Passport.js para autenticação (preferencial).
- [ ] Proteger rotas públicas/privadas com middleware de auth.

- [ ] Implementar chat em tempo real com WebSockets.
- [ ] Persistir mensagens no MongoDB.
- [ ] Permitir consulta do histórico de mensagens entre usuários.

- [ ] Implementar notificações em tempo real para novas mensagens.

- [ ] Controlar status online/offline no login/logout.
- [ ] Enviar atualizações de presença em tempo real aos clientes.

## Frontend (React Native, sem Expo)
- [ ] Criar tela de login.
- [ ] Validar inputs de username e password.
- [ ] Exibir feedback de erro ao usuário.
- [ ] Redirecionar para o chat após login com sucesso.

- [ ] Criar UI de chat para enviar/receber mensagens.
- [ ] Exibir novas mensagens imediatamente na conversa.
- [ ] Exibir notificações em tempo real para novas mensagens.
- [ ] Exibir lista de usuários com status online/offline.
- [ ] Atualizar presença automaticamente no login/logout.

## Comunicação
- [ ] Usar REST sobre HTTP para APIs padrão.
- [ ] Usar WebSockets para comunicação em tempo real.

## Docker
- [ ] Criar Dockerfile para o backend Node.js.
- [ ] Criar Docker Compose para subir app e MongoDB.

## Repositório & Documentação
- [ ] Publicar em repositório público (GitHub/GitLab).
- [ ] README com instruções de instalação, configuração e execução.
- [ ] README explicando o uso do Docker (se implementado).
