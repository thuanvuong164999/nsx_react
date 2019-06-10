import React from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form';
const axios = require('axios')

class LoginPage extends React.Component{
    constructor() {
        super()
        this.state = {
            data: ''                 
        }
    }
    componentDidMount() {
        let self  = this
        axios.get('/api/hello')
        .then(function (response) {
            // handle success
            console.log(response);
            let els = response.data.members.map((key, index) => {
                return(
                    <li key={index}>{key.name}-{key.class}</li>
                )
            })
            
            console.log(els)
            self.setState({
                data: els
                //gán els vao response
            })
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .finally(function () {
            // always executed
        });
    }
    render(){
        return(
            <React.Fragment>
            <div className ='login-page-top'>
                {this.state.data}
            </div>
            <Form.Group>
                <Button type='submit' href='/home'>Go HomePage</Button>
            </Form.Group>
            </React.Fragment>
        )
    }
}

export default LoginPage