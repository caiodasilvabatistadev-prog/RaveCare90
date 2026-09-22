# Entrega 01 - fundação privada e testes

## Decisões adotadas

- API Node.js 24 + Fastify; PostgreSQL para persistência.
- React Native permanece como escolha do front-end. A primeira autenticação implementada atende navegador; aplicativo nativo virá com fluxo próprio testado.
- Identidade do paciente vem da sessão. Profissional só recebe acesso com vínculo criado fora da API pública.
- Anamnese enviada fica bloqueada para edição nesta versão; reabertura e histórico clínico serão projetados posteriormente.
- Fotos e exames não possuem endpoint de upload nesta entrega.
- Dados do briefing e contatos não serão adicionados ao repositório.

## Matriz de testes implementados

| Função | Verificação |
|---|---|
| Cadastro | Validação, duplicidade com resposta genérica, paciente sem escolha de papel |
| Login | Credenciais válidas/inválidas, usuário inexistente, limite de tentativas |
| Sessão | Cookie protegido, hash no banco, expiração, logout, rejeição de token inválido |
| Perfil | Retorno apenas à própria sessão; dados cifrados em armazenamento |
| Anamnese | Criação, retomada, alteração, conflito de versão, envio, bloqueio após envio |
| Autorização | Outro paciente, profissional sem vínculo, outro profissional e revogação |
| Banco | RLS em leitura/escrita direta, transações, rejeição de credenciais privilegiadas |
| Criptografia | Hash com sal, cifra aleatória, integridade e vínculo ao titular |
| Administração | Profissional, vínculo, revogação, entradas inválidas e auditoria |
| Migração | Aplicação inicial, repetição sem duplicar, rollback em falha |
| Entrada e resposta | Campos extras, limites de corpo, origem, cache e erros sem dados internos |

Cobertura mínima de CI: 90% de linhas, 85% de ramificações e 90% de funções dos módulos de serviço. Bootstrap do processo e wrappers de terminal não entram nessa métrica; conexão real e inicialização completa ainda exigem ambiente de homologação. Cobertura alta não é prova de ausência de falhas nem equivale a teste de invasão.

## Pendências que impedem a sequência remota

Verificação local em 22/09/2026: 14 testes aprovados, nenhuma falha, auditoria npm sem vulnerabilidades conhecidas nas dependências de produção instaladas. Cobertura observada nos módulos medidos: 100% de linhas/funções e 96,22% de ramificações. Isso não inclui testes de navegador ou aplicativo nativo, pois o cliente ainda não foi construído.

1. Repositório confirmado: https://github.com/caiodasilvabatistadev-prog/RaveCare90. Acesso pelo Git autenticado no Windows; a conexão do aplicativo ainda não enxerga o repositório.
2. Publicar a entrega em branch e abrir PR; executar e inspecionar todos os jobs do GitHub Actions.
3. Ativar proteção da branch com checks obrigatórios.
4. Após a suíte remota passar, realizar dockerização e validar inicialização/migrações dos contêineres. Docker Engine não estava ativo nesta máquina na inspeção inicial.
5. Construir cliente responsivo React Native e incluir testes de componentes e jornadas.
6. Escolher destino de homologação para CD. Nenhum ambiente remoto, segredo de produção ou publicação foi criado.

Não considerar testes do GitHub, scanner de histórico ou contêineres aprovados até existir uma execução observável. A suíte local usa PostgreSQL embarcado em memória; o job CI preparado usa serviço PostgreSQL 17.
