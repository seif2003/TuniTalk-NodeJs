import {Pool} from 'pg';

const pool = new Pool({
    user: 'postgres',
    password: 'admin',
    host: 'postgres',
    port: 5432,
    database: 'nodedb'
});

export default pool;