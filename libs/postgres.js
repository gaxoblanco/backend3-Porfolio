const {Pool} = require('pg');

  const pool = new Pool({
    host: 'localhost',
    port: 5432,
    user: 'root',
    password: 'root',
    database: 'store'
  });

  await pool.connect();

module.exports = pool;
