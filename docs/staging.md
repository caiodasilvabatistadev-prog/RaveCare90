# Staging: Cloudflare Pages + Railway

Este documento registra a arquitetura existente de staging. Não descreve produção e não autoriza mudanças nos serviços ou variáveis dos provedores.

## Serviços e endereços

| Parte | Provedor | Configuração de staging |
|---|---|---|
| Frontend | Cloudflare Pages | Projeto `ravecare-staging`, branch `staging`, `https://ravecare-staging.pages.dev` |
| API | Railway | Serviço `scintillating-peace`, ambiente `staging`, `https://scintillating-peace-staging.up.railway.app` |
| Banco | Railway | PostgreSQL privado no ambiente `staging`; sem domínio público |
| E-mail de teste local | Docker Compose | Mailpit; não é o servidor SMTP do staging |

O código do frontend lê `VITE_API_URL` no build e usa essa URL-base para `/api/v1/...`. O valor esperado no projeto Pages de staging é:

```text
VITE_API_URL=https://scintillating-peace-staging.up.railway.app
```

Como variáveis `VITE_` são incluídas no bundle do navegador, só devem conter valores públicos. Não coloque tokens, senhas ou chaves nelas.

## Configuração do backend

No Railway, as variáveis devem existir somente no serviço backend e no ambiente de staging:

```text
APP_PUBLIC_URL=https://ravecare-staging.pages.dev
APP_CORS_ALLOWED_ORIGINS=https://ravecare-staging.pages.dev
```

O backend lê `APP_CORS_ALLOWED_ORIGINS` como uma lista separada por vírgulas. Mantenha somente as origens necessárias; não use `*` para contornar erros de CORS.

As variáveis `DB_URL`, `DB_USERNAME` e `DB_PASSWORD` devem referenciar o PostgreSQL privado do mesmo ambiente Railway. `JWT_SECRET`, `MAIL_PASSWORD` e credenciais SMTP ficam como variáveis secretas no provedor e nunca no repositório. O `APP_PUBLIC_URL` também é usado para compor o link de confirmação de e-mail.

## Fluxo de publicação e testes

1. Alterações entram por uma branch e passam pelo workflow `CI` em pull requests para `main`.
2. O CI roda lint, testes unitários e build do frontend; `mvnw verify` no backend; depois sobe a composição local de frontend, backend, PostgreSQL e Mailpit para Playwright E2E.
3. O E2E local valida que cadastro não permite login antes da confirmação de e-mail e que o fluxo funciona após confirmar. Esses testes usam os serviços de teste, não o banco de staging.
4. A publicação do staging é feita pelas conexões de branch configuradas no Cloudflare Pages e no Railway. O workflow `CI` não executa deploy nem teste pós-deploy.
5. Após publicar, valide a página pública, a saúde da API e a origem CORS antes de considerar o staging pronto.

## Checklist manual pós-deploy

- [ ] A home `https://ravecare-staging.pages.dev/` responde com sucesso.
- [ ] O JavaScript publicado aponta para o domínio `scintillating-peace-staging.up.railway.app`, não para `localhost` nem produção.
- [ ] `https://scintillating-peace-staging.up.railway.app/actuator/health` retorna status `UP`.
- [ ] Um preflight `OPTIONS` para `/api/v1/auth/login`, com origem `https://ravecare-staging.pages.dev`, retorna essa mesma origem em `Access-Control-Allow-Origin`.
- [ ] O e-mail de confirmação usa o domínio Pages de staging.
- [ ] Nenhuma variável, base de dados ou serviço de produção foi alterado.

## Arquivos locais relacionados

- `compose.yaml` e `Dockerfile`: ambiente local/integrado de testes e alternativa de deploy combinado; não definem o staging Pages + Railway.
- `backend/railway.toml`: health check do backend no Railway.
- `frontend/.env.example`: exemplo local de `VITE_API_URL`; não contém a URL de staging.
- `.github/workflows/ci.yml`: validação contínua, sem etapa de publicação.
