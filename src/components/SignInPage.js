import React, { Component } from 'react'
import {Link} from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

class SignInPage extends Component {
    state = {
        username: '',
        password: ''
    };
    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    };
    handleSubmit = (e) => {
        e.preventDefault();
        console.log(this.state);
    };

    render() {
        return (
            <div className="container">
                <Form>
                    <Form.Group controlId="formUsername">
                        <Form.Label>Username</Form.Label>
                        <Form.Control required type="username" id="username" placeholder="Enter username" />
                    </Form.Group>
                    <Form.Group controlId="formPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control required type="password" id="password" placeholder="Password" />
                    </Form.Group>
                    <Link to="/home"><Button inline className="mr-sm-2" variant="primary">Log In</Button></Link>
                    <Link to="/signup"><Button variant="outline-primary">Sign Up</Button></Link>
                </Form>

            </div>
        )
    }
}

export default SignInPage