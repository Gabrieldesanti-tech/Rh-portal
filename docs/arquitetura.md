# Documento de Arquitetura de Software

## Visão Geral
O Portal RH adota uma arquitetura Fullstack baseada no ecossistema **Next.js**, permitindo renderização híbrida (SSR e CSR) e oferecendo uma camada de API integrada. A infraestrutura de dados é totalmente delegada ao Supabase (PostgreSQL), reduzindo a sobrecarga de operações.

## Camada de Frontend (Apresentação)
A interface é construída em **React 19** e estilizada com **Tailwind CSS v4**. O design segue a diretriz corporativa escura ("Dark Mode Premium") com toques de "Glassmorphism" e paleta em tons verde neon `#e8ff2a`.
A estrutura de páginas é baseada no roteador `app/` do Next.js. Componentes de UI foram construídos do zero para máxima fidelização de marca (sem o uso de bibliotecas de componentes massivas que poluem o visual).

## Camada de Backend (API e Middleware)
O Backend reside na pasta `src/app/api/`. As rotas operam como funções Serverless e se comunicam diretamente com o banco de dados.
- **Middleware:** O sistema implementa o `src/middleware.ts` para capturar todas as requisições, validar os tokens de sessão (JWT) com o Supabase e proteger rotas e APIs contra acessos anônimos ("Defense in Depth").

## Camada de Banco de Dados (Database)
Utiliza-se o **Supabase** como plataforma de backend as a service, provendo um banco relacional poderoso (PostgreSQL 15+). A conexão com o banco é feita através do **Prisma ORM**, garantindo tipagem estrita de ponta a ponta (TypeScript).
Para lidar com os limites de conexão em ambientes Serverless, usa-se a porta `6543` com suporte a *PgBouncer* (Supabase IPv4 Pooler).

## Fluxo do Sistema
1. **Navegação Inicial:** O usuário acessa `/`. O Middleware intercepta e direciona para `/login`.
2. **Autenticação:** O usuário insere credenciais; o Supabase valida e retorna um Cookie de Sessão persistente seguro (HttpOnly/Lax).
3. **Redirecionamento:** Após o login bem-sucedido, ocorre o push para `/dashboard`.
4. **Dashboard:** O componente Client-side faz um `fetch()` para `/api/dashboard`, que consulta o Prisma de forma segura (pois o acesso à API exige autenticação). O Dashboard renderiza gráficos complexos usando o `recharts`.
5. **Gestão de Dados:** Módulos adicionais como `/funcionarios` executam operações CRUD consumindo suas respectivas rotas API, sempre passando pelo funil de segurança do Middleware.
