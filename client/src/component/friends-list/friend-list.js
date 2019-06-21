import React from 'react'
// khai báo react (bắt buột)
import './friend-list.scss'
// khai báo css cho html

class FriendList extends React.Component {
    constructor(props) {
        super(props)
        console.log(this.props)
    }
    render(){
        return(
            <React.Fragment>
                <div className="friend-list-container">
                    <div className='friend-list-setting'>
                        {/* icon setting */}
                        <p>Messenger</p>
                    </div>
                    <div className='friend-list-search'></div>
                        <div className='search'>
                            
                            <input type='submit' className='search-text' placeholder="Search.."></input>
                        </div>
                    <div className='friend-list'></div>
                </div>
            </React.Fragment>
        )
    }
}

export default FriendList