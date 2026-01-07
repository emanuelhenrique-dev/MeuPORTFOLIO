import axios from 'axios';

export default async function handler(req, res) {
  const { owner, repo } = req.query;

  if (!owner || !repo) {
    return res
      .status(400)
      .json({ error: 'Owner e nome do repositório são obrigatórios' });
  }

  try {
    // Faz a chamada ao GitHub via token do backend
    const response = await axios.get(
      `https://api.github.com/repos/${owner}/${repo}/readme`,
      {
        headers: {
          Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
          Accept: 'application/vnd.github+json'
        },
        validateStatus: (status) => status < 500
      }
    );

    if (response.status === 404) {
      return res.status(404).json({ error: 'README não encontrado' });
    }

    if (response.status === 403) {
      const reset = response.headers['x-ratelimit-reset'];
      const resetDate = reset ? new Date(Number(reset) * 1000) : null;
      const message = resetDate
        ? `Limite da API atingido. Tente novamente às ${resetDate.toLocaleTimeString()}.`
        : 'Limite de requisições da API atingido. Tente novamente mais tarde.';
      return res.status(403).json({ error: message });
    }

    // Decodifica o conteúdo Base64
    const content = Buffer.from(response.data.content, 'base64').toString(
      'utf-8'
    );

    res.status(200).json({ content });
  } catch (error) {
    console.error('Erro ao buscar README:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
}
