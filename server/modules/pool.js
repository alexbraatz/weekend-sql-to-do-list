// create pool connection to db
const pg = require( 'pg' );

// config for the db connection
const config = {
    database: "weekend-to-do-app",
    host: "localhost",
    port: 5432,
    max: 10,
    idleTimeoutMillis: 15000
};

const pool = new pg.Pool( config );

// export our pool aka create a train route for 10 to and from database
module.exports = pool;