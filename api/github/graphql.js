export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { query } = req.body;

    const response = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ query })
    });

    if (response.status === 403) {
      const reset = response.headers.get('x-ratelimit-reset');
      const resetDate = reset ? new Date(Number(reset) * 1000) : null;
      const message = resetDate
        ? `Limite da API atingido. Tente novamente às ${resetDate.toLocaleTimeString()}.`
        : 'Limite de requisições da API atingido. Tente novamente mais tarde.';
      return res.status(403).json({ error: message });
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error('Erro no GraphQL:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
}
