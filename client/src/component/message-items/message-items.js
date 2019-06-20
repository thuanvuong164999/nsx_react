import React from 'react'
import './message-items.scss'

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
                            <div className='avatar-text'>{this.props.value.avatar}</div>
                        </div>
                    </div>
                    <div className={'message-list-content ' + this.props.value.fr}> 
                        <div className='content'>
                            <div dangerouslySetInnerHTML={{__html:this.props.value.message}}></div>
                            {/* công dụng: xử lý ký hiệu icon từ code sang icon */}
                            {/* {this.props.value.message}  code cũ*/}
                        </div>
                        <div className='created'>
                            {this.props.value.createAt}
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default MessageItem