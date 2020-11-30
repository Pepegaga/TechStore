const Pool = require('pg').Pool

const pool = new Pool({
    user: 'postgres',
    password: 'Pokemon4ik',
    host: 'localhost',
    port: 5432,
    database: 'techstore_db',
})

module.exports = pool
