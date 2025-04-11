// dataFetcher.ts
import pool from './db';

async function fetchFocosDeCalor(): Promise<any[]> {
    console.log("Função fetchFocosDeCalor() foi chamada.");
    try {
        const result = await pool.query('SELECT * FROM "dados_satelite"');
        console.log("Resultado da consulta (fetchFocosDeCalor):", result);
        console.log("Dados brutos (fetchFocosDeCalor):", result.rows);
        return result.rows;
    } catch (error) {
        console.error('Erro ao buscar dados (fetchFocosDeCalor):', error);
        return [];
    }
}

async function getFocosPorEstadoBiomaParaPizza(): Promise<any[]> {
    console.log("Função getFocosPorEstadoBiomaParaPizza() foi chamada.");
    try {
        const result = await pool.query(`
            SELECT estado, bioma, COUNT(*) AS total_focos
            FROM "dados_satelite"
            GROUP BY estado, bioma
            ORDER BY total_focos DESC
        `);
        console.log("Resultado da consulta (estado/bioma):", result);
        console.log("Dados brutos (estado/bioma):", result.rows);
        const formattedData = result.rows.map(row => ({
            label: `${row.estado} - ${row.bioma}`,
            value: parseInt(row.total_focos, 10)
        }));
        console.log("Dados formatados (estado/bioma):", formattedData);
        return formattedData;
    } catch (error) {
        console.error('Erro ao buscar focos por estado e bioma:', error);
        return [];
    }
}

async function getFocosPorRiscoEstadoParaPizza(): Promise<any> {
    console.log("Função getFocosPorRiscoEstadoParaPizza() foi chamada.");
    try {
        const result = await pool.query(`
            SELECT estado, risco_fogo AS ricos_fogo, COUNT(*) AS total_focos
            FROM "dados_satelite"
            GROUP BY estado, risco_fogo
            ORDER BY estado, total_focos DESC
        `);
        console.log("Resultado da consulta (risco/estado):", result);
        console.log("Dados brutos (risco/estado):", result.rows);
        const formattedData: { [key: string]: { label: string; value: number }[] } = {};
        result.rows.forEach(row => {
            console.log("Processando linha (risco/estado):", row);
            if (!formattedData[row.estado]) {
                formattedData[row.estado] = [];
                console.log(`Criando array para o estado (risco/estado): ${row.estado}`);
            }
            formattedData[row.estado].push({
                label: row.ricos_fogo,
                value: parseInt(row.total_focos, 10),
            });
            console.log(`Adicionando ao estado ${row.estado} (risco/estado): { label: ${row.ricos_fogo}, value: ${parseInt(row.total_focos, 10)} }`);
        });
        console.log("Dados formatados (risco/estado):", formattedData);
        return formattedData;
    } catch (error) {
        console.error('Erro ao buscar focos por risco e estado:', error);
        return {};
    }
}

export { fetchFocosDeCalor, getFocosPorEstadoBiomaParaPizza, getFocosPorRiscoEstadoParaPizza };