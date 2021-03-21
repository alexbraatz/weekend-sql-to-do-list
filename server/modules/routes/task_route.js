// initialize constants to connect server to db 
// express begins the handoff and pool completes the route
const express = require( 'express' );
const tasksRouter = express.Router();
const pool = require( '../pool' );

// establish GET route
tasksRouter.get( '/', ( req, res )=>{
    // create queryString and request all table info from tasks table in our db
    let queryString = `SELECT * FROM "tasks"`;
    // if successful, send each row of task object data from the tasks table
    pool.query( queryString ).then( ( results )=>{
        res.send( results.rows );
    }).catch( ( error )=> {
        console.log( 'not today amigo', error );
        res.sendStatus( 500 );
    })
}) // end GET route

// establish POST route
tasksRouter.post( '/', ( req, res )=>{
    // req.body is the new task we'll be adding to the DB
    let queryString = `INSERT INTO "tasks" ( "newTask", complete, delete ) VALUES ( $1, $2, $3 )`;
    pool.query( queryString, [ req.body.newTask, req.body.complete, req.body.delete ] ).then( ( results )=>{
        res.sendStatus( 200 );
    }).catch( ( error )=>{
        console.log( error );
        res.sendStatus( 500 );
    })
}) // end POST route

// establish PUT route
tasksRouter.put( '/:id', ( req, res )=>{
    console.log( 'task PUT route:', req.params );
    let queryString = `UPDATE "tasks" SET "complete"=true WHERE "id"=$1;`;
    pool.query( queryString, [ req.params.id ] ).then( ( results )=>{
        res.sendStatus( 200 );
    }).catch( ( error )=>{
        console.log( error );
        res.sendStatus( 500 );
    } )
}) // end PUT route

// establish DELETE route
tasksRouter.delete( '/:id', ( req, res )=>{
    console.log( 'task DELETE route:', req.params );
    let queryString = `DELETE FROM "tasks" WHERE "id"=$1`;
    pool.query( queryString, [ req.params.id ] ).then( ( results )=>{
        res.sendStatus( 200 );
    }).catch( ( error )=>{
        console.log( error );
        res.sendStatus( 500 );
    })
}) // end DELETE route

module.exports = tasksRouter;