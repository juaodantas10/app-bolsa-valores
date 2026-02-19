# App de Cotações de Ações

Estrutura completa de um aplicativo web com:
- **Backend** em Node.js + Express
- **Frontend** em React (Vite)
- Consulta de cotação usando a API gratuita da **Alpha Vantage**

## Estrutura

```bash
.
├── backend
│   ├── .env.example
│   ├── package.json
│   └── server.js
└── frontend
    ├── index.html
    ├── package.json
    ├── vite.config.js
    └── src
        ├── App.jsx
        ├── main.jsx
        └── styles.css
```

## Pré-requisitos

- Node.js 18+
- NPM 9+
- Chave gratuita da Alpha Vantage: https://www.alphavantage.co/support/#api-key

## 1) Configurar backend

```bash
cd backend
cp .env.example .env
```

Edite o arquivo `.env` e informe sua chave:

```env
API_KEY=SUA_CHAVE_ALPHA_VANTAGE
PORT=3001
```

Instalar dependências:

```bash
npm install
```

Rodar backend:

```bash
npm run dev
# ou
npm start
```

API disponível em:
- `GET http://localhost:3001/api/quote?symbol=AAPL`

## 2) Configurar frontend

Em outro terminal:

```bash
cd frontend
npm install
npm run dev
# ou npm start
```

Frontend disponível em:
- `http://localhost:5173`

## Exemplo de uso

1. Abra o frontend no navegador.
2. Digite um ticker (ex.: `AAPL`, `MSFT`, `PETR4.SA`).
3. Clique em **Buscar** para ver a cotação.

## Observações

- O plano gratuito da Alpha Vantage possui limite de requisições por minuto/dia.
- Em caso de limite excedido, a API pode retornar mensagens de aviso/erro.
