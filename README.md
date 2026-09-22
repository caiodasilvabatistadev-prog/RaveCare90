# RAVECARE90

Primeira entrega: API para acesso e anamnese privada do acompanhamento de 90 dias. Front-end previsto em React Native, conforme briefing, ainda não implementado.

## Estado da entrega

- Cadastro exclusivo de pacientes, login, identificação da própria sessão e logout.
- Anamnese: rascunho, retomada, controle de versão e envio. Após envio, edição bloqueada nesta primeira versão.
- Profissional vê apenas pacientes vinculados. Revogar vínculo remove acesso na próxima requisição.
- Dados pessoais e respostas cifrados; senhas com scrypt; tokens de sessão armazenados apenas como hash.
- PostgreSQL com políticas de acesso por registro na anamnese e credencial de execução limitada.
- Testes unitários e testes da API com banco SQL, incluindo tentativas de acesso indevido.
- GitHub Actions preparado para testes contra PostgreSQL 17, auditoria de dependências e busca de segredos.

Código inicial: não habilitar para pacientes reais antes da revisão e dos itens de preparação em `docs/SECURITY.md`.

## Testes locais

Requer Node.js 24 e npm.

```sh
npm ci
npm run verify
```

Sem `TEST_DATABASE_URL`, os testes usam PostgreSQL embarcado em memória via PGlite. No GitHub Actions, a mesma suíte usa PostgreSQL em serviço descartável. **Nunca apontar TEST_DATABASE_URL para banco compartilhado ou real: a suíte apaga o schema public do banco de testes.** Somente dados fictícios são usados.

## Banco e execução

1. Disponibilizar PostgreSQL 17 em ambiente isolado.
2. Copiar `.env.example` para `.env` e preencher os segredos localmente. Não enviar o arquivo para GitHub, conversa, imagem ou log.
3. Gerar `DATA_ENCRYPTION_KEY` com um gerenciador seguro: 32 bytes aleatórios em base64. Guardar uma cópia protegida; perder a chave impede leitura dos dados. Não trocar a chave sem migração.
4. Com a credencial administrativa em `MIGRATION_DATABASE_URL`, executar `npm run db:migrate`.
5. Criar login de execução separado, `NOSUPERUSER NOBYPASSRLS`, sem propriedade das tabelas; conceder associação ao papel `ravecare_api`. A senha desse login é definida por canal protegido. Usar esse login em `DATABASE_URL`.
6. Retirar a credencial administrativa do ambiente da API e executar `npm start`.

A API recusa inicialização com papel superusuário, BYPASSRLS ou proprietário das tabelas. Origem HTTPS é obrigatória em produção. `*_FILE` permite ler credenciais de arquivos montados, sem incluí-las na imagem futura.

## API

| Método | Rota | Acesso |
|---|---|---|
| GET | `/health` | Público; sem dados internos |
| POST | `/auth/register` | Público; cria apenas paciente |
| POST | `/auth/login` | Público; cookie HttpOnly, oito horas |
| POST | `/auth/logout` | Autenticado; revoga sessão |
| GET | `/auth/me` | Própria identidade |
| GET | `/anamnesis` | Próprio paciente |
| PUT | `/anamnesis` | Próprio paciente; `{version, answers}` |
| POST | `/anamnesis/submit` | Próprio paciente; `{version}` |
| GET | `/professional/patients` | Profissional; até 100 vinculados |
| GET | `/professional/patients/:id/anamnesis` | Profissional vinculado |

Campos aceitos em `backend/src/schema.js`. `version: 0` cria o rascunho; atualizações enviam a última versão recebida. Atualmente o envio exige objetivos e definição de sucesso; obrigatoriedade clínica final depende de validação do profissional. Nenhuma recomendação médica é gerada.

Requisições de escrita exigem `Origin` igual a `APP_ORIGIN`, inclusive login, para proteção contra CSRF. O primeiro cliente previsto é React Native Web servido na mesma origem/site. Autenticação de aplicativos nativos ainda precisa ser implementada e testada; não simular headers como solução final.

## Operação restrita

O cadastro de profissional e o vínculo não têm endpoint público. Um operador autorizado utiliza `npm run admin -- create-professional`, `assign` ou `revoke` com JSON por stdin e a credencial administrativa em ambiente separado.

- `create-professional`: campos `name`, `email`, `password`.
- `assign` e `revoke`: `professionalId`, `patientId`.

Não digitar senhas em comandos que fiquem no histórico; fornecer entrada por ferramenta protegida. Procedimento inicial exige conferir a identidade do profissional e o vínculo antes de executá-lo. Não existe senha padrão nem usuário de produção semeado.

## Sequência acordada

1. Revisar e executar a suíte no repositório Ravecare90.
2. Corrigir falhas e configurar checks obrigatórios antes de merge.
3. Após testes aprovados, dockerizar API, cliente web e PostgreSQL, com volumes e segredos externos; banco sem porta pública.
4. Construir front-end responsivo React Native baseado no briefing e adicionar testes de componentes e de jornadas completas.
5. Definir destino de homologação e CD. Publicação depende de ambiente e segredos configurados; nenhum deploy automático existe nesta entrega.

Arquivos do briefing, áudios, vídeos e documentos com contatos permanecem fora deste projeto para evitar publicação acidental.
