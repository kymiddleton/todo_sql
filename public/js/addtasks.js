const socket = io();

$(function () {
    const state = {
        toDoList: [],
    };

    $('#submit').on('click', function (event) {
        event.preventDefault();

        const newTodo = {
            todoItem: $('#todo-input').val().trim(),
            todoStatus: false
        };
        console.log(newTodo, "This is the new todo");
        if (newTodo.todoItem === '') {
            alert('Todo Item Required');
        }
        $.ajax({
            url: "/api/todo",
            method: "POST",
            data: newTodo
        })
        .then(function (data) {
            socket.emit('new-todo', data);
            console.log(data, "This should be the updated list");
            // Clear the form when submitting
            // getAllItems()
            $('#todo-input').val('');
            $('#todo-input').focus();
        })
    });
});

 socket.on('emit-todo', function (data) {
     console.log(data, "This is the new todo that is being emitted from the backend")
    populateList(data);
 });

function populateList(data) {
    // event.preventDefault();
    // $('#addTasks').empty();
    // data.forEach((data) => {
    const listTag = $('<li>');
    const textDiv = $('<div>');
    const button = $('<i class="far fa-dot-circle">');//x for delete
    
    button.attr('data-status', data.todoStatus);

    listTag.append()

    listTag.append(button);

    listTag.append(textDiv);
    // listTag.append(button);

    textDiv.addClass('textDiv');
    textDiv.text(data.todoItem);
    
   
    addUpdateListener(button);
    

    button.addClass('delete');
    button.attr('data-id', data._id);

    $('#addTasks').append(listTag);
};
// addDeleteListener();

function toggleCheckbox(element) {
    console.log('icon toggle function working');
    if ($(element).hasClass('far fa-circle')) { // not completed box
        $(element).removeClass('far fa-circle');//not completed box
        $(element).addClass('far fa-dot-circle');//checked completed
    }
}

function addUpdateListener(element) {
    $(element).on('click', function () {
        let id = $(this).attr('data-id');
        let status = $(this).attr('data-status');

        if (status === "false") {
            status = true;
        } else {
            status = false;
        }

        const updateTask =
        {
            id: id,
            todoStatus: status
        }

        $.post(`/api/todo/${id}`, updateTask)
        .then(function (data) {
            console.log("Posted")
            socket.emit('update-todo', data);
        });
        
        toggleCheckbox(this);
    })
}

// socket.on('update-todo', function (data) {
socket.on('emit-update', function (data) {
     console.log(data, "This is the updated todo being emitted from the backend")
    // getAllItems();
});

function getAllItems() {
    console.log("in get all items");
    $('#addTasks').empty();
    $.get('/api/todo', function (data) {
        console.log(data, "what is data");
      if(data){
        data.forEach((e) => {
            const listTag = $('<li>');
            const textDiv = $('<div>');
            // const button = $('<i class="far fa-times-circle">');//x for delete
            if (e.todoStatus == true) {
                button = $('<i class="far fa-dot-circle">');//checked completed
            } 
            else {
                button = $('<i class="far fa-circle not complete">');//unchecked not completed
            }

            button.attr('data-id', e._id);
            button.attr('data-status', e.todoStatus);

            listTag.append();
            listTag.append(button);
            listTag.append(textDiv);

            textDiv.addClass('textDiv');
            textDiv.text(e.todoItem);

            
            addUpdateListener(button);

            button.addClass('delete');
            // button.attr('data-id', e._id);

            $('#addTasks').append(listTag);
        });
        addDeleteListener(); 
      }  
    });
}

getAllItems();

function addDeleteListener() {
    $(".delete").on('click', function () {
        console.log('in delete listener');
        const deleteThisId = {
            
            id: $(this).attr('data-id'),
            status: $(this).attr('data-status')
        }
        
        if (deleteThisId.status === "true") {
            $.ajax({
                url: `/api/todo/${deleteThisId.id}`,
                method: "delete"
    
            }).then(function(data){
                socket.emit('delete-todo', data);
            });
            
        } else {
            status = false;
        }
    });
};