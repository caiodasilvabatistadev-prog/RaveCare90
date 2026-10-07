# Registro de segurança — rotas de usuários

**Data da correção:** 6 de outubro de 2026
**Status:** corrigido localmente e coberto por testes; validação em staging pendente.

## O que foi identificado

As rotas abaixo permitiam consultar usuários por meio da API:

- `GET /api/v1/users`
- `GET /api/v1/users/{id}`

A resposta de usuário incluía identificador, nome, e-mail, papel de acesso,
status de ativação e datas de criação e atualização. A senha não fazia parte
da resposta, mas os demais campos ainda são dados que não devem ser listados
ou consultados por uma rota pública.

## Impacto potencial

Se acessadas por alguém não autorizado, as rotas poderiam permitir:

- coleta de e-mails para spam ou tentativas de phishing;
- identificação de usuários e de seus papéis de acesso;
- enumeração de contas ativas;
- uso dos dados em tentativas de acesso indevido.

Não há evidência registrada de exploração em produção. Este documento registra
o risco identificado no código e não confirma que houve vazamento.

## Correção aplicada

- Os métodos de listagem e busca por identificador foram removidos do
  `UserController` e do `UserService`.
- A rota de cadastro (`POST /api/v1/users`) foi mantida, pois é necessária
  para criar contas.
- O cadastro pode ser interrompido sem alterar o código: defina
  `REGISTRATION_ENABLED=false`. Com isso, novas requisições recebem `403`.
  Em desenvolvimento o valor padrão continua sendo `true`.
- A configuração de segurança continua bloqueando requisições para as rotas
  removidas.
- Os testes verificam que a listagem retorna `405 Method Not Allowed` e que a
  busca por identificador retorna `404 Not Found` quando executadas sem os
  filtros de segurança.
- A suíte completa do backend passou com **25 testes**, sem falhas.

## Pendência para encerrar

Validar em staging que as duas URLs permanecem inacessíveis após a publicação.
O ambiente de stagingcom está configurado, mas ainda precisa de um PostgreSQL
separado e da variável `DB_URL` antes de poder ser publicado.

## Revisão local complementar

- A landing page não contém acesso às rotas internas de usuários.
- A resposta de cadastro não inclui senha.
- O tratamento de erro não retorna mensagem de exceção, pilha ou dados da
  requisição ao cliente.
- Logs de produção ainda devem ser revisados no ambiente publicado antes do
  merge, pois essa evidência não existe localmente.
