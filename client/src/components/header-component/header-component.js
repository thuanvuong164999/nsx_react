import React from 'react';
import './header-component.scss'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import FormControl from 'react-bootstrap/FormControl'

class HeaderComp extends React.Component{
    render(){
                return(
                    <div>
                        <Navbar bg="dark" variant="dark">
                            <Navbar.Brand href="/">Logo</Navbar.Brand>
                            <Nav className="mr-auto">
                            <Nav.Link href="/">Home</Nav.Link>
                            <Nav.Link href="/products">Products</Nav.Link>
                            <Nav.Link href="/farms">Farms</Nav.Link>
                            </Nav>
                            <Form inline>
                            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                            <Button variant="outline-info">Search</Button>
                            </Form>
                        </Navbar>
                    </div>    
                )
            }
}

export default HeaderComp