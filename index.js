const express = require('express')
const app = express()

const port = 5000
const http = require('http')
// http được install sẳn vời nodejs
const socketIO = require('socket.io')
const server = http.createServer(app)
// khởi tạo 1 server thông qua http
const io = socketIO(server)
const moment = require('moment')
const room = 'room1'
// socket.on() mình gửi tín hiệu cho server
io.on('connection', (socket) => {
    console.log('Connected')
    socket.on('send-message', (value) => {
        // let msg = value.message
        // console.log(value.replace(/\:\)/g, '<i class="fas fa-smile"></i>'))
        // value.message = msg.replace(/\:\)/g, '<i class="fas fa-smile"></i>')
        // value.message = convert2Icon(value.message)
        value.message = convert2HTML(value.message)
        value.avatar = createAvatar(value.userName)
        value.create_at = moment().format('MMMM Do YYYY, h:mm:ss a')
        console.log(value)
        io.in(room).emit('receive-message', value)
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
        console.log(value)
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

// function convert2Icon(){
//     return message
//         .replace(/\:\)/gi, '<i class="fas fa-smile"></i>')
//         .replace(/\:\(/gi, '<i class="fas fa-frown"></i>')
//         .replace(/\;\)/gi, '<i class="far fa-sad-cry"></i>')
//         .replace(/\;\o/gi, '<i class="far fa-grin-tongue-wink"></i>')
// }
//  ký hiệu của mã là (/\<ký hiệu 1>\<ký hiệu 2>/gi, '<mã icon>'
// gi : không phân biệt hoa thường

function createAvatar(userStr){
    return userStr.substr(0, 2)
}

function convert2HTML(message){
    return message
        .replace(/\:\)/gi, '<i class="em em-slightly_smiling_face">')
        .replace(/\:\(/gi, '<i class="em em-slightly_frowning_face">')
        .replace(/\:d/g, '<i class="em em-zany_face">')
        .replace(/\:|/g,'<i class="em em-neutral_face">')
        
        .replace(/\@b/g, '<i class="em em---1">')
        .replace(/\@p/g, '<i class="em em--1">')
        .replace(/\@100/g, '<i class="em em-100">')
        .replace(/\></g, '<i class="em em-tired_face">')
        .replace(/\:o/gi, '<i class="em em-astonished">')
        .replace(/\@@/g, '<i class="em em-dizzy_face">')
        .replace(/\@beers/g, '<i class="em em-beers">')
        .replace(/\@anger/g, '<i class="em em-anger">')
        .replace(/\@clock/g, '<i class="em em-alarm_clock">')
        // tại sao máy tính e không cần </i>
}