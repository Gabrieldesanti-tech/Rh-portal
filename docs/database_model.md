# Modelagem do Banco de Dados

O banco de dados oficial do sistema utiliza o **PostgreSQL**, hospedado no Supabase. O controle de migrações e modelagem é feito pelo **Prisma ORM**.

## Entidades Principais

### `Employee` (Funcionários)
Entidade central do sistema, que armazena os dados primários de Recursos Humanos.
- **Campos Importantes:** `id`, `fullName`, `email`, `company` (Igreja Mananciais / Phizchat), `salary`, `status`.
- **Relacionamentos:**
  - Pertence a um `Department` (N:1).
  - Possui um `Position` (N:1).
  - Pode ter múltiplos registros de `Vacation` (1:N).

### `Department` (Departamentos)
Módulo estrutural da organização.
- **Campos Importantes:** `id`, `name`, `headcount`, `manager`.
- **Relacionamentos:** Possui vários `Employee` (1:N).

### `Position` (Cargos)
Catálogo de cargos disponíveis.
- **Campos Importantes:** `id`, `name`, `level` (Ex: Junior, Pleno, Senior), `baseSalary`.
- **Relacionamentos:** Possui vários `Employee` (1:N).

### `Vacation` (Férias)
Registro de controle de períodos concessivos e gozados.
- **Campos Importantes:** `id`, `employeeId`, `concessionStart`, `concessionEnd`, `status` (Aprovadas, Pendentes).
- **Relacionamentos:** Pertence a um `Employee` (N:1).

### `Announcement` (Comunicados)
Tabela para registro e distribuição de avisos corporativos.
- **Campos Importantes:** `id`, `title`, `content`, `priority`, `targetAudience` (Global, Departamental, Empresa específica).
