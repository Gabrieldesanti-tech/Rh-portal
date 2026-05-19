Abaixo está um **PRD completo** para o sistema de gerenciamento de RH, já considerando suas funcionalidades, tecnologias recomendadas e APIs fáceis de integrar.

# PRD — Sistema de Gerenciamento de RH

## 1. Nome do produto

Sistema de Gerenciamento de RH

## 2. Visão geral

O sistema será uma plataforma web de gerenciamento de Recursos Humanos, com foco em centralizar os dados dos funcionários, organizar funções, salários, férias, comunicados internos e avisos automáticos.

A plataforma deverá funcionar como um dashboard administrativo para o RH e gestores, permitindo visualizar todos os colaboradores da empresa, seus dados profissionais, funções, pagamentos, status, férias e histórico interno.

Além disso, o sistema terá uma área administrativa para envio de comunicados por e-mail, tanto manuais quanto automáticos, como avisos gerais, datas comemorativas e mensagens institucionais.

---

# 3. Problema a ser resolvido

Atualmente, empresas que controlam RH por planilhas, mensagens e documentos separados enfrentam problemas como:

1. Dificuldade para visualizar todos os funcionários em um único lugar.
2. Falta de organização sobre cargos, funções e pagamentos.
3. Controle manual de férias.
4. Falta de histórico de comunicados enviados.
5. Comunicação interna descentralizada.
6. Risco de esquecer datas importantes, como aniversários, Dia das Mães, Dia dos Pais, feriados e avisos internos.
7. Dificuldade para automatizar tarefas repetitivas do RH.

O sistema busca resolver isso criando uma plataforma centralizada, segura e automatizada.

---

# 4. Objetivo do produto

Criar uma plataforma de RH que permita:

1. Cadastrar e visualizar todos os funcionários.
2. Organizar funções, setores e cargos.
3. Armazenar dados pessoais, profissionais e financeiros dos colaboradores.
4. Controlar a quantia de pagamento dos funcionários.
5. Calcular férias de acordo com as regras da empresa.
6. Enviar comunicados por e-mail para todos os funcionários.
7. Automatizar avisos em datas comemorativas.
8. Permitir que o administrador revise e aprove comunicados antes do envio.
9. Criar um dashboard visual para gestão rápida do RH.
10. Reduzir tarefas manuais e repetitivas.

---

# 5. Público-alvo

O sistema será utilizado por:

1. RH da empresa.
2. Administradores.
3. Gestores.
4. Diretoria.
5. Funcionários, caso exista uma área futura de autoatendimento.

---

# 6. Perfis de usuário

## 6.1 Administrador

Usuário com acesso total ao sistema.

Permissões:

1. Cadastrar funcionários.
2. Editar dados dos funcionários.
3. Visualizar pagamentos.
4. Criar comunicados.
5. Aprovar comunicados automáticos.
6. Configurar datas comemorativas.
7. Configurar regras de férias.
8. Gerenciar usuários e permissões.

## 6.2 RH

Usuário responsável pela gestão operacional dos colaboradores.

Permissões:

1. Cadastrar funcionários.
2. Atualizar informações profissionais.
3. Gerenciar férias.
4. Visualizar documentos e dados cadastrais.
5. Criar avisos internos.
6. Consultar dashboard.

## 6.3 Gestor

Usuário com acesso limitado à sua equipe.

Permissões:

1. Visualizar funcionários do próprio setor.
2. Consultar informações básicas.
3. Acompanhar férias da equipe.
4. Receber comunicados.

## 6.4 Funcionário

Usuário final que poderá receber e-mails e, futuramente, acessar uma área própria.

Permissões futuras:

1. Visualizar seus próprios dados.
2. Solicitar férias.
3. Consultar comunicados.
4. Atualizar dados cadastrais mediante aprovação.

---

# 7. Funcionalidades principais

## 7.1 Dashboard geral de RH

O sistema deverá possuir uma tela inicial com indicadores principais da empresa.

O dashboard deverá exibir:

