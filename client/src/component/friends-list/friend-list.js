import React from 'react'
// khai báo react (bắt buột)
import './friend-list.scss'
// khai báo css cho html
import FrListItem from '../friend-list-items/frlist-item';

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
                        <p>Messenger</p>
                    </div>
                    <div className='friend-list-search'>
                        <div className='icon-search'></div>
                        <input type='text' className='search-text' placeholder="Search.."></input>
                    </div>
                    <div className='friend-list'>
                        {/* <FrListItem></FrListItem> */}
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default FriendList