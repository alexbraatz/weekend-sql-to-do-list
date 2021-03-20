$( document ).ready( startUp )

// to run on page load
function startUp(){
    clickHandlers();
    getTasks();
}

function clickHandlers(){
    $( '#addTaskBtn').on( 'click', addTask );
}

// GETs our tasks from db and then appends to DOM with showTasks
function getTasks(){
    console.log( 'in displayTasks' );
    // make an AJAX call to server. the server then connects to our route 'task_route' using pool to talk to our database
    $.ajax({
        method: 'GET',
        url: '/tasks'
    }).then( function( response ){
        //console.log( 'back from GET route with:', response );
        showTasks( response );
    }).catch( function( error ){
        console.log( error );
        alert( 'not today amigo!' );
    });
} // end getTasks

// POST our newly added task to the database
function addTask(){
    console.log( 'in addTask' );

    // get user input & package into object with default false values for a newTask
    let taskToSend = {
        newTask: $( '#taskIn' ).val(),
        complete: false,
        delete: false
    }
    // send object to server via POST
    $.ajax({
        method: 'POST',
        url: '/tasks',
        data: taskToSend
    }).then( function( response ){
        console.log( 'back from POST with:', response );
        getTasks();
    }).catch( function( error ){
        alert( 'not today amigo' );
        console.log( error );
    }) // end AJAX call
}



// this accepts an array of our tasks objects and append values to dom
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
} // end showTasks