import axios from 'axios';

export default async function handler(req, res) {
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ error: 'ID do repositório é obrigatório' });
  }

  try {
    // Chama a API pública do GitHub com token do backend
    const response = await axios.get(
      `https://api.github.com/repositories/${id}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
          Accept: 'application/vnd.github+json'
        },
        validateStatus: (status) => status < 500
      }
    );

    if (response.status === 404) {
      return res.status(404).json({ error: 'Repositório não encontrado' });
    }

    if (response.status === 403) {
      const reset = response.headers['x-ratelimit-reset'];
      const resetDate = reset ? new Date(Number(reset) * 1000) : null;
      const message = resetDate
        ? `Limite da API atingido. Tente novamente às ${resetDate.toLocaleTimeString()}.`
        : 'Limite de requisições da API atingido. Tente novamente mais tarde.';
      return res.status(403).json({ error: message });
    }

    res.status(200).json(response.data);
  } catch (error) {
    console.error('Erro ao buscar repositório:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
}
