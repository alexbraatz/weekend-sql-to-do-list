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
})

tasksRouter.post( '/', ( req, res )=>{
    console.log( 'add new task POST route:', req.body );
})

module.exports = tasksRouter;