# Envio de e-mails

O fluxo de confirmação depende da interface `VerificationEmailSender`, não de um provedor específico. Os adaptadores são selecionados por `MAIL_PROVIDER`; assim, trocar de provedor não exige alterar o cadastro nem a confirmação da conta.

## Gmail API

Para usar Gmail sem SMTP, configure no ambiente do backend:

| Variável | Valor |
| --- | --- |
| `MAIL_PROVIDER` | `gmail-api` |
| `MAIL_FROM` | A conta Gmail autorizada no OAuth |
| `GOOGLE_CLIENT_ID` | Client ID OAuth do Google Cloud |
| `GOOGLE_CLIENT_SECRET` | Client secret OAuth |
| `GOOGLE_REFRESH_TOKEN` | Refresh token OAuth com escopo `https://www.googleapis.com/auth/gmail.send` |

Habilite a Gmail API no projeto Google Cloud e autorize a conta que enviará as mensagens com acesso offline. O backend troca o refresh token por um access token e envia a mensagem pela API HTTPS. O Gmail API em si não exige SMTP nem senha de app.

Mantenha os três valores OAuth como segredos no Railway; não os grave no repositório, frontend, prints ou mensagens. `MAIL_FROM` deve ser a conta autorizada ou um alias de envio previamente configurado no Gmail.

Durante a fase OAuth "Testing", o Google pode expirar refresh tokens após sete dias quando o app solicita escopos Gmail. Para staging de longa duração, será necessário ajustar o estado/publicação e cumprir os requisitos de consentimento/verificação do Google; teste primeiro com uma conta dedicada.

## Trocar de provedor

Para voltar ao SMTP, defina `MAIL_PROVIDER=smtp` e configure `MAIL_HOST`, `MAIL_PORT`, `MAIL_USERNAME`, `MAIL_PASSWORD`, `MAIL_SMTP_AUTH` e `MAIL_SMTP_STARTTLS_ENABLE`. Para outro provedor HTTP, implemente `VerificationEmailSender` e selecione o adaptador por configuração. O `EmailVerificationService` e as regras de token continuam iguais.

O indicador de saúde de e-mail fica desativado por padrão porque verifica SMTP, não o envio pela Gmail API. A saúde geral da aplicação não substitui um teste real de entrega de e-mail.
