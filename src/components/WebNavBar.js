import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import { Link, withRouter } from 'react-router-dom';

class WebNavBar extends Component {
    render() {
        return (
            <Navbar bg="light" expand="lg">
                <Navbar.Brand href="#home">Overwatch Hero</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="#home">Heroes</Nav.Link>
                    </Nav>
                    <Form inline>
                        <FormControl type="text" placeholder="Search Hero" className="mr-sm-2" />
                        <Button variant="primary" className="mr-sm-2">Search</Button>
                    </Form>
                    <Link to="/signin"><Button variant="outline-primary">Log Out</Button></Link>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

export default withRouter(WebNavBar);