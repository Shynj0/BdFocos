// dataFetcher.ts
import pool from './db';

async function fetchFocosDeCalor(): Promise<any[]> {
    try {
        const result = await pool.query('SELECT * FROM "focos de calor"');
        return result.rows;
    } catch (error) {
        console.error('Erro ao buscar dados:', error);
        return [];
    }
}

export default fetchFocosDeCalor;