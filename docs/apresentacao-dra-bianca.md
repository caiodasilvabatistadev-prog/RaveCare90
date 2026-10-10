# Rave Care — brief de apresentação (Dra. Bianca)

**Baseline ao vivo:** [ravecare90-20261009.deed.page](https://ravecare90-20261009.deed.page/) (marca **Rave Care** + motion · tip `72fdd12` / v71)  
**Pin verificado:** [v71--ravecare90-20261009.deed.page](https://v71--ravecare90-20261009.deed.page/) (logo Rave Care · `RaveCareApp` = 0)  
**Não usar:** [ravecare-ui.pages.dev](https://ravecare-ui.pages.dev/) — ainda com marca antiga (sem CF token)  
**PR em curso:** [#4](https://github.com/caiodasilvabatistadev-prog/RaveCare90/pull/4)

---

## Checklist da reunião (1 min)

- [ ] Abrir **só** o deed.page (não pages.dev)
- [ ] Hero rave full-bleed com motion suave + “contato diário” + CTA **Quero o Rave Care**
- [ ] Scroll: dores → antes/durante/depois → equipe (médica + nutri + educador)
- [ ] Bloco Dra. Bianca (médica-first) + relatos anônimos + FAQ em caixinhas + vídeos
- [ ] Clicar **Quero o Rave Care** → WhatsApp da Dra. Bianca
- [ ] **Entrar** com demo → “Olá, Vinicius” / Sair
- [ ] (Opcional, off-nav) abrir guia Anvisa só se perguntarem — não está no menu

---

## Pitch (30 s)

**Rave Care** é acompanhamento médico contínuo com a Dra. Bianca Rohsner: cannabis medicinal, redução de danos e aftercare para quem vive o rolê sem abrir mão da saúde. Consultas online + presença real **antes e depois do rolê**, com nutrição e educador físico no mesmo cuidado.

---

## O que já está no ar

| Entrega | O que mostrar |
|--------|----------------|
| Landing marketing | Hero rave + motion, narrativa antes/durante/depois, equipe, FAQ, vídeos, CTA WhatsApp |
| Marca | **Rave Care** em toda a UI (sem RaveCareApp) |
| Área do paciente (mock) | Login / cadastro / confirmação de e-mail |
| Guia Anvisa | Página completa pronta, **fora do menu** nesta fase |
| Identidade de voz | Médica-first, sem disclaimers de “não substitui médico”, sem “milagre” |

---

## Roteiro tela a tela

### 1. Home `/` — navegação visível

**No header:** Se isso é pra você · Tratamento · Como funciona · Dúvidas · Depoimentos · **Entrar** · **Quero conversar** (WhatsApp)

**O que apontar, de cima pra baixo:**

1. **Hero** — marca Rave Care, motion suave (reveal / ken-burns), headline forte, sinais “cannabis medicinal” + “contato diário”, CTAs.
2. **Dores × solução** — caixinhas Pergunta / Resposta (não é lista fria).
3. **Antes / Durante / Depois** — preparar · redução de danos no rolê · aftercare.
4. **Tratamento / pilares** — história clínica, redução de danos, **nutrição**, **educador físico**, retorno dos 90 dias.
5. **Dra. Bianca** — médica emergencista primeiro; também raver; capacitação; consultas online + Rave Care 90 entre encontros.
6. **Relatos** — pacientes acompanhadas, **anônimos**, sem rostos; não são reviews de influenciador.
7. **FAQ** — respostas diretas (o produto *é* o acompanhamento médico).
8. **Vídeos** — conteúdo da Dra. sobre cannabis, redução de danos e aftercare.
9. **Finale** — CTA **Quero o Rave Care** → WhatsApp.

### 2. Login `/login` — visível via **Entrar**

Área do paciente: e-mail, senha, Entrar, link Criar conta, voltar ao início.

### 3. Cadastro `/cadastro` — acessível pelo login

Formulário: nome, e-mail, senha, confirmar senha.

### 4. Confirmar e-mail `/confirmar-email` — fluxo de conta

Tela de confirmação (pós-cadastro). Mostrar só se perguntarem pelo fluxo completo.

### 5. Guia Anvisa `/recebi-minha-receita` — **oculto no nav**

Passo a passo educativo (receita → portal → autorização → importação → acompanhamento).  
**Decisão de produto:** seção, links do menu e rodapé **desligados** (`Anvisa off`). A URL ainda abre se digitada — não abrir no walkthrough principal.

### Âncoras da home (mesmo `/`)

| Âncora | Label no nav | Conteúdo |
|--------|--------------|----------|
| `#dores` | Se isso é pra você | Dores / objeções |
| `#acompanhamento` | Tratamento | Pilares do cuidado |
| `#como-funciona` | Como funciona | Jornada / método |
| `#conteudo` | Dúvidas | FAQ |
| `#depoimentos` | Depoimentos | Relatos |
| `#bianca` | (scroll interno) | Bloco profissional |
| `#comece` / `#inicio` | CTAs | Conversão |
| `#receita-anvisa` | **oculto** | Bloco Anvisa na landing |

**Link morto no tip atual:** “Esqueci minha senha” aponta para `/recuperar-senha` (sem rota registrada). Não demonstrar.

---

## Credenciais demo

| Campo | Valor |
|-------|--------|
| URL | https://ravecare90-20261009.deed.page/login |
| E-mail | `demo@ravecare.app` |
| Senha | `RaveCare90!demo` |
| Após login | “Olá, Vinicius” + **Sair** |

Mock no frontend (sem API Java nesta baseline).

---

## WhatsApp (CTA)

- Botões **Quero o Rave Care** / **Quero conversar** → `https://wa.me/5521920405871`
- No **texto** da página: falar em **contato diário**, não em “chat/WhatsApp conforme disponibilidade”
- Marca na UI: **Rave Care** (nunca “RaveCareApp” / “RaveCare App”)

---

## Decisões de mensagem (alinhar com a Dra.)

| Decisão | Como aparece |
|---------|----------------|
| **Médica-first** | Autoridade clínica + conhecimento da noite, sem moralismo e sem romantizar risco |
| **Contato diário** | Presença entre consultas; corpo da landing não vende “chat 24h” |
| **Q&A em caixinhas** | Pergunta em cima, resposta embaixo (dores e FAQ) |
| **Antes / depois do rolê** | Cuidado além da noite; during = redução de danos |
| **Relatos anônimos** | Contas de pacientes, sem nomes/rostos, com afeto |
| **Anvisa off** | Guia pronto, fora do menu até liberar |
| **Sem disclaimers fracos** | Não dizer que “não substitui médico” — o produto é o acompanhamento com a Dra. Bianca |

---

## URLs rápidas (copiar pro WhatsApp)

| Página | Link |
|--------|------|
| Landing | https://ravecare90-20261009.deed.page/ |
| Login | https://ravecare90-20261009.deed.page/login |
| Cadastro | https://ravecare90-20261009.deed.page/cadastro |
| Confirmar e-mail | https://ravecare90-20261009.deed.page/confirmar-email |
| Anvisa (oculto) | https://ravecare90-20261009.deed.page/recebi-minha-receita |
| Pin v69 (rebrand fix) | https://v71--ravecare90-20261009.deed.page/ |

```
Landing: https://ravecare90-20261009.deed.page/
Login: https://ravecare90-20261009.deed.page/login
Cadastro: https://ravecare90-20261009.deed.page/cadastro
Confirmar e-mail: https://ravecare90-20261009.deed.page/confirmar-email
Anvisa (oculto): https://ravecare90-20261009.deed.page/recebi-minha-receita
Pin v69: https://v71--ravecare90-20261009.deed.page/
```

