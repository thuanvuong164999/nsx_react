import React from 'react'
import './detail.scss'

class DetailPage extends React.Component{
    constructor(props){
        super(props)
        console.log(this.props)
        const {match: {params}} = this.props
        console.log(params, params.id)
        //vào console coi
    }
    render(){
        return(
            <React.Fragment>
            <div className ='datail-page-top'>
                Hello
            </div>
            <div>
                Detail Page
            </div>
            </React.Fragment>
        )
    }
}

export default DetailPage