$(onReady);

function onReady() {
    console.log("jq loaded");
    $('#taskBtn').on('click', addTask);
    getRequest();
}

function addTask() {
    let newTask={};
    newTask.description=$('#taskInput').val();
    newTask.author=$('#authorInput').val();
    postRequest(newTask);
}

function postRequest(taskInfo) {
    $.ajax({
        type: 'POST',
        url: '/tasks',
        data: taskInfo,
        }).then(function(response) {
            console.log('Response from server.', response);
            getRequest();
        }).catch(function(error) {
            console.log('Error in POST', error)
            alert('Unable to add book at this time. Please try again later.');
        });
}

function getRequest() {
    $.ajax({
        type: 'GET',
        url: '/tasks'
        }).then(function(response) {
        console.log(response);
        renderToDOM(response);
        }).catch(function(error){
        console.log('error in GET', error);
        });
}

function renderToDOM(tasks) {
    $('#taskTable').empty();
    for (let task of tasks) {
        $('#taskTable').append(`
        <tr>
            <td id="titleData">${task.description}</td>
            <td id="authorData">${task.author}</td>
            <td><button onclick="putRequest(this)" data-value="${task.id}" title-name="${task.description}" author-name="${task.author}" class="${task.isComplete}">I finished it!</button></td>
            <td><button class="delete" onclick="deleteRequest(this)" data-value="${task.id}">Delete!</button></td>
        </tr>
        `)
    }
    $('.false').css('background-color', 'red')
    $('.true').css('background-color', 'green')
}

function putRequest(input){
    taskId=input.getAttribute("data-value");
    $.ajax({
        method: 'PUT',
        url: `/tasks/${taskId}`,
        // data: {
        //     isComplete: 'True'
        // }
    })
    .then(function(response){
        getRequest();
    })
    .catch( function(error) {
        alert('Error:', error);
    })
}

function deleteRequest(input){
    taskId=input.getAttribute("data-value");
    $.ajax({
        method: 'DELETE',
        url: `/tasks/${taskId}`
    })
    .then(function(response){
        getRequest();
    })
    .catch( function(error) {
        alert('Error:', error);
    })
}