import React from 'react'
import './message-items.scss'
import Avatar from 'react-avatar'

class MessageItem extends React.Component {
    constructor(props) {
        super(props)
        console.log(this.props)
    }
    render(){
        return(
            <React.Fragment>
                <div className='message-item'>
                    <div className={'message-item-avatar ' + this.props.value.fr}>
                    {/* sau message-item-avatar phải có dấu cách để phân biệt fr */}
                        <div className='avatar-img'>
                            <Avatar name={this.props.value.user} size='50px' round='50%' maxInitials={2} />
                        </div>
                    </div>
                    <div className={'message-list-content ' + this.props.value.fr}> 
                        <div className='content'>
                            <div dangerouslySetInnerHTML={{__html:this.props.value.message}}></div>
                            {/* công dụng: xử lý ký hiệu icon từ code sang icon */}
                            {/* {this.props.value.message}  code cũ*/}
                        </div>
                        <div className='created'>
                            <div className='time'>{this.props.value.createAt}</div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default MessageItem