# RaveCare90

Landing page e API para acompanhamento de tratamentos com cannabis medicinal.

## Estrutura

- `frontend/`: React, TypeScript e Vite, servido por Nginx em produção.
- `backend/`: Spring Boot 3 e Java 17.
- `db`: PostgreSQL 17, executado pela composição Docker.

## Executar com Docker

1. Copie `.env.example` para `.env`.
2. Substitua a senha de exemplo por uma senha local forte.
3. Execute `docker compose up -d --build --wait`.
4. Abra `http://localhost:8088`.

O arquivo `.env` não é versionado. O PostgreSQL não publica porta para a máquina e só pode ser acessado pela rede interna da composição.

## Testes

- Frontend: `npm run lint`, `npm run test:coverage` e `npm run build` dentro de `frontend/`.
- Backend: `./mvnw verify` dentro de `backend/`.
- E2E: com a composição ativa, `npm run test:e2e` dentro de `frontend/`.

O workflow de CI repete essas validações e executa o E2E contra os três serviços em contêineres.