1. Total de funcionários.
2. Funcionários ativos.
3. Funcionários afastados.
4. Funcionários desligados.
5. Funcionários por setor.
6. Funcionários por cargo.
7. Folha total estimada de pagamento.
8. Férias próximas.
9. Férias vencidas ou pendentes.
10. Próximos aniversários.
11. Próximas datas comemorativas.
12. Últimos comunicados enviados.

Exemplo de cards no dashboard:

1. Total de colaboradores: 125.
2. Folha mensal estimada: R$ 430.000,00.
3. Férias nos próximos 30 dias: 8.
4. Comunicados pendentes de aprovação: 3.

---

## 7.2 Cadastro de funcionários

O sistema deverá permitir cadastrar todos os funcionários da empresa.

Campos recomendados:

1. Nome completo.
2. CPF.
3. RG.
4. E-mail corporativo.
5. E-mail pessoal.
6. Telefone.
7. Data de nascimento.
8. Endereço.
9. Estado civil.
10. Cargo.
11. Função.
12. Departamento.
13. Gestor responsável.
14. Data de admissão.
15. Tipo de contrato.
16. Status do funcionário.
17. Salário ou valor de pagamento.
18. Benefícios.
19. Observações internas.

Status possíveis:

1. Ativo.
2. Afastado.
3. Em férias.
4. Desligado.
5. Em admissão.

---

## 7.3 Organização por função, cargo e departamento

O sistema deverá permitir organizar os funcionários por estrutura da empresa.

Funcionalidades:

1. Cadastro de departamentos.
2. Cadastro de cargos.
3. Cadastro de funções.
4. Associação do funcionário ao departamento.
5. Associação do funcionário ao gestor.
6. Filtro por setor, cargo, status e tipo de contrato.
7. Visualização da estrutura organizacional.

Exemplo:

Departamento: Financeiro
Cargo: Analista Financeiro
Função: Controle de contas a pagar
Gestor: Coordenador Financeiro

---

## 7.4 Gestão de pagamento dos funcionários

O sistema deverá armazenar a quantia de pagamento dos funcionários.

Campos recomendados:

1. Salário base.
2. Tipo de pagamento.
3. Benefícios.
4. Bonificações.
5. Descontos manuais.
6. Valor total estimado.
7. Data do último reajuste.
8. Histórico de alterações salariais.

Importante: este módulo inicialmente não precisa ser uma folha de pagamento completa. No MVP, ele pode funcionar como um controle interno de valores.

Versões futuras podem integrar folha de pagamento, contabilidade ou ERP.

---

## 7.5 Aba administrativa para envio de e-mails e avisos

O sistema deverá possuir uma área administrativa para criar, revisar e enviar comunicados.

Funcionalidades:

1. Criar comunicado.
2. Definir título do e-mail.
3. Escrever corpo da mensagem.
4. Selecionar destinatários.
5. Enviar para todos os funcionários.
6. Enviar por departamento.
7. Enviar por cargo.
8. Salvar como rascunho.
9. Pré-visualizar mensagem.
10. Enviar para aprovação.
11. Aprovar ou reprovar comunicado.
12. Enviar automaticamente após aprovação.
13. Registrar histórico de envio.

Fluxo ideal:

1. Admin ou RH cria o comunicado.
2. Sistema salva como rascunho.
3. Responsável revisa.
4. Responsável aprova.
5. Sistema envia automaticamente.
6. Sistema registra data, hora e destinatários.

---

## 7.6 Comunicados automáticos

O sistema deverá permitir o envio automático de avisos com base em regras configuradas.

Tipos de comunicados automáticos:

1. Dia das Mães.
2. Dia dos Pais.
3. Dia da Mulher.
4. Natal.
5. Ano Novo.
6. Aniversário do funcionário.
7. Aniversário de empresa do funcionário.
8. Feriados nacionais.
9. Férias próximas.
10. Avisos internos recorrentes.

Exemplo:

