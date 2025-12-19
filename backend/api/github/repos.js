export default async function handler(req, res) {
  try {
    const params = new URLSearchParams(req.query).toString();

    const response = await fetch(
      `https://api.github.com/search/repositories?${params}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.GITHUB_TOKEN}`
        }
      }
    );

    const data = await response.json();

    // headers importantes para paginação e rate limit
    res.setHeader('link', response.headers.get('link') ?? '');
    res.setHeader(
      'x-ratelimit-reset',
      response.headers.get('x-ratelimit-reset') ?? ''
    );
    res.setHeader(
      'x-ratelimit-remaining',
      response.headers.get('x-ratelimit-remaining') ?? ''
    );

    if (response.status === 403) {
      const reset = response.headers.get('x-ratelimit-reset');
      const resetDate = reset ? new Date(Number(reset) * 1000) : null;
      const message = resetDate
        ? `Limite da API atingido. Tente novamente às ${resetDate.toLocaleTimeString()}.`
        : 'Limite de requisições da API atingido. Tente novamente mais tarde.';
      return res.status(403).json({ error: message });
    }

    res.status(200).json(data);
  } catch (error) {
    console.error('Erro ao buscar repositórios:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
}
