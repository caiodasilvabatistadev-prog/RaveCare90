# Conta demo — Entrar (canonical, matches live)

**Canonical tip `9a59175` (Rave Care + motion; fixes v68 regression).** **Live:** https://ravecare90-20261009.deed.page/login

| Campo | Valor |
|-------|--------|
| E-mail | `demo@ravecare.app` |
| Senha | `RaveCare90!demo` |
| Nome exibido | Vinicius Demo |
| Role | PATIENT |

Header after login: `Olá, Vinicius` + **Sair**.

Frontend mock only (no Java API). Live code path on this restore tip: `frontend/src/auth/demoAccount.ts`. Anvisa section/links stay hidden on the landing; `/recebi-minha-receita` redirects home.

Landing: https://ravecare90-20261009.deed.page/