No Dia das Mães, o sistema identifica a data cadastrada no calendário de eventos e envia automaticamente uma mensagem para todos os funcionários ou para um grupo específico, desde que o aviso já esteja aprovado.

---

## 7.7 Aprovação de comunicados automáticos

Como você mencionou que o envio será automático, mas “apenas sendo verificado”, o sistema deve ter uma regra de aprovação.

Fluxo:

1. O sistema identifica uma data comemorativa próxima.
2. O sistema gera ou seleciona o comunicado padrão.
3. O aviso aparece na aba “Pendentes de aprovação”.
4. O administrador revisa.
5. O administrador aprova.
6. O sistema agenda o envio.
7. Na data correta, o e-mail é enviado automaticamente.

Status do comunicado:

1. Rascunho.
2. Pendente de aprovação.
3. Aprovado.
4. Agendado.
5. Enviado.
6. Cancelado.
7. Reprovado.

---

## 7.8 Cálculo de férias

O sistema deverá calcular férias de acordo com as regras da empresa e, quando aplicável, seguir a lógica da CLT.

Pela regra geral da CLT, após 12 meses de contrato, o empregado passa a ter direito a férias proporcionais conforme o artigo 130; o governo também define o período aquisitivo como 12 meses de trabalho. ([Plataforma Planalto][1])

O sistema deverá permitir configurar regras internas da empresa, como:

1. Quantidade padrão de dias de férias.
2. Regra de período aquisitivo.
3. Regra de período concessivo.
4. Permissão ou não de divisão das férias.
5. Quantidade mínima de dias por período.
6. Bloqueio de férias em datas específicas.
7. Aprovação obrigatória pelo RH.
8. Aprovação obrigatória pelo gestor.
9. Política de férias coletivas.
10. Regra para funcionários em período de experiência.

Pela regra trabalhista atual, as férias podem ser divididas em até três períodos, desde que um deles tenha pelo menos 14 dias corridos. ([Serviços e Informações do Brasil][2])

Campos do módulo de férias:

1. Data de admissão.
2. Início do período aquisitivo.
3. Fim do período aquisitivo.
4. Início do período concessivo.
5. Fim do período concessivo.
6. Dias disponíveis.
7. Dias utilizados.
8. Dias restantes.
9. Status da solicitação.
10. Histórico de férias.

Status possíveis:

1. Aguardando período aquisitivo.
2. Disponível para solicitação.
3. Solicitada.
4. Aprovada.
5. Reprovada.
6. Em andamento.
7. Concluída.
8. Vencida.

---

# 8. Regras de negócio

## 8.1 Funcionários

1. Todo funcionário deve possuir nome, e-mail, cargo, departamento e data de admissão.
2. Um funcionário pode pertencer a apenas um departamento principal.
3. Um funcionário pode ter um gestor responsável.
4. Funcionários desligados não devem receber comunicados internos, salvo configuração específica.
5. Dados de pagamento só podem ser vistos por usuários autorizados.

## 8.2 Pagamentos

1. Apenas administradores e RH autorizado podem visualizar valores de pagamento.
2. Toda alteração salarial deve gerar histórico.
3. O sistema deve registrar quem alterou o valor e quando.
4. O valor de pagamento deve ser tratado como dado sensível.

## 8.3 Comunicados

1. Comunicados enviados para todos devem passar por revisão.
2. Comunicados automáticos precisam estar previamente aprovados.
3. O sistema deve manter histórico de todos os e-mails enviados.
4. O administrador deve conseguir cancelar um envio agendado.
5. O sistema deve permitir segmentar comunicados por setor, cargo ou status do funcionário.

## 8.4 Férias

1. O sistema deve calcular férias com base na data de admissão.
2. O sistema deve respeitar as regras configuradas pela empresa.
3. O sistema deve alertar férias próximas do vencimento.
4. O sistema deve permitir aprovação ou reprovação de férias.
5. O sistema deve registrar histórico de férias.
6. O sistema não deve permitir férias conflitantes com bloqueios configurados pela empresa.

---

