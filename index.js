const express = require('express')
const app = express()

const port = 5000
const http = require('http')
// http được install sẳn vời nodejs
const socketID = require('socket.io')
const io = socketIO(server)

io.on('connection', (socket) => {
    console.log('Connected')
    socket.on('disconnect', () =>{
        console.log('Client Disconnected.')
    })
})

app.get('/', (req, res) => {
    res.send('Hello World')
})

const server = http.createServer(app)
// khởi tạo 1 server thông qua http

server.listen(port, () => {
    console.log(`Server started with port. ${port}`)
    // sử dụng dấu `` (quy ước theo javascript) thay cho ''
    // có thể sử dụng cộng chuỗi
    // ('Server started with port.' + port)
    // dấu () là viết tắt của function() : 
    // comback thông tin khi port hk sử dụng được
})

