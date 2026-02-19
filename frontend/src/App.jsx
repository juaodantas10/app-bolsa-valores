import { useState } from 'react';

const API_BASE_URL = 'http://localhost:3001';

export default function App() {
  const [symbol, setSymbol] = useState('AAPL');
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchQuote = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');
    setQuote(null);

    try {
      const response = await fetch(`${API_BASE_URL}/api/quote?symbol=${encodeURIComponent(symbol)}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Erro ao buscar cotação.');
      }

      setQuote(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="container">
      <h1>Cotações de Ações</h1>

      <form onSubmit={fetchQuote} className="form">
        <input
          type="text"
          value={symbol}
          onChange={(e) => setSymbol(e.target.value.toUpperCase())}
          placeholder="Ex: AAPL"
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Consultando...' : 'Buscar'}
        </button>
      </form>

      {error && <p className="error">{error}</p>}

      {quote && (
        <section className="card">
          <h2>{quote.symbol}</h2>
          <p><strong>Preço:</strong> ${quote.price}</p>
          <p><strong>Abertura:</strong> ${quote.open}</p>
          <p><strong>Máxima:</strong> ${quote.high}</p>
          <p><strong>Mínima:</strong> ${quote.low}</p>
          <p><strong>Variação:</strong> {quote.change} ({quote.changePercent})</p>
          <p><strong>Último pregão:</strong> {quote.latestTradingDay}</p>
        </section>
      )}
    </main>
  );
}