# 9. Requisitos funcionais

1. O sistema deve permitir login de usuários.
2. O sistema deve permitir cadastro de funcionários.
3. O sistema deve permitir edição de dados dos funcionários.
4. O sistema deve permitir cadastro de cargos.
5. O sistema deve permitir cadastro de departamentos.
6. O sistema deve permitir cadastro de funções.
7. O sistema deve permitir armazenar valor de pagamento.
8. O sistema deve permitir visualizar dashboard geral.
9. O sistema deve permitir filtrar funcionários.
10. O sistema deve permitir calcular férias.
11. O sistema deve permitir configurar regras de férias.
12. O sistema deve permitir criar comunicados.
13. O sistema deve permitir aprovar comunicados.
14. O sistema deve permitir enviar e-mails para todos.
15. O sistema deve permitir envio segmentado por departamento.
16. O sistema deve permitir envio automático de datas comemorativas.
17. O sistema deve permitir agendamento de comunicados.
18. O sistema deve registrar histórico de envios.
19. O sistema deve permitir consultar comunicados enviados.
20. O sistema deve permitir gerenciar permissões de usuário.

---

# 10. Requisitos não funcionais

1. O sistema deve ser web e responsivo.
2. O sistema deve funcionar bem em desktop, tablet e celular.
3. O sistema deve proteger dados sensíveis.
4. O sistema deve ter controle de permissões.
5. O sistema deve registrar logs de ações importantes.
6. O sistema deve ter backup do banco de dados.
7. O sistema deve ter boa performance no dashboard.
8. O sistema deve permitir crescimento futuro.
9. O sistema deve ser fácil de usar por pessoas não técnicas.
10. O sistema deve seguir boas práticas de LGPD.

---

# 11. Stack técnica recomendada

## Opção mais recomendada para esse projeto

| Camada         | Tecnologia recomendada            | Motivo                                                               |
| -------------- | --------------------------------- | -------------------------------------------------------------------- |
| Front-end      | Next.js com TypeScript            | Ideal para dashboards, páginas administrativas e sistema web moderno |
| Back-end       | Node.js com TypeScript            | Boa integração com APIs, e-mails, autenticação e automações          |
| Banco de dados | PostgreSQL                        | Seguro, robusto e ideal para dados relacionais de RH                 |
| ORM            | Prisma ORM                        | Facilita criação de tabelas, consultas e integração com PostgreSQL   |
| Autenticação   | Supabase Auth ou Clerk            | Reduz esforço para login, permissões e segurança                     |
| E-mails        | Resend ou SendGrid                | APIs simples para envio de e-mails transacionais e comunicados       |
| Agendamentos   | Cron jobs / BullMQ / Trigger.dev  | Para envios automáticos e rotinas programadas                        |
| Hospedagem     | Vercel + Supabase/Neon            | Fácil deploy para Next.js e banco PostgreSQL                         |
| Storage        | Supabase Storage ou S3 compatível | Para documentos futuros dos funcionários                             |

O Next.js possui App Router e suporte moderno para aplicações full-stack, sendo adequado para dashboards administrativos. ([Next.js][3])

Para o back-end, Node.js continua sendo uma boa escolha, mas hoje a recomendação prática seria usar **Node.js 24 LTS**, pois a versão 26 ainda está como “Current” e só entra em LTS depois. ([Node.js][4])

O Prisma ORM é recomendado porque oferece acesso type-safe ao banco e suporta PostgreSQL, incluindo bancos self-hosted e serverless como Supabase e Neon. ([Prisma][5])

---

# 12. Linguagens recomendadas

## 12.1 TypeScript

Principal linguagem recomendada.

Deve ser usada no front-end e no back-end.

Motivos:

1. Evita muitos erros comuns de JavaScript.
2. Ajuda a organizar melhor os tipos de dados.
3. É excelente para sistemas com funcionários, pagamentos, férias e permissões.
4. Funciona muito bem com Next.js, Node.js e Prisma.

## 12.2 SQL

