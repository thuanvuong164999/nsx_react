import React from  'react'
import './Home.scss'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import {Link} from 'react-router-dom'
//khai bao <link>

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
                                <Link to={'/product/' + item.name}>
                                <Card className="home-profile" style={{ width: '18rem' }}>
                                    <Card.Img variant="top" src="https://kenh14cdn.com/2017/15756960-5580210-386035-4-0-1502899443-1502899445-650-1-1502899445-650-5da1b346ea-1504039123-1504104802422.jpg" />
                                    <Card.Body>
                                        <Card.Title>Name:</Card.Title>
                                        <Card.Text>{item.name}</Card.Text>
                                        <Button variant="primary">View Profile</Button>
                                    </Card.Body>
                                </Card>
                                </Link>
                            // <li>
                            //     <span className="item-title">Name:</span>
                            //     <span className="item-name">{item.name}</span>
                            // </li>
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