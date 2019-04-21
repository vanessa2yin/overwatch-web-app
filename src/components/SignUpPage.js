import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {Link} from "react-router-dom";
import fire from '../config/Fire';
import { withRouter } from 'react-router-dom';

class SignUpPage extends Component {
    constructor(props) {
        super(props);
        this.signUp = this.signUp.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            email: '',
            password: '',
            confirmPassword: ''
        }
    }

    signUp(e) {
        e.preventDefault();
        if (this.state.password !== this.state.confirmPassword) {
            alert("Passwords don't match. ");
        } else {
            fire.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then((u) => {
                this.props.history.push('/');
            }).catch((error) => {
                alert(error);
            });
        }
    }

    /**
     * handle change for input box in the forms
     * @param e
     */
    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    render() {
        return (
            <div>
                <img src={require('../styles/web_logo.png')} className="logo" alt="logo"/>
                <div className="pageContainer">
                    <div className="title"> SIGN UP </div>
                    <Form>
                        <Form.Group>
                            <Form.Label className="label">Enter your email address</Form.Label>
                            <Form.Control className="inputBox" value={this.state.email} onChange={this.handleChange}
                                          required type="email" name="email" placeholder="Username" />
                            <Form.Text className="text-muted">
                                This will also be your username shown on the website.
                            </Form.Text>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label className="label">Enter new Password</Form.Label>
                            <Form.Control className="inputBox" value={this.state.password} onChange={this.handleChange}
                                          required type="password" name="password" placeholder="Password" />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label className="darkLabel">Enter new Password Again</Form.Label>
                            <Form.Control className="inputBox" value={this.state.confirmPassword} onChange={this.handleChange}
                                          required type="password" name="confirmPassword" placeholder="Password" />
                            <Form.Text className="text-muted">
                                This should be the same password you entered above.
                            </Form.Text>
                        </Form.Group>
                        <Button className="buttons" variant="primary" onClick={this.signUp}>
                            Sign Up
                        </Button>
                        <Link to="/login">
                            <Button className="buttons" type="submit" variant="outline-primary">
                                Cancel
                            </Button>
                        </Link>
                    </Form>
                </div>
            </div>
        )
    }
}

export default withRouter(SignUpPage);