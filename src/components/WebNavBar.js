import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import { Link, withRouter } from 'react-router-dom';

class WebNavBar extends Component {
    /**
     * TO BE CONTINUED
     * handle search event when the search button is clicked
     * @param e
     * @param heroName
     */
    handleSearch(e, heroName) {
        e.preventDefault();
        console.log("Go to page of " + heroName);
    }

    render() {
        return (
            <Navbar bg="light" expand="lg">
                <Navbar.Brand href="#home">Overwatch Hero</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="#heroes">Heroes</Nav.Link>
                        <Nav.Link href="#stats">Stats</Nav.Link>
                    </Nav>
                    <Form inline>
                        <FormControl type="text" placeholder="Search Hero" ref="heroName" className="mr-sm-2" />
                        <Button variant="primary" className="mr-sm-2"
                                onClick={e=>{ this.handleSearch(e, this.refs.heroName.value); }}>
                            Search
                        </Button>
                    </Form>
                    <Link to="/login"><Button variant="outline-primary">Log Out</Button></Link>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

export default withRouter(WebNavBar);