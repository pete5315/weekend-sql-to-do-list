//boilerplate for setting up a pool to reference the SQL data
const pg = require('pg');
let pool;

if (process.env.DATABASE_URL) {
    pool = new pg.Pool({
        connectionString: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false
        }
    });
}
else {
    pool = new pg.Pool({ //the port has to correspond to what we're using in Postico/postgreSQL
        host: 'localhost',
        port: 5432,
        database: 'weekend-to-do-app', 
    });
}

module.exports = pool;
