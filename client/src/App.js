import React from 'react'
import './App.scss'
import ChatComp from './component/chat-component/chat';

class App extends React.Component{
  render(){
    return(
      <React.Fragment>
        <div className='App'>
          <ChatComp></ChatComp>
        </div>
      </React.Fragment>
    )
  }
}

export default App;