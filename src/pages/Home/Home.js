import React from  'react'
import './Home.css'

class HomePage extends React.Component {
    // tao danh sach data
    constructor(){
        super() 
        // cau lenh bat buot trong constructor
        this.state = {
            data: [
                {
                    name:'Thuan'
                },
                {
                    name:'Son'
                },
                {
                    name:'Mai'
                },
                {
                    name:'An'
                }
            ]
        }
        console.log(this.state.data)
        // show list tren console
    }
    // show data trong HTML
    render(){
        return(
            <React.Fragment>
            <div className="page-home">
                <ul>
                    {
                        this.state.data.map((item, index) => {
                            return(
                            <li>
                                <span className="item-title">Name:</span>
                                <span className="item-name">{item.name}</span>
                            </li>
                            )
                        })
                    }
                </ul>
            </div>
            </React.Fragment>
            // tag co the chua nhieu div trong React
        )
    }
}

export default HomePage