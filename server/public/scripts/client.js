$( document ).ready( startUp )

// to run on page load
function startUp(){
    clickHandlers();
    getTasks();
} // end startUp

// handles all of our button clicks on homepage
function clickHandlers(){
    $( '#addTaskBtn').on( 'click', addTask );
    $( '#viewTasks' ).on( 'click', '.deleteBtn', removeTask );
    $( '#viewTasks' ).on( 'click', '.completeBtn', completeTask );
} // end clickHandlers

// getTasks will GET our tasks from db and then append to DOM with showTasks
function getTasks(){
    // make an AJAX call to server. the server then connects to our route 'task_route' using pool to talk to our database
    $.ajax({
        method: 'GET',
        url: '/tasks'
    }).then( function( response ){
        showTasks( response );
    }).catch( function( error ){
        alert( 'not today amigo!' );
    });
} // end getTasks

// addTask will POST our newly added task to the database. Once successful we run getTasks and clearInputs
function addTask(){
    // get user input & package into object with default false boolean values for a newTask as taskToSend
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
        getTasks();
        clearInputs();
    }).catch( function( error ){
        alert( 'not today amigo' );
    }) // end AJAX call

} // end addTask

// showTasks accepts an array of our tasks objects and append values to DOM
function showTasks( taskList ){
    // jquery selects our viewTasks id to dynamically append user inputs to DOM
    let el = $( '#viewTasks' );
    el.empty();
    // loop through each task and append to DOM
    for( task of taskList ){
        let reservedHTML = `<button data-id="${task.id}" class="completeBtn">Done!</button>`;

        if( task.complete ){
            reservedHTML = "Completed!";
        }
        el.append(`
        <tr>
            <td>${task.newTask}</td>
            <td>${reservedHTML}</td>
            <td><button data-id="${task.id}" class="deleteBtn">Remove</button></td>
        </tr>
        `);
    }
} // end showTasks

// removeTasks requests a DELETE route 
function removeTask(){
    // catch the id from the table row in our db of the object we'd like to delete
    const myId = $( this ).data( 'id' );
    $.ajax({
        method: 'DELETE',
        url: '/tasks/' + myId
    }).then( function( response ){
        getTasks();
    }).catch( function( error ){
        alert( 'not today amigo' );
    })
} // end removeTask

// completeTasks makes a PUT request to update our 'Done!' button to display 'Completed!' 
function completeTask(){
    const myId = $( this ).data( 'id' );
    // AJAX PUT call to update db
    $.ajax({
        method: 'PUT',
        url: '/tasks/' + myId
    }).then( function( response ){
        getTasks();
    }).catch( function ( error ){
        alert( 'not today amigo' );
    })
}

// clearInputs will clear all input text boxes 
function clearInputs(){
    $( '#taskIn' ).val( '' );
} // end clearInputs

