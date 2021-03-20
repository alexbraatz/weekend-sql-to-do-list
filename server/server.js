// requires
const express = require( 'express' );
const app = express();
const bodyParser = require( 'body-parser' );
const tasksRouter = require( './modules/routes/task_route' );

// uses
app.use( express.static( "server/public" ) );
app.use( bodyParser.urlencoded( { extended: true } ) );
app.use( '/tasks', tasksRouter  );

// globals
const port = 5000;

// spin up server
app.listen( port, ()=>{
    console.log( 'server is up on:', port );
})
