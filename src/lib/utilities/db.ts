import pg from 'pg';
import { POSTGRES_PASSWORD } from '$env/static/private';

const { Pool } = pg;

const pool = new Pool({
    user: 'postgres',
    password: POSTGRES_PASSWORD,
    host: '127.0.0.1',
    port: 5432,
    database: 'postgres',
})

export default pool;