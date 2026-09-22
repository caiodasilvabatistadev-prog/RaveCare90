# Proteção de dados e limites desta primeira entrega

## Matriz de acesso

| Recurso | Paciente titular | Outro paciente | Profissional vinculado | Profissional não vinculado |
|---|---|---|---|---|
| Próprio perfil | Leitura | Negado | Só nome na lista de vinculados | Negado |
| Anamnese em rascunho | Leitura/escrita | Negado | Leitura | Negado |
| Anamnese enviada | Leitura | Negado | Leitura | Negado |
| Alteração de vínculo | Negado | Negado | Negado na API | Negado na API |

Proposta provisória: o profissional vinculado consegue ver rascunhos. Confirmar com o responsável se a leitura deve começar apenas após envio. Fotos e exames ainda não possuem upload; não enviá-los para esta API.

## Implementado

- Autorização deriva da sessão e do papel salvo no banco, nunca do corpo da requisição.
- Cadastro público rejeita atributos extras, inclusive role e patientId.
- Banco aplica RLS forçada na anamnese, com contexto de usuário restrito à transação. Escrita só do titular e apenas enquanto rascunho.
- Papel de execução não modifica vínculos nem papéis de usuário e não lê ou remove auditoria.
- Identificação pessoal e respostas com AES-256-GCM, nonce aleatório e autenticação vinculada ao ID do titular. Índice de e-mail usa HMAC com chave derivada separada.
- Senhas recebem hash scrypt com sal aleatório; nunca são recuperáveis nem retornadas.
- Token de sessão aleatório; banco guarda hash; expiração de oito horas; logout revoga no servidor.
- Cookies HttpOnly e SameSite=Strict, com Secure e prefixo __Host em produção.
- Escritas exigem origem exata. Headers de cache impedem armazenamento de respostas; headers de segurança habilitados.
- Corpo limitado, campos estritos, consultas parametrizadas e limitação de tentativas por IP.
- API não registra corpos, cookies ou erros brutos. Auditoria registra ação e IDs, sem conteúdo clínico.
- Conflitos de edição retornam 409 e não sobrescrevem silenciosamente o trabalho anterior.

## O que isso não significa

A cifra é gerenciada pelo servidor: não é criptografia ponta a ponta. Operadores com credenciais administrativas e chave de cifra têm capacidade técnica de acesso. O compromisso é limitar o acesso funcional a paciente e profissional vinculado e restringir o acesso operacional; não alegar que administradores de infraestrutura são tecnicamente incapazes de acessar.

Chaves de banco não devem ficar no próprio banco nem no cliente. Dados dos usuários ficam no banco; credenciais de infraestrutura ficam em cofre de segredos/arquivos protegidos. Variáveis públicas de React Native/Expo nunca receberão segredos. Respostas da API necessariamente entregam ao usuário autenticado os dados que ele tem direito de ver.

## Antes de produção

- Validar conteúdo, obrigatoriedade, acesso a rascunhos e cadência clínica com o profissional.
- Definir recuperação de senha, verificação de e-mail, MFA para profissionais e revogação de todas as sessões.
- Limite por IP é local a cada processo. Antes de múltiplas réplicas, adicionar contador compartilhado e configuração explícita dos proxies confiáveis; atualmente `trustProxy=false`.
- Criar política operacional de provisionamento, identificação do operador e trilha administrativa externa. Eventos de vínculo atuais identificam profissional e paciente, não a identidade do operador do terminal.
- Definir retenção, exclusão, exportação, consentimento/avisos e responsáveis; nenhuma certificação de conformidade foi realizada.
- Configurar HTTPS, rede privada do banco, TLS verificável quando remoto, backups cifrados e teste de restauração.
- Definir cofre, controle de acesso e rotação de chaves com recifragem/versionamento. Não reutilizar chaves de teste.
- Monitorar falhas sem enviar dados clínicos a ferramentas de observabilidade; usar alertas técnicos mínimos.
- Testar migrações e containers em homologação, com dados fictícios.
- Configurar branch protection/rulesets: PR obrigatório e checks CI obrigatórios, sem push direto à branch principal.

## Referências técnicas

- PostgreSQL RLS: https://www.postgresql.org/docs/17/ddl-rowsecurity.html
- GitHub Actions com PostgreSQL: https://docs.github.com/en/actions/tutorials/use-containerized-services/create-postgresql-service-containers
- Fastify testes: https://github.com/fastify/fastify/blob/main/docs/Guides/Testing.md
- Expo testes de componentes: https://docs.expo.dev/develop/unit-testing/
