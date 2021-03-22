// create pool connection to db
const pg = require( 'pg' );
const url = require( 'url' );

let config = {};

// We need a different pg configuration if we're running
// on Heroku, vs if we're running locally.
//
// Heroku gives us a process.env.DATABASE_URL variable,
// so if that's set, we know we're on heroku.
if ( process.env.DATABASE_URL ){
    config = {
        // We use the DATABASE_URL from Heroku to connect to our DB
        connectionString: process.env.DATABASE_URL,
        // Heroku also requires this special `ssl` config
        ssl: { rejectUnauthorized: false },
    };
}
else {
    config = {
        host: 'localhost',
        port: 5432,
        database: "weekend-to-do-app"
    };
}

// // config for the db connection
// const config = {
//     database: process.env.weekend_to_do_app || "weekend-to-do-app",
//     host: "localhost",
//     port: 5432,
//     max: 10,
//     idleTimeoutMillis: 15000
// };

const pool = new pg.Pool( config );

pool.on( 'connect', () =>{
    console.log( 'Postgesql connected');
});

// the pool with emit an error on behalf of any idle clients
// it contains if a backend error or network partition happens
pool.on( 'error', ( err )=>{
    console.log( 'Unexpected error on idle client', error );
    process.exit(-1;)
})

// export our pool aka create a train route for 10 to and from database
module.exports = pool;