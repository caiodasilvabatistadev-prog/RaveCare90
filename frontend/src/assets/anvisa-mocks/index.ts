import mock01 from './01-receita.jpg'
import mock02 from './02-cadastro.jpg'
import mock03 from './03-anexo.jpg'
import mock04 from './04-autorizacao.jpg'
import mock05 from './05-compra.jpg'
import mock06 from './06-desembaraco.jpg'
import mock07 from './07-tratamento.jpg'

/** Educational mock UI prints (ilustrações) — not official Anvisa screenshots. */
export const anvisaStepPrints: Record<string, { src: string; alt: string; caption: string }> = {
  receita: {
    src: mock01,
    alt: 'Ilustração de receita médica com dados do produto e prescritor',
    caption: 'Ilustração · confira os campos da receita',
  },
  cadastro: {
    src: mock02,
    alt: 'Ilustração do Portal de Serviços com entrada gov.br',
    caption: 'Ilustração · Portal de Serviços / gov.br',
  },
  documentos: {
    src: mock03,
    alt: 'Ilustração do formulário de solicitação com anexo de receita',
    caption: 'Ilustração · anexar receita e enviar',
  },
  autorizacao: {
    src: mock04,
    alt: 'Ilustração de autorização aprovada com validade',
    caption: 'Ilustração · autorização emitida',
  },
  compra: {
    src: mock05,
    alt: 'Ilustração de compra do produto com checklist de documentos',
    caption: 'Ilustração · compra e documentos',
  },
  desembaraco: {
    src: mock06,
    alt: 'Ilustração de checklist na fiscalização sanitária',
    caption: 'Ilustração · fiscalização / desembaraço',
  },
  tratamento: {
    src: mock07,
    alt: 'Ilustração do acompanhamento RaveCare após o produto chegar',
    caption: 'Ilustração · acompanhamento contínuo',
  },
}
