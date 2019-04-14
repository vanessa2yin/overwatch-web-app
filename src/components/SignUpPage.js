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
            <div>
                <img src={require('../styles/web_logo.png')} className="logo"/>
                <div className="pageContainer">
                    <div className="title"> SIGN UP </div>
                    <Form>
                        <Form.Group>
                            <Form.Label className="label">Enter a username</Form.Label>
                            <Form.Control className="inputBox"
                                          required type="username" id="username" ref="username" placeholder="Username" />
                            <Form.Text className="text-muted">
                                This will also be your name shown on the website.
                            </Form.Text>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label className="label">Enter new Password</Form.Label>
                            <Form.Control className="inputBox"
                                          required type="password" id="password" ref="password" placeholder="Password" />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label className="darkLabel">Enter new Password Again</Form.Label>
                            <Form.Control className="inputBox"
                                          required type="password" placeholder="Password" />
                            <Form.Text className="text-muted">
                                This should be the same password you entered above.
                            </Form.Text>
                        </Form.Group>
                        <Link to="/home">
                            <Button className="buttons" variant="primary">
                                Sign Up
                            </Button>
                        </Link>
                        <Link to="/login">
                            <Button className="buttons" type="submit" variant="outline-primary"
                                    onSubmit={this.handleSignIn.bind(this)} >
                                Cancel
                            </Button>
                        </Link>
                    </Form>
                </div>
            </div>
        )
    }
}

export default SignUp;