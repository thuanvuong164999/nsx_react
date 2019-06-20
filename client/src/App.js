import React from 'react';
import './App.scss';
import socketIOClient from 'socket.io-client'
import MessageList from './component/message-list/message-list';
const socket = socketIOClient('http://6186deb9.ngrok.io/')
//khai bao socket la bien khong thay doi

class App extends React.Component{
  constructor() {
    super()
    this.state = {
      socketServer: 'http://6186deb9.ngrok.io/',
      receiveMessenger: '',
      buttonTitle: 'Join',
      userName: 'ThuanYH',
      afterEnter:'',
      message: '',
      messages: []
    }
  }
  // 192.168.1.152:5000 là server chung 

componentDidMount() {
  socket.on('receive-message', (value) => {
    this.setMessage(`${value.userName}: ${value.message}`)
  })
  this.onReceived()
  this.onJoined()
  this.onLeaved()
  this.onTypingFromMember()
}
  // socket xuất ra connected hoặc disconnected khi npm start client

  onTypingFromMember(){
    socket.on('member_typing', (user) => {
      if(user.userName !== this.state.userName){
        this.setMessage(`${user.userName} typing ....`)
      }
    })
  }
  // ràn buột dk để typing không hiện ở trang mình

  onReceived() {
    // socket.on('receive-messenger', (value) => {
    //   this.setMessage(`${value.userName}: ${value.message}`)
    // })
    socket.on('receive-message', (value)=>{
      let item ={
        user: value.userName,
        avatar: value.avatar,
        message: value.message,
        createAt: value.created_at,
        fr:value.userName === this.state.userName ? 'fr':''
      }
      let items = this.state.messages
      items.push(item)
      this.setState({
        messages: items
      })
      this.setMessage(`${value.userName}:${value.message}`)
    })
  }

  onJoined() {
    socket.on('joined',(user) => {
      console.log(user)
      this.setMessage(`User ${user.userName} joined`)
    })
  }

  onLeaved() {
    socket.on('leaved',(user) => {
      console.log(user)
      this.setMessage(`User ${user.userName} leaved`)
    })
  }

  setMessage(value){
    let message = this.state.receiveMessenger
    message = value + '\n' + message
    this.setState({
      receiveMessenger:message
    })
  }

  onKeyPress = event => {
    if (event.key === 'Enter'){
      console.log(event.target.value)
      socket.emit('send-message', {
        userName: this.state.userName,
        message: event.target.value
      })
      this.setState({
        message: ''
      })
      this.setState({
        afterEnter: ''
      })
    }
    // sau khi Enter, receiveMessenger reset
    // sử dụng dấu === cho so sánh bằng
    // console.log(event.key, event.keyCode)
    // console.log(event.target.value)
  }

  onClick = event => {
    let Title = 'Join'
    if(this.state.buttonTitle === 'Join') {  
      Title = 'Leave'
      this.join()
    }else{
      this.leave()
    }
    this.setState({
      buttonTitle: Title
    })
  }

  join(){
    socket.emit('join', {
      userName:this.state.userName
    })
  }
  //socket.emit() gui tin hieu cho server
  //server quy dinh join viet thuong

  leave(){
    socket.emit('leave', {
      userName:this.state.userName
    })
  }

  onChange = event => {
    this.setState({
      afterEnter: event.target.value
    })
    // message được thay đổi thông qua onChange
    socket.emit('typing', {
      userName: this.state.userName
    })
  }

  render(){
    return (
      <div className="App">
        <div className='App-Container'>
          <div className='chat-box'>
            <div className='receive-messenger'>
              {/* <textarea value = {this.state.receiveMessenger}></textarea> */}
              {<MessageList messages={this.state.messages}></MessageList>}
            </div>
            <div className='send-messenger'>
              <input type='text' value={this.state.afterEnter} onKeyPress={this.onKeyPress} onChange={this.onChange}></input>
              <button type='submit' onClick={e => this.onClick(e)}>{this.state.buttonTitle}</button>
            </div>
            
          </div>
        </div>
      </div>
    );
  }
}

export default App;
