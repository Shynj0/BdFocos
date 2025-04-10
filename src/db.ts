// db.ts
import { Pool } from 'pg';

const pool = new Pool({
  user: 'seu_usuario',       // Substitua pelo seu usuário do PostgreSQL
  host: 'localhost',        // Substitua pelo host do seu banco de dados (pode ser um endereço IP)
  database: 'bdqueimadas',   // O nome do seu banco de dados
  password: 'sua_senha',   // Substitua pela sua senha do PostgreSQL
  port: 5432,               // Porta padrão do PostgreSQL
});

export default pool;