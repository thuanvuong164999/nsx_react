import React from 'react';
import './App.scss';
import socketIOClient from 'socket.io-client'

class App extends React.Component{
  constructor() {
    super()
    this.state = {
      socketServer: '192.168.1.152:5000',
      receiveMessenger: ''
    }
  }
  // 192.168.1.152:5000 là server chung 

componentDidMount() {
  let socket = socketIOClient(this.state.socketServer)
  let self = this
  socket.on('receive-message', (value) => {
    let message = self.state.receiveMessenger
    message = message + '\n' + value
    self.setState({
      receiveMessenger:message
    })
  })
}
  // socket xuất ra connected hoặc disconnected khi npm start client

  onKeyPress = event => {
    let socket = socketIOClient(this.state.socketServer)
    if (event.key === 'Enter'){
      console.log(event.target.value)
      socket.emit('send-message', event.target.value)
    }
    // sử dụng dấu === cho so sánh bằng
    // console.log(event.key, event.keyCode)
    // console.log(event.target.value)
  }
  render(){
    return (
      <div className="App">
        <div className='App-Container'>
          <div className='chat-box'>
            <div className='receive-messenger'>
              <textarea value = {this.state.receiveMessenger}></textarea>
            </div>
            <div className='send-messenger'>
              <input type='text' onKeyPress={this.onKeyPress}></input>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
