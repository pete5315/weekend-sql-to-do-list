//run the onReady function when the page loads
$(onReady);

//onReady function for pageload functions
function onReady() {
    //event listener for adding a task
    $('#taskBtn').on('click', addTask);
    //render any existing data to the database
    getRequest();
}

//the add task function will grab the information from the DOM to eventually send to the database
function addTask() {
    //create an empty object to add DOM values to
    let newTask={};
    //grab the values from the DOM
    newTask.description=$('#taskInput').val();
    newTask.author=$('#authorInput').val();
    //send the values to the post request
    postRequest(newTask);
}

//the post request function will add new data to the database
function postRequest(taskInfo) {
    //ajax lets the client talk to the server
    $.ajax({
        //request type
        type: 'POST',
        url: '/tasks',
        data: taskInfo,
        }).then(function(response) {
            console.log('Response from server.', response);
            $('input').val('');
            getRequest();
        }).catch(function(error) {
            console.log('Error in POST', error)
            alert('Unable to add book at this time. Please try again later.');
        });
}

//the get request function will request table information from the server
function getRequest() {
    //ajax lets the client talk to the server
    $.ajax({
        //get call will request information from the server
        type: 'GET',
        //route for this call
        url: '/tasks'
        }).then(function(response) { //if successful, we should have a bunch of object information in an array
            //send the array to the render function
            renderToDOM(response);
        }).catch(function(error){ //if we fail, we want to log the error in the console
        console.log('error in GET', error);
        });
}

//this is the render function--it will put our table information on the DOM
function renderToDOM(tasks) {
    //vacate the current table so we can re-add everything that remains
    $('#taskTable').empty();
    //for loop to add each row individually
    for (let task of tasks) {
        //we need to add a different property depending on if the task has been completed or not
        //we're adding the description of the to-do as well as its author
        //it also needs a button to indicate it's been completed and one to delete it from the table
        if(task.isComplete===false) {
            $('#taskTable').append(`
            <tr>
                <td id="titleData">${task.description}</td>
                <td id="authorData">${task.author}</td>
                <td><button onclick="putRequest(this)" data-value="${task.id}" title-name="${task.description}" author-name="${task.author}" class="${task.isComplete}">I finished it!</button></td>
                <td><button class="delete" onclick="deleteRequest(this)" data-value="${task.id}">Delete!</button></td>
            </tr>
            `)
        } else {
            $('#taskTable').append(`
            <tr>
                <td id="titleData">${task.description}</td>
                <td id="authorData">${task.author}</td>
                <td><button onclick="putRequest(this)" data-value="${task.id}" title-name="${task.description}" author-name="${task.author}" class="${task.isComplete}">Oops, I actually didn't finish it</button></td>
                <td><button class="delete" onclick="deleteRequest(this)" data-value="${task.id}">Delete!</button></td>
            </tr>
            `)
        }
    }
    //if the isComplete property is false/true, make the table row red/green correspondingly
    $('.false').closest('tr').css('background-color', 'lightcoral').css('color', 'navy');
    $('.true').closest('tr').css('background-color', 'lightgreen').css('color', 'navy');
}
//the put request function will update the isComplete property for one row of the table
function putRequest(input){ //input is the jquery this from the button
    //grab the data-value from the button that was clicked
    taskId=input.getAttribute("data-value");
    //the isComplete status is being stored in the class of the button
    let isComplete=input.getAttribute("class");
    //when we click the button, we want to switch the boolean to its opposite value
    if (isComplete==='true') {
        isComplete=false;
    }
    else {
        isComplete=true;
    }
    //ajax lets the client talk to the server
    $.ajax({
        //put call will update information on the server
        method: 'PUT',
        //url includes the taskId so the server knows which row to update
        url: `/tasks/${taskId}`,
        data: {
            isComplete //new isComplete status
        }
    })
    .then(function(response){ //if it's successful, we'll need to get the new database from the server
        getRequest();
    })
    .catch( function(error) { //if the server fails, we want to know why
        alert('Error:', error);
    })
}

//the delete request function will let us remove tasks from the database
function deleteRequest(input){
    //grab the data-value from the button that was clicked
    taskId=input.getAttribute("data-value");
    //ajax lets the client talk to the server
    $.ajax({
        //delete method will delete a row from the server
        method: 'DELETE',
        //url includes the taskId so the server knows which row to delete
        url: `/tasks/${taskId}`
    })
    .then(function(response){ //if it's successful, we'll need to get the new database from the server
        getRequest();
    })
    .catch( function(error) { //if the server fails, we want to know why
        alert('Error:', error);
    })
}