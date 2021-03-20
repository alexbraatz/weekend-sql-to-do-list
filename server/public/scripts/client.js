$( document ).ready( startUp )

function startUp(){
    clickHandlers();
    getTasks();
}

function clickHandlers(){

}

function getTasks(){
    console.log( 'in displayTasks' );
    // make an AJAX call to server. the server then connects to our route 'task_route' using pool to talk to our database
    $.ajax({
        method: 'GET',
        url: '/tasks'
    }).then( function( response ){
        console.log( 'back from GET route with:', response );
        showTasks( response );
    }).catch( function( error ){
        console.log( error );
        alert( 'not today amigo!' );
    });
}

function showTasks( taskList ){
    console.log( 'in showTasks' );
    let el = $( '#viewTasks' );
    el.empty();
    for( task of taskList ){
        el.append(`
        <tr>
            <td>${task.newTask}</td>
            <td>${task.complete}</td>
            <td>${task.delete}</td>
        </tr>
        `);
    }
}