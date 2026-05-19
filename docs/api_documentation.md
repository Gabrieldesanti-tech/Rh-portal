# Documentação da API

O Portal RH oferece uma API RESTful interna no diretório `/api/` para que o frontend se comunique com o banco de dados de maneira assíncrona.

## Autenticação
**Todas as rotas da API estão protegidas**.
Para consumir qualquer rota da API, o cliente deve enviar automaticamente no Header o Cookie da sessão (`sb-[id]-auth-token`). Caso contrário, a API retornará `401 Unauthorized`.

---

## 📌 Dashboard

### `GET /api/dashboard`
Retorna métricas gerenciais e financeiras resumidas do sistema.

**Resposta de Sucesso (200 OK):**
```json
{
  "totalEmployees": 150,
  "activeEmployees": 145,
  "monthlyPayroll": 450000.00,
  "recentHires": [
    { "id": "uuid", "fullName": "João Silva", "position": "Gerente", "admissionDate": "2026-05-18T00:00:00Z" }
  ],
  "payrollByCompany": [
    { "company": "Igreja Mananciais", "payroll": 150000.00, "employeeCount": 45 },
    { "company": "Phizchat", "payroll": 300000.00, "employeeCount": 100 }
  ]
}
```

---

## 📌 Funcionários

### `GET /api/funcionarios`
Retorna a listagem de todos os funcionários, com suporte a filtros via Query Params.

**Parâmetros de Consulta (Query Params):**
- `q`: String (Filtro por nome ou e-mail)
- `departmentId`: UUID do departamento
- `status`: "Ativo", "Férias", "Desligado"

**Resposta de Sucesso (200 OK):**
```json
[
  {
    "id": "uuid",
    "fullName": "João Silva",
    "email": "joao@empresa.com",
    "company": "Igreja Mananciais",
    ...
  }
]
```

### `POST /api/funcionarios`
Cria o registro de um novo funcionário no sistema.

**Payload de Requisição (JSON):**
```json
{
  "fullName": "Maria Souza",
  "email": "maria@empresa.com",
  "positionId": "uuid",
  "departmentId": "uuid",
  "company": "Phizchat",
  "salary": 5000.00,
  ...
}
```

**Respostas:**
- `201 Created`: Funcionário cadastrado com sucesso.
- `400 Bad Request`: Payload inválido (detalhes fornecidos no corpo da resposta gerados pelo Zod schema validator).
