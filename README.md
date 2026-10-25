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

O arquivo `.env` não é versionado. O PostgreSQL não publica porta para a máquina e só pode ser acessado pela rede interna da composição. A composição também inclui o Mailpit, um servidor de e-mail somente para desenvolvimento e testes; ele não envia mensagens para endereços reais.

### Pausar novos cadastros

Defina `REGISTRATION_ENABLED=false` no `.env` e recrie o serviço `backend`.
Enquanto essa chave estiver desligada, `POST /api/v1/users` responde `403` e
nenhuma conta nova é criada. O valor padrão é `true`, para manter o cadastro
local disponível.

### Limites de tentativas atrás de proxy

Localmente, use `FORWARD_HEADERS_STRATEGY=none`. Em um serviço publicado
atrás de um proxy confiável, configure `FORWARD_HEADERS_STRATEGY=framework`
para que os limites de tentativas enxerguem o endereço encaminhado pelo proxy.
Nunca ative essa opção em um servidor acessível diretamente pela internet.

## Testes

- Frontend: `npm run lint`, `npm run test:coverage` e `npm run build` dentro de `frontend/`.
- Backend: `./mvnw verify` dentro de `backend/`.
- E2E: com a composição ativa, `npm run test:e2e` dentro de `frontend/`.

O workflow de CI repete essas validações e executa o E2E contra os três serviços em contêineres.

## Staging

O staging atual separa o frontend do backend:

- **Frontend:** Cloudflare Pages, projeto `ravecare-staging`, publicado em `https://ravecare-staging.pages.dev` a partir da branch `staging`.
- **Backend:** serviço `scintillating-peace` no ambiente `staging` do Railway, publicado em `https://scintillating-peace-staging.up.railway.app`.
- **Banco:** PostgreSQL gerenciado no Railway, privado e no mesmo ambiente de staging do backend.

No Cloudflare Pages, use `frontend/` como diretório raiz, `npm run build` como comando e `dist` como saída. Defina `VITE_API_URL` como a URL-base pública do backend Railway, sem `/api/v1`. Esse valor é incorporado ao JavaScript durante o build; é público e não deve conter segredos.

No serviço backend do Railway, configure `APP_PUBLIC_URL=https://ravecare-staging.pages.dev` e `APP_CORS_ALLOWED_ORIGINS=https://ravecare-staging.pages.dev`. O CORS aceita origens separadas por vírgulas quando necessário. Configure também as referências privadas do PostgreSQL e os segredos `JWT_SECRET` e `MAIL_PASSWORD`, além das demais variáveis SMTP. Não compartilhe nem versione valores secretos.

O Railway deve manter o PostgreSQL sem domínio público. O endpoint de saúde do backend é `/actuator/health`.

O workflow do GitHub Actions valida o código e roda o E2E local em contêineres; ele **não publica** no Cloudflare ou Railway. A publicação do staging é responsabilidade das conexões de deploy configuradas nos provedores. Consulte [docs/staging.md](docs/staging.md) para a configuração, o fluxo e a checklist de validação.

O `Dockerfile` da raiz é uma alternativa de deploy combinado (frontend dentro do Spring Boot), não a arquitetura usada pelo staging atual. O Docker Compose continua sendo o ambiente local/integrado de testes. Nunca use dados ou segredos de produção nos testes.