Deve ser usado no banco de dados PostgreSQL.

Motivos:

1. Permite consultas seguras e estruturadas.
2. É ideal para relatórios.
3. Ajuda a relacionar funcionários, cargos, férias e comunicados.

## 12.3 JavaScript

Pode aparecer em bibliotecas e integrações, mas o ideal é manter o projeto em TypeScript.

## 12.4 Python

Não é necessário para o MVP.

Pode ser usado futuramente se o sistema tiver:

1. Análise de dados avançada.
2. IA para gerar comunicados.
3. Previsões de turnover.
4. Relatórios inteligentes.

---

# 13. APIs recomendadas

## 13.1 API de envio de e-mails

### Opção 1: Resend

Boa para envio de e-mails transacionais, avisos internos e comunicados.

Uso no sistema:

1. Enviar comunicado para todos.
2. Enviar aviso automático.
3. Enviar mensagem de aniversário.
4. Enviar alerta de férias.
5. Enviar notificação de aprovação.

O Resend é uma plataforma focada em e-mail para desenvolvedores, com editor visual e ferramentas para criar e enviar e-mails. ([Resend][6])

### Opção 2: SendGrid

Boa opção para maior escala.

Uso no sistema:

1. Envio em massa.
2. Campanhas internas.
3. Estatísticas de entrega.
4. Controle de contatos.
5. E-mails transacionais.

O SendGrid possui API v3 com interface REST para envio de e-mails em escala, campanhas e gestão de contatos. ([Twilio][7])

Minha recomendação: começar com **Resend** pela simplicidade. Se a empresa precisar de grande volume e estatísticas avançadas, considerar SendGrid.

---

## 13.2 API de feriados e datas comemorativas

### BrasilAPI

Uso no sistema:

1. Buscar feriados nacionais brasileiros.
2. Criar alertas automáticos.
3. Evitar agendar férias ou comunicados em feriados.
4. Alimentar calendário interno.

A BrasilAPI possui endpoint para consulta de feriados nacionais brasileiros e calcula automaticamente feriados móveis, como Carnaval e Páscoa. ([Brasil API][8])

### Nager.Date

Uso no sistema:

1. Buscar feriados internacionais.
2. Suportar empresas com funcionários em outros países.
3. Consultar feriados por país.

A Nager.Date oferece uma API pública de feriados para mais de 100 países, com retorno em JSON. ([Nager.Date][9])

Minha recomendação: para empresa no Brasil, usar **BrasilAPI** no MVP.

---

## 13.3 API de calendário

### Google Calendar API

Uso futuro:

1. Sincronizar férias aprovadas com calendário.
2. Criar eventos internos.
3. Registrar datas comemorativas.
4. Mostrar agenda do RH.
5. Gerar lembretes.

A Google Calendar API permite trabalhar com eventos de calendário, incluindo eventos únicos e recorrentes. ([Google for Developers][10])

Essa integração pode ficar para uma segunda versão, porque o MVP pode ter um calendário interno próprio.

---

## 13.4 API de autenticação

### Supabase Auth

Uso no sistema:

1. Login com e-mail e senha.
2. Recuperação de senha.
3. Controle de usuário.
4. Autorização.
5. Login social futuro.

O Supabase Auth oferece autenticação e autorização, com SDKs e endpoints para gerenciar usuários, além de métodos como senha, magic link, OTP, login social e SSO. ([Supabase][11])

### Clerk

Uso no sistema:

1. Login rápido.
2. Componentes prontos.
3. Controle de sessão.
4. Proteção de rotas.
5. Integração forte com Next.js.

O Clerk possui SDK para Next.js com componentes, hooks e helpers prontos para facilitar autenticação. ([Clerk][12])

Minha recomendação: usar **Supabase Auth** se quiser banco, autenticação e storage no mesmo ecossistema. Usar **Clerk** se quiser a autenticação mais pronta e bonita visualmente.

---

# 14. Arquitetura recomendada

## 14.1 Estrutura geral

Front-end:

