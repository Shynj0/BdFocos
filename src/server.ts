// server.ts
import express, { Request, Response } from 'express';
import fetchFocosDeCalor from './dataFetcher';

const app = express();
const port = 3000;

app.get('/focos', async (req: Request, res: Response) => {
    try {
        const data = await fetchFocosDeCalor();
        res.json(data);
    } catch (error) {
        console.error('Erro ao buscar dados:', error);
        res.status(500).json({ error: 'Erro ao buscar dados do banco de dados' });
    }
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});