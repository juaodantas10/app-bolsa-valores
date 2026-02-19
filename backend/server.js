const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());

app.get('/api/quote', async (req, res) => {
  const { symbol } = req.query;

  if (!symbol) {
    return res.status(400).json({ error: 'O parâmetro "symbol" é obrigatório.' });
  }

  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'API_KEY não configurada no .env.' });
  }

  const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${encodeURIComponent(symbol)}&apikey=${apiKey}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      return res.status(502).json({ error: 'Falha ao consultar Alpha Vantage.' });
    }

    const data = await response.json();
    const quote = data['Global Quote'];

    if (!quote || Object.keys(quote).length === 0) {
      return res.status(404).json({ error: `Cotação não encontrada para ${symbol}.` });
    }

    return res.json({
      symbol: quote['01. symbol'],
      open: quote['02. open'],
      high: quote['03. high'],
      low: quote['04. low'],
      price: quote['05. price'],
      volume: quote['06. volume'],
      latestTradingDay: quote['07. latest trading day'],
      previousClose: quote['08. previous close'],
      change: quote['09. change'],
      changePercent: quote['10. change percent']
    });
  } catch (error) {
    return res.status(500).json({ error: 'Erro interno ao buscar cotação.' });
  }
});

app.get('/', (_req, res) => {
  res.send('API de cotações ativa. Use /api/quote?symbol=AAPL');
});

app.listen(PORT, () => {
  console.log(`Backend rodando em http://localhost:${PORT}`);
});