Next.js + TypeScript

Back-end:

API Routes do Next.js ou servidor Node.js separado

Banco de dados:

PostgreSQL

ORM:

Prisma

Autenticação:

Supabase Auth ou Clerk

Envio de e-mails:

Resend

Feriados:

BrasilAPI

Agendamentos:

Cron jobs ou fila de tarefas

---

## 14.2 Fluxo de funcionamento

1. O administrador acessa o sistema.
2. O sistema autentica o usuário.
3. O dashboard carrega os indicadores de RH.
4. O administrador cadastra funcionários.
5. O sistema armazena os dados no PostgreSQL.
6. O sistema calcula férias com base na data de admissão e regras internas.
7. O administrador cria comunicados.
8. O comunicado passa por aprovação.
9. O sistema agenda o envio.
10. A API de e-mail envia automaticamente.
11. O histórico de envio é salvo no banco.

---

# 15. Modelo inicial de banco de dados

Tabelas principais:

## users

Usuários que acessam o sistema.

Campos:

1. id
2. name
3. email
4. password_hash ou auth_provider_id
5. role
6. status
7. created_at
8. updated_at

## employees

Funcionários da empresa.

Campos:

1. id
2. full_name
3. cpf
4. rg
5. email
6. phone
7. birth_date
8. admission_date
9. department_id
10. position_id
11. manager_id
12. salary
13. status
14. created_at
15. updated_at

## departments

Departamentos da empresa.

Campos:

1. id
2. name
3. description
4. manager_id
5. created_at

## positions

Cargos e funções.

Campos:

1. id
2. name
3. description
4. department_id
5. created_at

## vacation_rules

Regras de férias da empresa.

Campos:

1. id
2. name
3. acquisition_months
4. default_days
5. max_splits
6. min_days_first_period
7. min_days_other_periods
8. requires_approval
9. created_at

## vacations

Registros de férias.

Campos:

1. id
2. employee_id
3. acquisition_start
4. acquisition_end
5. concession_start
6. concession_end
7. requested_start
8. requested_end
9. total_days
10. status
11. approved_by
12. created_at

## announcements

Comunicados.

Campos:

1. id
2. title
3. body
4. type
5. status
6. target_type
7. scheduled_date
8. approved_by
9. created_by
10. sent_at
11. created_at

## announcement_recipients

Destinatários dos comunicados.

Campos:

1. id
2. announcement_id
3. employee_id
4. email
5. status
6. sent_at

## commemorative_dates

Datas comemorativas.

Campos:

1. id
2. name
3. date
4. recurrence_type
5. default_message
6. auto_send
7. requires_approval

---

# 16. MVP recomendado

Para a primeira versão, eu recomendo desenvolver apenas o essencial:

## MVP — Versão 1

1. Login.
2. Dashboard geral.
3. Cadastro de funcionários.
4. Cadastro de cargos e departamentos.
5. Controle de salário/pagamento.
6. Cálculo básico de férias.
7. Cadastro de comunicados.
8. Aprovação de comunicados.
9. Envio de e-mail para todos.
10. Envio automático de datas comemorativas.
11. Histórico de comunicados enviados.
12. Controle de permissões básico.

---

# 17. Funcionalidades para versões futuras

## Versão 2

1. Área do funcionário.
2. Solicitação de férias pelo funcionário.
3. Aprovação de férias pelo gestor.
4. Upload de documentos.
5. Integração com Google Calendar.
6. Relatórios exportáveis em PDF e Excel.
7. Aniversários automáticos.
8. Notificações internas dentro do sistema.

## Versão 3

1. Integração com folha de pagamento.
2. Assinatura digital.
3. Controle de ponto.
4. Avaliação de desempenho.
5. IA para gerar comunicados.
6. Aplicativo mobile.
7. Integração com WhatsApp Business API.

---

# 18. Critérios de aceite

O sistema será considerado aprovado quando:

