# 🔐 README — Integrante 4 Túlio Teixeira Silva
**Segurança, Qualidade e Integração Contínua (CI/CD)**

> **Papel no projeto:** O Integrante 4 garante **segurança do back-end**, **qualidade do código** e **esteira de integração/entrega contínua**. A missão é proteger as rotas (Auth/RBAC), validar entradas, padronizar respostas, testar bem e publicar com confiabilidade.

---

## 🎯 Objetivo do Código-Fonte
Implementar a **camada transversal** de **Segurança + Qualidade + CI** do back-end:

1. **🔑 Autenticação e Autorização (RBAC)**
   - JWT com refresh token;
   - RBAC por papéis (`admin`, `manager`, `user`);
   - Guards para operações sensíveis (criar/editar/remover/exportar).

2. **🪵 Observabilidade e Auditoria**
   - Logger estruturado (ex.: `pino`) com correlação;
   - Trilhas de auditoria (quem/ação/quando/origem);
   - Liveness/Readiness: `GET /health` e `GET /ready`.

3. **🧪 Qualidade e Confiabilidade**
   - Testes **unitários** (`vitest`/`jest`) e **E2E** (`supertest`);
   - **Validação** de payloads (`zod`/`yup`) e sanitização;
   - **Rate limiting** e **CORS** por ambiente.

4. **⚙️ Integração Contínua (CI)**
   - GitHub Actions: **build → lint → test → coverage → artifact**;
   - Gates de qualidade (PR falha se não passar);
   - Publicação automática do **OpenAPI** para o time.

> **Integração no projeto final:**  
> • As **rotas** de API dos outros integrantes passam pelos **middlewares** deste módulo (auth, RBAC, rate limit).  
> • O **pipeline de CI** valida e libera a **imagem do back-end** usada no deploy.  
> • A **documentação OpenAPI** consolidada é consumida pelo Front-end e QA.

---

## 🧩 Pontos de Integração

### 🔗 Back-end (rotas dos Integrantes 1–3)
Aplique os middlewares exportados por este módulo:
```ts
import { authGuard, rbac, validate } from "@/core/security";
import { createOrderSchema } from "@/schemas/order";

app.post(
  "/api/orders",
  authGuard(),                 // valida JWT/refresh
  rbac(["manager", "admin"]),  // restringe por papel
  validate(createOrderSchema), // valida body/query/params
  createOrderController
);
```

### 🖥️ Front-end
- Recebe **erros padronizados** `{ code, message, details }` e status consistentes;
- Consome o **OpenAPI JSON** publicado para gerar clients tipados.

### ☁️ DevOps / Deploy
- Readiness/Liveness para balanceadores;
- Logs estruturados prontos para ELK/CloudWatch/Datadog.

---

## 🛠️ Stack e Dependências-Chave
- **Runtime/Framework:** Node.js, Express/Koa/Fastify  
- **Type Safety & Padrão:** TypeScript, ESLint, Prettier  
- **Segurança:** `jsonwebtoken`, `bcrypt`/`argon2`, `helmet`, `cors`, `express-rate-limit`  
- **Validação:** `zod` (ou `yup`)  
- **Testes:** `vitest`/`jest`, `supertest` (E2E)  
- **Logs:** `pino` + `pino-http`  
- **Docs:** `swagger-ui-express` + OpenAPI (YAML/JSON)  
- **CI:** GitHub Actions

---

## 📁 Estrutura de Pastas (módulo do Integrante 4)
```
/src
  /core
    /security
      auth.guard.ts         # validação de JWT/refresh
      rbac.guard.ts         # RBAC por rota
      rate-limit.ts         # proteção contra abuso
      sanitizer.ts          # sanitização de entrada
    /observability
      logger.ts             # logger estruturado
      audit.ts              # trilhas de auditoria
      health.controller.ts  # /health e /ready
  /schemas
    order.schema.ts         # exemplo de schema Zod
    user.schema.ts
  /tests
    unit/
      auth.guard.spec.ts
      rbac.guard.spec.ts
    e2e/
      orders.e2e.spec.ts
  /docs
    openapi.yaml            # contrato consolidado
  /config
    env.ts                  # carregamento seguro de envs
```

---

## 🔐 Variáveis de Ambiente
Crie `.env` (ou configure segredos no CI):
```
NODE_ENV=development
PORT=3000
JWT_SECRET=troque-este-segredo
JWT_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d
RATE_LIMIT_WINDOW_MS=60000
RATE_LIMIT_MAX=100
LOG_LEVEL=info
```
> **⚠️ Importante:** **não** commit o `.env`. Use **Actions → Secrets** no GitHub para o CI.

---

## ▶️ Como Rodar Localmente
```bash
# 1) Instalar dependências
npm install

# 2) Variáveis de ambiente
cp .env.example .env   # ou crie manualmente

# 3) Rodar em dev
npm run dev

# 4) Qualidade e testes
npm run lint
npm run test
npm run test:e2e
npm run coverage

# 5) Documentação (Swagger)
npm run docs:serve     # expõe /docs com swagger-ui
```

**Rotas úteis**  
- `GET /health` → status da aplicação  
- `GET /ready` → pronto para receber tráfego  
- `GET /docs` → documentação da API (Swagger UI)

---

## 🤝 Convenções de Código e Commits
**Conventional Commits — exemplos:**
- `feat(auth): suporte a refresh token`
- `fix(rbac): ajustar papel 'manager' nas rotas de pedido`
- `test(e2e): cobre fluxo de criação de pedido`
- `chore(ci): adiciona gate de coverage a 85%`

**Branches:** `feat/*`, `fix/*`, `chore/*`, `docs/*`, `test/*`  
**Lint/Format:** PR falha se lint/typecheck/test/coverage não passarem.

---

## 🔄 Pipeline de CI (Visão Geral)
1. **Build** (TS → JS)  
2. **Lint + Typecheck**  
3. **Tests** (unit + E2E) com **coverage**  
4. **Artifacts** (relatórios + OpenAPI)  
5. **Publicação** da doc para o time  
> ✅ **Merge** permitido apenas com jobs verdes e cobertura mínima atendida.

---

## 📚 Padrões de Erro e Resposta
**Formato de erro (exemplo):**
```json
{ "code": "AUTH.INVALID_TOKEN", "message": "Token inválido", "details": null }
```
- **400 Validação:** retorna detalhes de schema;  
- **401/403 Auth/RBAC:** mensagens claras e auditadas;  
- **Idempotência:** recomenda-se `Idempotency-Key` em rotas sensíveis.

---

## ✅ Definition of Done (Integrante 4)
- [ ] Middlewares de **auth**, **RBAC**, **rate limit** e **sanitização** aplicáveis nas rotas;  
- [ ] **Logs estruturados** e **auditoria** em operações críticas;  
- [ ] **/health** e **/ready** implementados;  
- [ ] Testes **unitários + E2E** com cobertura mínima;  
- [ ] **CI** validando build, lint, testes e coverage;  
- [ ] **OpenAPI** atualizada e servida em `/docs`.

---

## 🗺️ Diferencial em Relação aos Outros Integrantes
Enquanto os demais focam em **features** (regras de negócio, modelos e rotas), o Integrante 4 garante que **tudo rode com segurança, previsibilidade e padrão** — do commit ao deploy.

---

## 📩 Contato Técnico
Abra uma **issue** com o rótulo `security/ci` e inclua: rota, payload, logs relevantes e resultado esperado.
