# RaveCare — proposta de redesign da landing

**Etapas:** 1 (auditoria) + 2 (direção de arte)  
**Status:** feedback Vinicius incorporado na direção de arte — **ainda sem ETAPA 3 / zero redesign code**  
**Referência de qualidade:** [Comunidade GG](https://comunidadegg.com.br/) (acessível em 2026-10-10; pegada e ritmo, **não** cópia literal)  
**Baseline preferido:** tip com hero rave + copy sem travessões ([docs/test-login.md](./test-login.md), live [deed.page](https://ravecare90-20261009.deed.page/))

### Feedback Vinicius (constraints — 2026-10-10)

| # | Decisão |
|---|--------|
| 1 | **Remover** disclaimers no estilo “não substitui acompanhamento médico / consulta / prescrição”. O produto **é** acompanhamento médico com a Dra. Bianca. |
| 2 | **Posicionamento:** acompanhamento contínuo; a equipe **entende a vida, inclusive depois do rolê**. |
| 3 | **Narrativa:** foco **ANTES / DURANTE / DEPOIS**. Destacar que a plataforma inclui **nutrição** + **educador físico** (além da médica). |
| 4 | **Foto Professional:** corrigir bug de cutout/máscara no cabelo (asset `1990aa93…`); **sem máscara bugada**. |
| 5 | **Manter:** hero rave full-bleed; copy sem travessões; Anvisa oculta. |
| 6 | **Iconografia:** mais cannabis + rave (Lucide / marcas custom com propósito; **sem** emoji clutter). |
| 7 | **Voz:** falar com público **raver + cannabis medicinal**; identidade original RaveCare (não copy de dieta GG). |
| 8 | **CTA / CRO:** no **corpo** de marketing, falar em **contato diário** (e equivalentes), **não** “chat e WhatsApp conforme disponibilidade”. CTA **Quero o RaveCare** pode deep-link WhatsApp; mailto não é canal principal. |
| 9 | **Voz Dra. Bianca:** médica first (não só jaleco, não só pista); conhecimento da noite sem moralismo nem romantizar risco; consultas online + **RAVECARE 90** entre sessões; enfatizar **capacitação**; **banir** “cuido de você na noite” — o cuidado vai além da noite. |
| 10 | **Testimonials:** **relatos de pacientes** (anônimos, sem exposição, com afeto). Rotular com clareza como contas de pacientes, não “reviews” genéricos. |

---

## 0. Fontes da auditoria

| Fonte | Papel |
|-------|--------|
| [comunidadegg.com.br](https://comunidadegg.com.br/) | Referência de qualidade / CRO / ritmo editorial |
| [ravecare90-20261009.deed.page](https://ravecare90-20261009.deed.page/) | **Baseline preferido** (hero rave full-bleed, Anvisa oculta, mock Entrar) |
| [ravecare-ui.pages.dev](https://ravecare-ui.pages.dev/) | Contraste: hero jaleco / side portrait (**rejeitado** pelo Project) |
| Repo [RaveCare90](https://github.com/caiodasilvabatistadev-prog/RaveCare90) `main` | Stack oficial ainda no layout antigo (cutout / Resources / About) |
| Tip visual `ad948c7` + restore rave | Ritmo GG atual: PainPoints → Method → Journey → Professional… |

**Demo Entrar (mock):** `demo@ravecare.app` / `RaveCare90!demo` — ver [test-login.md](./test-login.md).  
**Anvisa:** permanece **oculta** nesta fase (seção, links e `/recebi-minha-receita`).

---

## 1. Auditoria

### 1.1 Stack e arquitetura

| Camada | Situação |
|--------|----------|
| **Frontend** | React 19 + TypeScript + Vite 8 + `react-router-dom` 7 + Lucide. CSS próprio (`global.css` ~1k linhas, `social-proof.css`, login/register). Sem Tailwind / shadcn. |
| **Backend** | Spring Boot 3 / Java 17, PostgreSQL, JWT. APIs: `/api/v1/auth`, `/api/v1/users`, `/api/v1/anamneses`. |
| **Deploy** | Docker Compose + Nginx; Railway possível. Landing marketing também em deed.page / CF Pages. |
| **Testes** | Vitest + Testing Library; Playwright e2e. |

**Problema estrutural:** três “verdades” visuais (GitHub `main`, pages.dev, deed.page tip). O médico e o time precisam de **uma** baseline canônica antes de ETAPA 3.

### 1.2 Componentes e design system

**Hoje (tip preferido):** `Button`, `Header`, `BrandLogo`, `SectionHeading` + seções monolíticas. Tokens CSS em `:root` (roxos Dra Bianca, Fraunces + Outfit, `--page-gutter`).

**Gaps DS:**
- Poucos primitivos reutilizáveis (card, badge, FAQ item, CTA group, media frame)
- Espaçamento e tipografia ainda “por seção”, não escala única
- Botões: mistura `button` legado + `header-btn` app-style (aprovado) + pills
- Cards de módulos só texto (GG usa foto + overlay + “ver mais”)
- Glow / orbs / blur em excesso em alguns blocos vs. composição limpa do GG

### 1.3 Rotas e backend (preservar lógica)

| Rota | Notas |
|------|--------|
| `/` | Landing marketing |
| `/login` | Mock demo no tip; API real no produto |
| `/cadastro` | Registro (flag `REGISTRATION_ENABLED` no backend) |
| `/confirmar-email` | Fluxo JWT / e-mail |
| Anvisa / `/recebi-minha-receita` | **Fora do escopo visual agora** (escondido) |

Landing **não deve** alterar regras de negócio, anamnese, auth real, SMTP ou banco. Mock Entrar e Anvisa oculta são decisões de produto já tomadas.

### 1.4 Ritmo atual da landing (tip preferido)

1. Hero (rave full-bleed)  
2. PainPoints (mito + dor × solução)  
3. Method (pilares)  
4. Journey (01 / 30 / 60 / 90)  
5. Professional (jaleco, médica-first)  
6. Testimonials (carrossel)  
7. FAQ  
8. Instagram / vídeos  
9. Final CTA (rave + mailto)

`main` no GitHub ainda: Hero cutout → Resources → Professional → Journey → About → … (legado).

### 1.5 Responsividade e UX

**OK:** hamburger mobile, tipografia fluida, dual cards que empilham, hero full-bleed no mobile tip.

**Atenção:**
- Contraste do H1 sobre flares neon (trechos claros da foto)
- Header com muitos links + 2 CTAs (mobile: menu OK; desktop: denso)
- Carrossel de depoimentos pesado (altura fixa, blur laterais) vs. prova social mais “editorial” do GG
- CTA final hoje `mailto:` — fricção alta; direção Vini: corpo com **contato diário**; botão **Quero o RaveCare** pode deep-link WhatsApp
- Vídeos Instagram: dependem de dist/rede; estados empty/erro precisam ficar explícitos
- pages.dev e deed.page divergem (risco de feedback no URL errado)

### 1.6 CRO (comparado ao GG)

| Padrão GG | RaveCare tip | Gap |
|-----------|--------------|-----|
| Hook agressivo no H1 | Já forte (“Chega de…”) | Manter tom; afinar contraste visual |
| Dor × solução em cards | Já existe | Elevar acabamento (foto, ritmo, negative space) |
| Módulos com mídia | Pilares texto | Oportunidade: pilares com stills rave/clínica |
| Sobre fundadora (história) | Professional sólida | Manter médica-first; layout mais “premium quiet” |
| Objeções / FAQ sarcástico | FAQ direto; ainda tem “substitui consulta?” | Reescrever: somos o acompanhamento; sem humor de dieta |
| Preço / contraste de valor | Ausente de propósito | Não inventar preço sem brief |
| CTA único dominante | Vários (“começar”, “conversar”, Entrar, mailto) | Corpo: **contato diário**; CTA **Quero o RaveCare** → WhatsApp; Entrar secundário |

### 1.7 Problemas (priorizados)

1. **Identidade fragmentada** entre hosts e `main` vs tip.  
2. **Hero rejeitado ainda vivo** em pages.dev (jaleco / side).  
3. **DS incompleto** — difícil escalar polish sem tokens de espaço/tipo/componente.  
4. **Módulos sem âncora visual** — perdem a “pegada” premium do GG.  
5. **CTAs diluídos** — conversão espalhada.  
6. **Contraste / legibilidade** no hero neon.  
7. **Prova social** ainda “UI de carrossel”, pouco narrativa.  
8. **Copy dash** ainda em pages.dev; tip deed já alinhado às preferências.  
9. **Disclaimers “não substitui…”** no tip atual enfraquecem o produto (Vini: remover).  
10. **Equipe multidisciplinar** (nutrição + educador físico) pouco/não destacada.  
11. **Foto Professional** com cutout/máscara de cabelo bugada (`1990aa93…`).  
12. Narrativa ainda centrada em 01–90; falta eixo explícito **ANTES / DURANTE / DEPOIS**.

### 1.8 Oportunidades

- Subir acabamento ao nível GG **com identidade própria** (roxo + rave + clínica).  
- Sistema tipográfico display (autoridade médica) × body (noite / acessível).  
- Hero full-bleed rave como assinatura de marca (já decidido).  
- Professional como “capítulo de confiança” (jaleco só aqui; foto limpa).  
- Narrativa ANTES / DURANTE / DEPOIS + destaque nutrição e educador físico.  
- Copy de acompanhamento médico real (sem se desautorizar).  
- Motion editorial curto (entrada de seção, scrim, hover de pilar), sem glow spam.  
- CTA primária **Quero o RaveCare** (deep-link WhatsApp ok) + copy de **contato diário** no corpo + Entrar mock estável.

### 1.9 Preservar vs reformular

| Preservar | Reformular (só após aprovação) |
|-----------|--------------------------------|
| Lógica de negócio / APIs / auth real | Acabamento visual + DS + hierarquia CTA |
| Cannabis medicinal + redução de danos + RAVECARE 90 (núcleo clínico) | Ritmo visual das seções (padding, grade, mídia) |
| Credenciais CREMEC / RQE | Cards de pilares com mídia; FAQ/testimonials mais limpos |
| Hero **rave full-bleed** (não jaleco no hero) | Contraste/scrim do hero; brand hierarchy no 1º viewport |
| Jaleco só em Professional (foto limpa, sem cutout bugado) | Layout Professional mais “GG about”; asset cabelo sem máscara |
| Copy sem travessões (tip aprovado) | Unificar hosts; não inventar headlines dashy |
| Anvisa oculta + mock `demo@` | Estados loading/erro de vídeo; corpo “contato diário”; CTA → WA |
| Tons roxos da marca | Escala de superfície (noite → lavanda → branco clínico) |
| Tom de **acompanhamento médico real** (Dra. Bianca) | Tirar disclaimers “não substitui consulta/prescrição/acompanhamento” |
| Cannabis medicinal + redução de danos + RAVECARE 90 | Narrativa **ANTES / DURANTE / DEPOIS**; destacar **nutrição** + **educador físico** |

---

## 2. Direção de arte (para aprovação do Vinicius)

### 2.1 Conceito

**“Emergência com glitter.”**  
Médica emergencista que conhece a pista: autoridade clínica sem estética de laboratório genérico; energia rave sem virar flyer de festa.

**Posicionamento (Vini):** RaveCare **é** acompanhamento médico contínuo com a Dra. Bianca, com equipe multidisciplinar (**nutrição** + **educador físico**). Entende a vida da paciente **inclusive depois do rolê**. Narrativa de cuidado em três tempos: **ANTES / DURANTE / DEPOIS**.

**Público / voz:** quem vive a noite **e** busca cannabis medicinal com seriedade. Tom de pista + consultório: direto, sem moralismo, sem romantizar risco, sem “coach de emagrecimento”. Léxico natural: rolê, redução de danos, aftercare, sono pós-festa, dose, evidência, escuta, capacitação, entre consultas. **Não** importar vocabulário GG (gostosa, dieta, balança, canetinha, magras).

**Voz da Dra. Bianca (obrigatório):**
- **Médica first:** não é só o jaleco, e também não é só a vibe da pista.
- Conhece a noite por dentro: fala de drogas, cannabis medicinal e redução de danos **sem moralismo** e **sem romantizar risco**.
- **Consultas online** + acompanhamento **RAVECARE 90** entre um encontro e outro.
- Destacar **capacitação** (educar / habilitar a paciente), não só “estar presente na festa”.
- **Proibido:** “cuido de você na noite” e equivalentes que reduzam o cuidado à pista. O cuidado **vai além da noite** (antes, durante e depois; entre consultas).

**Testimonials:** seção de **relatos de pacientes** (anônimos, sem exposição, afetivos), com rótulo explícito de que são contas de pacientes acompanhadas, não depoimentos genéricos de produto.

Inspiração GG: **ritmo editorial, contraste dor/solução, sobre em primeira pessoa, módulos legíveis, whitespace generoso.**  
Não copiar: rosa pastel, serif “magras”, humor de dieta, layout Hotmart genérico, emoji spam.

### 2.2 Paleta (tokens propostos)

| Token | Hex | Uso |
|-------|-----|-----|
| `--rc-night` | `#140A2E` / `#1A0D3D` | Fundo hero / finale |
| `--rc-plum` | `#352078` | Primário escuro, header CTA |
| `--rc-violet` | `#7026B9` / `#A43DE1` | Marca, ênfases |
| `--rc-electric` | `#456CE2` | Apoio (não dominante) |
| `--rc-signal` | `#17C8DE` / `#9CECF3` | Highlight de 1 palavra no H1, bullets win |
| `--rc-mist` | `#F4EEFB` | Fundo de página (lavanda suave) |
| `--rc-clinic` | `#FFFFFF` | Cards / Professional / FAQ |
| `--rc-ink` | `#1C1233` | Texto |
| `--rc-mute` | `#5F5473` | Secundário |

Evitar: creme terracota, purple-on-white genérico de template, glow neon excessivo em todo o scroll.

### 2.3 Tipografia

| Papel | Família | Notas |
|-------|---------|--------|
| Display | **Fraunces** (já no tip) | H1/H2, nomes, mito strip — autoridade + calor |
| UI / corpo | **Outfit** (já no tip) | Nav, listas, FAQ, botões |
| Alternativa se Fraunces “diet vibe” | **Bricolage Grotesque** só em display marketing | Só se Vini preferir mais “street” que serif |

Escala sugerida: H1 ~ clamp 2.8–5.2rem; H2 ~ 2.2–3.6rem; lead 1.15–1.25rem; meta uppercase 0.7rem tracking largo.

### 2.4 Espaçamento e grid

- `--page-gutter`: 16–28px; bias esquerdo no hero/professional (já alinhado ao feedback Vini)  
- Seções: ritmo 88 / 112 / 128px (mobile 64 / 80)  
- Max content ~1200–1240px; hero copy max ~36–40ch  
- Um job por seção; sem stat strips nem chips flutuantes no hero

### 2.5 Componentes (DS mínimo pós-aprovação)

1. **Header:** logo + nav enxuta + `Entrar` sólido + 1 CTA primário (**Quero o RaveCare** / conversar → deep-link WhatsApp ok)  
2. **HeroFrame:** foto full-bleed + scrim calibrado + brand + H1 + 1 frase + CTA group  
3. **ContrastPair:** dor × solução (X / check)  
4. **PillarCard:** número + título + texto (+ still opcional)  
5. **JourneyStep:** dia + título + texto  
6. **FounderBlock:** retrato jaleco + badge + story  
7. **FaqItem / PatientStory (relato anônimo) / ReelTile / FinalBand**  
8. **ContactCTA:** botão primário pode abrir WhatsApp; corpo da página fala em **contato diário**, não em “chat/WA conforme disponibilidade”

Botões: manter estilo app (`header-btn` 44px); primário sólido plum; secundário ghost claro só sobre foto.

### 2.5.0 CRO / CTA (copy vs. destino)

| Papel | Direção |
|-------|---------|
| **Copy de marketing (corpo)** | Usar **contato diário** (e equivalentes: presença entre consultas, acompanhamento contínuo). **Não** escrever no body “chat e WhatsApp conforme disponibilidade” nem microcopy de SLA/disponibilidade. |
| **CTA primário** | Label preferido: **Quero o RaveCare** (também “Quero conversar” no header se mantiver hierarquia). Pode **deep-link WhatsApp**; o canal técnico fica no botão, não no discurso. |
| **Secundário** | `Entrar` (mock demo / área da paciente). |
| **Evitar como principal** | `mailto:contato@…` no hero/header/finale (footer ok como apoio). |
| **UX** | Mesmo destino WhatsApp nos CTAs repetidos (header, hero, professional, finale). Link WA a definir na ETAPA 3. |

### 2.5.1 Iconografia cannabis + rave

Marcas **com função** (navegação, pilares, ANTES/DURANTE/DEPOIS, equipe), não decoração.

| Uso | Direção | Exemplos (Lucide ou custom SVG) |
|-----|---------|----------------------------------|
| Cannabis medicinal | Folha / gota / cápsula estilizada, stroke fino, roxo/ciano | Leaf custom alinhada ao logo; `Droplet`, `Pill` (com critério clínico) |
| Rave / noite | Música, pulse, lua, headphones | `Music2`, `AudioLines`, `Moon`, `Headphones` |
| Cuidado clínico | Esteto, coração/handshake, vídeo consulta | `Stethoscope`, `HeartHandshake`, `Video` (já no tip) |
| ANTES / DURANTE / DEPOIS | Trio consistente de ícones, mesma peso/stroke | Pre-check → pulse/pista → sunrise/recovery |
| Nutrição + educador físico | Ícones de equipe, não food-porn | `Salad`/`Apple` só se sóbrio; `Dumbbell`/`Activity` para educador |

**Regras:**
- Preferir **Lucide** (já no stack) + 1–2 **custom marks** (folha RaveCare / wordmark glyph) se o set padrão ficar genérico.
- Stroke ~1.5–2px, tamanho 18–22px em UI; 24–28px em pilares.
- Cor: `currentColor` / plum / signal; sem rainbow neon por ícone.
- **Proibido:** emoji em headings, rows de 🔥💜😩, stickers flutuantes no hero, cluster de pills com ícone+ícone+ícone.
- Caixinhas sociais do tip podem manter 1 emoji de contexto se já aprovado; o DS de seção usa ícones vetoriais.

### 2.5.2 Voz (raver + cannabis medicinal + médica first)

| Fazer | Evitar |
|-------|--------|
| Médica first: escuta clínica, responsabilidade, capacitação | Reduzir a Bianca a “só jaleco” ou “só pista” |
| Conhecimento da noite sem moralismo e sem romantizar risco | Julgamento moral **ou** festeiro irresponsável / glamour de risco |
| Consultas online + **RAVECARE 90** entre sessões | Cuidado que “some quando a festa acaba” sem continuidade |
| “Acompanhamento contínuo”; cuidado **além da noite** | **“Cuido de você na noite”** e equivalentes (banidos) |
| Capacitação da paciente (o que observar, como se cuidar) | Tom de babysitting / “eu cuido por você só no rolê” |
| Cannabis medicinal com evidência; redução de danos; aftercare | “Wellness genérico”; terrorismo ou romantização |
| Equipe: médica + nutrição + educador físico | Só “app de sintomas” ou só “doc influencer” |
| Dash-free; frases curtas, faladas | Copy dieta GG; travessões; lorem; Hotmart |

### 2.6 Motion (2–3 intencionais)

1. **Hero:** ken-burns lento + scrim estável (já existe; calibrar amplitude)  
2. **Entrada de seção:** `rise-in` curto no H2 / cards ao entrar no viewport  
3. **Pilar / CTA:** hover lift 2–4px + border soft (sem sombra multicamada)

Sem: partículas, glow pulse em tudo, overlays tipo sticker no hero.

### 2.7 Direção por seção

| Seção | Direção |
|-------|---------|
| **Hero** | Full-bleed rave (óculos / neon). Brand RaveCare legível. H1 dash-free. Sem jaleco, sem badge flutuante, sem Anvisa. Promessa de acompanhamento contínuo **além da noite** (não “cuido de você na noite”; não “app genérico”). |
| **Pain / Solution** | Fundo mist; dois cards clínicos claros; caixinhas estilo social (já no tip); refinar tipografia e respiro. Sem disclaimer “não substitui médico”. |
| **Method / equipe** | Painel split + pilares com **ícones cannabis/rave/clínica**; **destacar nutrição e educador físico** junto da médica. Stills (noite / consulta / rotina) sem collage caótica. |
| **Antes / Durante / Depois** | Eixo narrativo principal (além ou no lugar da timeline 01–90 se fizer sentido): preparo → rolê/cuidado no momento → pós-festa e entre consultas; cada tempo com ícone Lucide/custom dedicado. |
| **Journey** | Timeline 01–90 limpa **ou** mapeada aos três tempos; menos decoração, mais clareza de progressão. |
| **Professional** | Jaleco na foto; copy **médica first** (não só jaleco, não só pista); conhecimento da noite sem moralismo/romantização; consultas online + RAVECARE 90; **capacitação**. **Foto sem cutout/máscara bugada** (`1990aa93…`). Layout about GG-like em roxo/branco. |
| **Testimonials** | **Relatos de pacientes** acompanhadas pela Dra. Bianca: anônimos, sem exposição, tom afetivo. Label claro (ex.: “Relatos de pacientes”, “Quando o cuidado encaixa na vida”). Preferir quote editorial + print; menos carrossel 3D. Não parecer review de marketplace. |
| **FAQ** | Tom reto; respostas alinhadas a “somos o acompanhamento”; **sem** copy “não substitui consulta/prescrição”. |
| **Vídeos** | Grade de reels com poster; empty/error honestos. |
| **Finale** | Band rave full-bleed + wordmark + CTA **Quero o RaveCare** (deep-link WhatsApp ok); copy de **contato diário**, não “chat/WA conforme disponibilidade”; não mailto. |

### 2.7.1 Copy / compliance (Vini)

- **Cortar** frases do tipo: “não é promessa de milagre, nem substitui consulta ou prescrição”, “não substitui acompanhamento médico”, e equivalentes no tip atual (Pain disclaimer, Method disclaimer, FAQ “Isso substitui…?”, Finale disclaimer).  
- **Substituir** por linguagem de **acompanhamento contínuo** com a Dra. Bianca e equipe (nutrição + educador físico), com responsabilidade clínica sem se desautorizar.  
- Manter credenciais (CREMEC / RQE) e tom ético; não inventar claims milagrosos.  
- Voz para **raver + cannabis medicinal**; médica first; capacitação; **banir** “cuido de você na noite”; zero importação de copy/dieta GG.

### 2.8 Branding no 1º viewport (teste da marca)

Removendo a nav, o viewport ainda precisa gritar **RaveCare** + atmosfera rave da Bianca.  
Hoje o eyebrow “RaveCare” é fraco frente ao logo “RaveCareApp”: na execução, reforçar wordmark/brand no hero sem competir com o H1.

### 2.9 Fora de escopo agora (ainda sem ETAPA 3)

- Implementar redesign completo / alterar frontend source  
- Alterar backend, anamnese, JWT, SMTP  
- Reabrir Anvisa na landing  
- Trocar copy por textos com travessão  
- Copiar paleta rosa / tom de dieta do GG  
- Colocar jaleco no hero  
- Manter disclaimers “não substitui acompanhamento médico”  
- Emoji clutter / icon rows decorativos  
- Tom ou léxico de dieta GG  
- “Cuido de você na noite” / cuidado reduzido só à pista

### 2.10 Asset Professional (bug conhecido)

- Cutout/máscara no cabelo da foto de jaleco (referência asset `1990aa93…`) gera halo/recorte bugado.  
- Na ETAPA 3: trocar/retocar asset e **não** usar máscara CSS oval/cutout quebrada; preferir foto retangular/rounded limpa (como GG about).

---

## 3. Status de aprovação

**Feedback de direção de arte do Vinicius já registrado neste doc.**  
**ETAPA 3 ainda não liberada** — zero redesign code até o coordenador autorizar.

Quando liberar:

1. ETAPA 3 — DS + seções + copy (ANTES/DURANTE/DEPOIS, nutri + educador físico, sem disclaimers “não substitui”)  
2. Corpo “contato diário”; CTA Quero o RaveCare → WA; fix foto Professional  
3. Unificar baseline (deed.page); manter hero rave, dash-free, Anvisa off, mock Entrar

---

## 4. Links rápidos

- Proposta (este doc): `docs/landing-redesign-proposal.md`  
- Status interno: `internal/landing-redesign-status.md`  
- Login demo: [docs/test-login.md](./test-login.md)  
- Live preferido: https://ravecare90-20261009.deed.page/  
- Referência GG: https://comunidadegg.com.br/
