import React from 'react'
import './frlist-item.scss'

class FrListItem extends React.Component {
    constructor(props) {
        super(props)
        console.log(this.props)
    }
    render(){
        return(
            <React.Fragment>
                <div className='frlist-item'>

                </div>
            </React.Fragment>
        )
    }
}

export default FrListItem