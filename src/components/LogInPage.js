import React, { Component } from 'react'
import {Link} from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

class LogInPage extends Component {
    state = {
        username: '',
        password: ''
    };
    handleSignIn(e) {
        e.preventDefault();
        let username = this.refs.username.value;
        let password = this.refs.password.value;
        console.log(username, password);
    }

    render() {
        return (
            <div className="container">
                <div className="text-lg-center"> Log In </div>
                <Form>
                    <Form.Group>
                        <Form.Label>Username</Form.Label>
                        <Form.Control required type="username" id="username" ref="username" placeholder="Enter username" />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <Form.Control required type="password" id="password" ref="password" placeholder="Password" />
                    </Form.Group>
                    <Link to="/home"><Button inline="true" className="mr-sm-2" variant="primary">Log In</Button></Link>
                    <Link to="/signup"><Button type="submit" onSubmit={this.handleSignIn.bind(this)} variant="outline-primary">Sign Up</Button></Link>
                </Form>

            </div>
        )
    }
}

export default LogInPage