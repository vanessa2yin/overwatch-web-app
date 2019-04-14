import React, { Component } from 'react'
import {Link} from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import '../styles/LogInPage_SignUpPage.css';

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
            <div>
                <img src={require('../styles/web_logo.png')} className="logo"/>
                <div className="pageContainer">
                    <div className="title"> LOG IN </div>
                    <Form>
                        <Form.Group>
                            <Form.Label className="label">Username</Form.Label>
                            <Form.Control className="inputBox"
                                          required type="username" id="username" ref="username" placeholder="Enter username" />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label className="label">Password</Form.Label>
                            <Form.Control className="inputBox"
                                          required type="password" id="password" ref="password" placeholder="Password" />
                        </Form.Group>
                        <Link to="/home">
                            <Button className="buttons" variant="light">
                                Log In
                            </Button>
                        </Link>
                        <Link to="/signup">
                            <Button type="submit" className="buttons" variant="light"
                                    onSubmit={this.handleSignIn.bind(this)}>
                                Sign Up
                            </Button>
                        </Link>
                    </Form>
                </div>

            </div>
        )
    }
}

export default LogInPage