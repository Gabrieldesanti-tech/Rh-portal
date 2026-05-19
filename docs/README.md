# Portal RH - Antigravity

Um sistema moderno e premium para gestão de Recursos Humanos, focado em alta performance, segurança e design corporativo.

## Descrição do Sistema
O Portal RH é uma plataforma de gestão de pessoas projetada para empresas que buscam modernidade e eficiência. O sistema abrange módulos como controle de funcionários, gestão de departamentos, quadro de cargos, gestão de férias e comunicados internos, tudo centralizado em uma interface escura (dark-mode), elegante e ultrarrápida.

## Arquitetura e Tecnologias
O sistema foi desenvolvido sob uma arquitetura moderna Serverless/Edge utilizando o framework **Next.js**.

### Tecnologias Utilizadas
- **Frontend:** React 19, Next.js 16 (App Router), TailwindCSS v4, Lucide Icons, Recharts.
- **Backend:** Next.js Route Handlers (API).
- **Banco de Dados:** PostgreSQL hospedado no Supabase (AWS us-west-2).
- **Autenticação:** Supabase Auth (JWT via Cookies Seguros).
- **ORM:** Prisma Client.

## Instruções de Execução

### Pré-requisitos
- Node.js (v20+)
- NPM ou Yarn

### Passo a Passo (Ambiente de Desenvolvimento)
1. Instale as dependências:
   ```bash
   npm install
   ```
2. Configure as variáveis de ambiente no arquivo `.env` baseando-se no `.env.example`. Você precisará das URLs do Supabase.
3. Sincronize o banco de dados via Prisma:
   ```bash
   npx prisma db push
   ```
4. Inicie o servidor local:
   ```bash
   npm run dev
   ```
5. Acesse `http://localhost:3000` e efetue login com seu usuário.
