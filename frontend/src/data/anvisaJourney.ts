export type AnvisaStep = {
  id: string
  number: string
  title: string
  summary: string
  details: string[]
  tip?: string
  /** Key into anvisaStepPrints mock UI assets */
  printKey?: string
}

export const anvisaOfficialLinks = [
  {
    label: 'Importação de produtos derivados de Cannabis (Anvisa)',
    href: 'https://www.gov.br/anvisa/pt-br/assuntos/medicamentos/controlados/cannabis/capa-importacao-de-produtos-derivados-de-cannabis',
  },
  {
    label: 'Solicitar autorização de importação excepcional (gov.br)',
    href: 'https://www.gov.br/pt-br/servicos/solicitar-autorizacao-para-importacao-excepcional-de-produtos-a-base-de-canabidiol',
  },
  {
    label: 'RDC nº 660/2022, critérios e procedimentos',
    href: 'https://www.gov.br/anvisa/pt-br/assuntos/medicamentos/controlados/cannabis',
  },
] as const

export const anvisaSteps: AnvisaStep[] = [
  {
    id: 'receita',
    number: '01',
    title: 'Confira se a receita está completa',
    summary:
      'Com a prescrição em mãos, revise os dados que a Anvisa costuma exigir no cadastro de importação para uso próprio.',
    details: [
      'Nome completo do paciente igual ao documento.',
      'Nome comercial do produto prescrito (não basta “CBD”, “óleo de cannabis” ou nome genérico).',
      'Posologia (dose diária), data, assinatura e número de registro do profissional no conselho de classe.',
    ],
    tip: 'Se algo estiver incompleto, fale com a Dra. Bianca antes de abrir o pedido na Anvisa, evita retrabalho.',
    printKey: 'receita',
  },
  {
    id: 'cadastro',
    number: '02',
    title: 'Cadastre-se no Portal de Serviços',
    summary:
      'O pedido de autorização de importação excepcional é feito pelo paciente (ou responsável legal) no Portal de Serviços do Governo Federal / Anvisa.',
    details: [
      'Acesse o serviço oficial de autorização para importar produtos derivados de Cannabis.',
      'Faça login com gov.br e preencha o formulário eletrônico de importação e uso.',
      'O cadastro deve estar no nome do paciente ou do responsável legal.',
    ],
    printKey: 'cadastro',
  },
  {
    id: 'documentos',
    number: '03',
    title: 'Anexe a receita e envie a solicitação',
    summary:
      'Envie a prescrição e as informações do produto solicitado. Produtos da lista da Nota Técnica da Anvisa podem ter aprovação automática; os demais passam por análise.',
    details: [
      'Anexe a receita emitida por profissional legalmente habilitado.',
      'Informe o produto conforme a prescrição e as orientações do portal.',
      'Guarde o protocolo e acompanhe em “Minhas Solicitações”.',
    ],
    tip: 'Confira também o e-mail (e a caixa de spam): a Anvisa pode comunicar a conclusão por lá.',
    printKey: 'documentos',
  },
  {
    id: 'autorizacao',
    number: '04',
    title: 'Aguarde a autorização',
    summary:
      'Só depois da aprovação do cadastro/autorização é que a importação para uso próprio pode seguir. A autorização tem prazo de validade (em regra, dois anos, conforme o serviço oficial).',
    details: [
      'Não compre nem despache o produto antes da autorização válida.',
      'Durante a validade, novas importações do produto autorizado ainda exigem a receita atualizada na fiscalização.',
      'Se o pedido for indeferido ou pedir correção, volte ao médico e ao portal oficial, não improvise atalhos.',
    ],
    printKey: 'autorizacao',
  },
  {
    id: 'compra',
    number: '05',
    title: 'Compre e organize a importação',
    summary:
      'Com a autorização em mãos, compre o produto prescrito pelo canal adequado e prepare a documentação para a entrada no Brasil.',
    details: [
      'Siga o produto e a quantidade alinhados à receita e à autorização.',
      'Organize fatura/documentos comerciais e a autorização emitida pela Anvisa.',
      'Remessa postal não é o caminho previsto para esse tipo de importação excepcional, confira a via permitida no serviço oficial.',
    ],
    printKey: 'compra',
  },
  {
    id: 'desembaraco',
    number: '06',
    title: 'Passe pela fiscalização sanitária',
    summary:
      'Na chegada (porto, aeroporto, fronteira ou recinto alfandegado), a autoridade sanitária confere os documentos antes do desembaraço.',
    details: [
      'Tenha autorização da Anvisa e receita prontas para apresentar.',
      'Em bagagem acompanhada, leve cópia da autorização conforme orientação oficial.',
      'Qualquer divergência de produto, quantidade ou documentos pode travar a liberação.',
    ],
    printKey: 'desembaraco',
  },
  {
    id: 'tratamento',
    number: '07',
    title: 'Comece o tratamento com acompanhamento',
    summary:
      'Produto em casa não é o fim do caminho, é o começo do cuidado contínuo com a médica que te acompanha.',
    details: [
      'Siga a posologia prescrita; não ajuste dose por conta própria.',
      'Anote efeitos, sono, humor e rotina para os retornos.',
      'No Rave Care, o acompanhamento ajuda a não ficar sozinha(o) entre uma consulta e outra.',
    ],
    tip: 'Dúvida de processo ou de sintoma? Fala com a Dra. Bianca, e confirma sempre no site oficial da Anvisa.',
    printKey: 'tratamento',
  },
]
