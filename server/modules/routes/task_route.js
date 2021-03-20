const express = require( 'express' );
const tasksRouter = express.Router();
const pool = require( '../pool' );

tasksRouter.get( '/', ( req, res )=>{
    console.log( 'in our task GET route' );
    let queryString = `SELECT * FROM "tasks"`;
    pool.query( queryString ).then( ( results )=>{
        res.send( results.rows );
    }).catch( ( error )=> {
        console.log( 'not today amigo', error );
        res.sendStatus( 500 );
    })
}) // end GET route

tasksRouter.post( '/', ( req, res )=>{
    // req.body is the new task we'll be adding to the DB
    console.log( 'add new task POST route:', req.body );
    // create queryString
    let queryString = `INSERT INTO "tasks" ( "newTask", complete, delete ) VALUES ( $1, $2, $3 )`;

    pool.query( queryString, [ req.body.newTask, req.body.complete, req.body.delete ] ).then( ( results )=>{
        // if successful send back OK code
        res.sendStatus( 200 );
    }).catch( ( error )=>{
        console.log( error );
        res.sendStatus( 500 );
    })

}) // end POST route

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