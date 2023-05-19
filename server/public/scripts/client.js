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
        <tr>
            <td id="titleData">${task.description}</td>
            <td id="authorData">${book.author}</td>
            <td><button class="edit" onclick="updateMode(this)" data-value="${task.id}" title-name="${task.description}" author-name="${task.author}" >Edit!</button></td>
            <td><button class="delete" onclick="deleteBooks(this)" data-value="${task.id}">Delete!</button></td>
        </tr>
    }
}