1. O administrador conseguir fazer login.
2. O administrador conseguir cadastrar funcionários.
3. O dashboard mostrar total de funcionários.
4. O dashboard mostrar funcionários por setor.
5. O sistema armazenar cargo, função e departamento.
6. O sistema armazenar valor de pagamento.
7. O sistema calcular férias com base na data de admissão.
8. O administrador conseguir criar comunicado.
9. O comunicado puder ser aprovado antes do envio.
10. O sistema conseguir enviar e-mail para todos os funcionários.
11. O sistema conseguir agendar aviso automático.
12. O sistema conseguir registrar histórico de envio.
13. Dados salariais ficarem protegidos por permissão.
14. Usuários sem permissão não conseguirem acessar dados sensíveis.

---

# 19. Métricas de sucesso

1. Redução do uso de planilhas.
2. Redução do tempo de consulta de dados dos funcionários.
3. Redução de erros no controle de férias.
4. Aumento da eficiência do RH.
5. Maior organização dos comunicados internos.
6. Menor esquecimento de datas comemorativas.
7. Centralização dos dados de funcionários.
8. Mais segurança no acesso a dados sensíveis.

---

# 20. Pontos de atenção com LGPD

Como o sistema vai armazenar dados pessoais e informações de pagamento, ele precisa seguir boas práticas de LGPD.

Requisitos importantes:

1. Controle de acesso por perfil.
2. Criptografia de dados sensíveis quando necessário.
3. Logs de alteração.
4. Histórico de acesso.
5. Permissão específica para visualizar salário.
6. Backup seguro.
7. Política de exclusão ou anonimização.
8. Termo interno de uso dos dados.
9. Evitar exposição desnecessária de CPF, salário e documentos.

---

# 21. Recomendação final de implementação

Para esse projeto, eu recomendo a seguinte stack:

**Front-end:** Next.js + TypeScript
**Back-end:** Node.js + TypeScript
**Banco:** PostgreSQL
**ORM:** Prisma
**Autenticação:** Supabase Auth
**Envio de e-mail:** Resend
**Feriados:** BrasilAPI
**Hospedagem:** Vercel
**Banco hospedado:** Supabase ou Neon
**Agendamentos:** Cron jobs na Vercel, Trigger.dev ou BullMQ

Essa combinação é boa porque é moderna, fácil de integrar, tem bastante documentação, funciona bem para dashboard e permite evoluir o sistema sem precisar reescrever tudo depois.

[1]: https://www.planalto.gov.br/ccivil_03/decreto-lei/del1535.htm?utm_source=chatgpt.com "DEL1535 - Planalto"
[2]: https://www.gov.br/pt-br/trabalhista/textos/descanso-e-mais-facilidade-ferias-podem-ser-divididas-em-ate-tres-vezes?utm_source=chatgpt.com "férias podem ser divididas em até três vezes - Portal Gov.br"
[3]: https://nextjs.org/docs/app?utm_source=chatgpt.com "Next.js Docs: App Router"
[4]: https://nodejs.org/en/about/previous-releases?utm_source=chatgpt.com "Node.js Releases"
[5]: https://www.prisma.io/docs?utm_source=chatgpt.com "Get started with Prisma | Prisma Documentation"
[6]: https://resend.com/?utm_source=chatgpt.com "Resend · Email for developers"
[7]: https://www.twilio.com/docs/sendgrid/api-reference?utm_source=chatgpt.com "SendGrid v3 API reference"
[8]: https://brasilapi.com.br/docs?utm_source=chatgpt.com "Brasil API (1.0.0)"
[9]: https://date.nager.at/Api?utm_source=chatgpt.com "Holiday API - Nager.Date"
[10]: https://developers.google.com/workspace/calendar/api/v3/reference/events?utm_source=chatgpt.com "Events | Google Calendar"
[11]: https://supabase.com/docs/guides/auth?utm_source=chatgpt.com "Auth | Supabase Docs"
[12]: https://clerk.com/docs/nextjs/getting-started/quickstart?utm_source=chatgpt.com "Next.js Quickstart (App Router) - Getting started"
