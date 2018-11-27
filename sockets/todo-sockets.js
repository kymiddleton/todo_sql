// const users = {}

module.exports = function (io) {
    console.log('running');
    io.on('connection', function (socket) {
        console.log("connected");
        //Socket Routes
        socket.on('new-todo', function(data){
            console.log(data, "------ in new todo");
            io.emit('emit-todo', data);
        })

        socket.on('update-todo', function(data){
            io.emit('emit-update', data);
            console.log(data, "------ update todo");
        })
        
        socket.on('delete-todo', function(data){
            io.emit('emit-delete', data);
            console.log(data, "------ delete todo");
        })

        socket.on('new-user', function (data) {
            users[data.name]= socket;
            io.emit('emit-users', Object.keys(users))
        })

        console.log('connected');
    })
}