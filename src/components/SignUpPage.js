import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {Link} from "react-router-dom";

class SignUp extends Component {
    state = {
        username: '',
        password: ''
    };
    handleSignIn(e) {
        e.preventDefault();
        let username = this.refs.username.value;
        let password = this.refs.password.value;
        this.props.onSignIn(username, password)
    }

    render() {
        return (
            <div className="container">
                <div className="text-lg-center"> Sign Up </div>
                <Form>
                    <Form.Group>
                        <Form.Label>Enter a username</Form.Label>
                        <Form.Control required type="username" id="username" ref="username" placeholder="Username" />
                        <Form.Text className="text-muted">
                            This will also be your name shown on the website.
                        </Form.Text>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Enter new Password</Form.Label>
                        <Form.Control required type="password" id="password" ref="password" placeholder="Password" />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Enter Password Again</Form.Label>
                        <Form.Control required type="password" placeholder="Password" />
                        <Form.Text className="text-muted">
                            This should be the same password you entered above.
                        </Form.Text>
                    </Form.Group>
                    <Link to="/home"><Button inline="true" className="mr-sm-2" variant="primary">Sign Up</Button></Link>
                    <Link to="/login"><Button type="submit" onSubmit={this.handleSignIn.bind(this)} variant="outline-primary">Cancel</Button></Link>
                </Form>

            </div>
        )
    }
}

export default SignUp;