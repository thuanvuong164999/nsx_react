const express = require('express')
const app = express() // module express, app hỗ trợ server
const port = 5000
const http = require('http') // module http có sẳn trong react
const socketIO = require('socket.io')
// module socket: sử dụng trong phần mềm cần gửi message giữa 2 bên, di chung với express
const server = http.createServer(app) // tạo server http vào gán vào mục server
const io = socketIO(server)
const moment = require('moment')
// const room = 'main'
const cors = 'cors' //module khắc lỗi

//khai báo khi conect postgresql
const pg = require('pg') 
const env = require('dotenv').config() 
const config={
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT
}
const pool = new pg.Pool(config) 
// connect pgsql

io.on('connection', (socket) => {
    console.log('Connected') 
    socket.on('send-message', (value) => { //máy chủ gửi cho socket tín hiệu send-message và value
        console.log(value)
        let roomName = generrateRoom(value.room) //truyền nội dung của generrateRoom(value.room) vào roomName

        let msg = value.message 
        // value.message = msg.replace(/\:\)/g, '<li class="fas fa-smile"></li>')
        value.message = convert2Icon(msg)
        value.DaT = moment().format('MMMM Do YYYY, h:mm:ss a') //dataTime
        // value.message = convert2HTML(value.message)
        
        //create avatar
        let ava = value.userName
        value.avatar = createAvatar(ava)

        //gửi tín hiệu cho receive-message
        io.in(roomName).emit('receive-message', value) 
        save2DB(value, value.room) //thực hiện hàm save2DB
    })
    
    socket.on('join', (value) => { //máy chủ gửi cho socket tín hiệu join và value
        console.log(value)

        let roomName = generrateRoom(value.room) 
        socket.join(roomName) //socket thực hiện hàm join() 
        io.in(roomname).emit('joined', value)
        console.log(`${value.userName} joined ${value.room}`) 
        getOldDataFromDB(roomName, value.room) //thực hiện hàm getOldDataFromDB()
    })
    
    socket.on('leave', (value) => { //máy chủ gửi cho socket tín hiệu leave và value
        io.in(room).emit('leaved', value)
        socket.leave(room) //socket thực hiện hàm leave()
        console.log(`${value.userName} leaved`)
    })

    socket.on('typing', (value) => { //máy chủ gửi cho socket tín hiệu typing và value
        console.log(`${value.userName} typing.....`)
        console.log(value)
        console.log(value.text == '')
        if(value.text == '') { //nếu giá trị text trong value = rỗng
            io.in(room).emit('member_stop_typing', { 
                userName: value.userName
            })    
        } else {
            io.in(room).emit('member_typing', {
                userName: value.userName
            })    
        }
    })

    socket.on('disconnect', () => { //máy chủ gửi cho socket tín hiệu disconect
        console.log('Client disconnected.')
    })
})
app.get('/', (req, res) => { 
    res.send('Hello World')
})
server.listen(port, () => {
    console.log(`Server started with port ${port}`)
})


// khai báo database trên API
app.get('/api/room-list', cors(), (req, res) =>{ 
    pool.connect(function(err, client,done) {
        client.query(`select * from chat`, function(err, result){
            done()
            if(!err){
                res.send({
                    status: 200,
                    data: result.rows
                })
            }
        })
    })
})

function convert2Icon(message) {
    return message
        // .replace(/\:\)/gI, '<i class="fas fa-smile"></i>')
        // .replace(/\:\)/gI, '<i class="fas fa-frown"></i>')
        // .replace(/\;\)/gI, '<i class="fas fa-sad-tear"></i>')
        // .replace(/\;\)/gI, '<i class="fas fa-sad-cry"></i>')
        // .replace(/\:\o/gI, '<i class="fas fa-surprise"></i>')
        .replace(/\:\)/gi, '<span role="image" aria-label="slightly-smiling-face">&#x1f642</span>')
        .replace(/\=\)/gi, '<span role="image" aria-label="slightly-smiling-face">&#x1f642</span>')
        .replace(/\:\(/gi, '<span role="image" aria-label="slightly-frowning-face">&#x1f641</span>')
        .replace(/\=\(/gi, '<span role="image" aria-label="slightly-frowning-face">&#x1f641</span>')
        .replace(/\:\'\(/gi, '<span role="image" aria-label="crying-face">&#x1f622</span>')
        .replace(/\:\o/gi, '<span role="image" aria-label="open-mouth">&#x1f62e</span>')
        .replace(/\:\p/gi, '<span role="image" aria-label="stuck-out-tongue">&#x1f61b</span>')
        .replace(":d", '<span role="image" aria-label="smiley">&#x1f603</span>')
        .replace(":D", '<span role="image" aria-label="smiley">&#x1f603</span>')
        .replace("=d", '<span role="image" aria-label="smiley">&#x1f603</span>')
        .replace("=D", '<span role="image" aria-label="smiley">&#x1f603</span>')
        .replace(/\-\_\-/gi, '<span role="image" aria-label="expressionless">&#x1f611</span>')
        .replace(/\^\_\^/gi, '<span role="image" aria-label="smiling-face-smiling-eyes">&#x1f60a</span>')
        .replace(/\:\p/gi, '<span role="image" aria-label="stuck-out-tongue">&#x1f61b</span>')
        .replace(/\:\+1/g, '<i class="em em---1"></i>')
        .replace(/\x\o\x/gi, '<i class="em em-dizzy_face"/>')
        .replace(/\>\_\</g, '<i class="em em-confounded"/>')
        .replace(/\>\</g, '<i class="em em-laughing"></i>')        
}

function createAvatar(userStr) {
    return userStr.substr(0, 2)
}

function convert2HTML(message) {
    return message
        .replace(/\:\)/g, '<i class="em em-slightly_smiling_face"></i>')
        .replace(/\:\(/g, '<i class="em em-disappointed"></i>')
        .replace(/\:d/g, '<i class="em em-smiley"></i>')
        .replace(/\:\+1/g, '<i class="em em-ok_hand"></i>')
}

function save2DB(value, room_id) {
    pool.connect(function(err, client, done) {
        let sql = `insert into chat (sent_by, created_at, message) values(${value.userName}', '${value.create_at}', '${value.message}', '${room_id});`
        client.query(sql, function(err, result){
            done()
        })
    })
}

function getOldDataFromDB(roomName, room_id, userName){
    pool.connect(function(err, client,done) {
        client.query(`select * from chat where room_id = ${room_id}`, function(err, result){
            done()
            if(!err){
                io.in(room).emit(`histories-${userName}`, {
                    room: room_id,
                    userName: userName,
                    rows: result.rows
                })
            }
        })
    })
}

function generrateRoom(){
    return `room ${id}`
}