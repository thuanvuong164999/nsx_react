import React from 'react';
import './chat.scss';
import MessageList from '../message-list/message-list';
import FriendList from '../friends-list/friend-list';
import SendMessComp from '../send-message/send-message';


class ChatComp extends React.Component {
    constructor() {
        super()
        this.state = {
            receiveMessenger: '',
            buttonTitle: 'Join',
            userName: 'ThuanYH',
            afterEnter: '',
            message: '',
            messages: []
        }
    }
    // 192.168.1.152:5000 là server chung 



    onCallBack = msg => {
        console.log(msg)
        let items = this.state.messages
        items.push(msg)
        this.setState({
            messages: items
        })
    }
    //   callback đươc thực hiện ờ chat.js và được gửi cho received-message

    render() {
        return (
            <div className="App">
                <FriendList></FriendList>
                <div className='Chat-Container'>
                    <div className='chat-box'>
                        <div className='receive-messenger'>
                            {/* <textarea value = {this.state.receiveMessenger}></textarea> */}
                            {<MessageList messages={this.state.messages}></MessageList>}
                        </div>
                        <div>
                            {
                                <SendMessComp callback={this.onCallBack}></SendMessComp>
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


export default ChatComp