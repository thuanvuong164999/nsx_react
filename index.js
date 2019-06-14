const express = require('express')
const app = express()

const port = 5000
const http = require('http')
// http được install sẳn vời nodejs
const socketIO = require('socket.io')
const server = http.createServer(app)
// khởi tạo 1 server thông qua http
const io = socketIO(server)

io.on('connection', (socket) => {
    console.log('Connected')
    socket.on('send-message', (value) => {
        io.in(room).emit('receive-messenger', value)
    })

    socket.on('join', (value) => {
        socket.join(room)
        // phuong thuc join
        io.in(room).emit('joined', value)
        console.log(`${value.userName} joined`)
    })
    socket.on('leave', (value) => {
        socket.leave(room)
        // phuong thuc leave
        io.in(room).emit('leaved', value)
        console.log(`${value.userName} leaved`)
    })

    socket.on('typing', (value) =>{
        io.in(room).emit('member_typing', {
            userName: value.userName
        })
    })

    socket.on('disconnect', () =>{
        console.log('Client Disconnected.')
    })
})
// socket xuất ra connected hoặc disconnected khi npm start client

app.get('/', (req, res) => {
    res.send('Hello World')
})

server.listen(port, () => {
    console.log(`Server started with port. ${port}`)
    // sử dụng dấu `` (quy ước theo javascript) thay cho ''
    // có thể sử dụng cộng chuỗi
    // ('Server started with port.' + port)
    // dấu () là viết tắt của function() : 
    // comback thông tin khi port hk sử dụng được
})

