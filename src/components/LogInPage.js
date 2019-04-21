import React, { Component } from 'react'
import { Link, withRouter } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import '../styles/LogInPage_SignUpPage.css';
import fire from '../config/Fire';

class LogInPage extends Component {
    constructor(props) {
        super(props);
        this.login = this.login.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            email: '',
            password: ''
        }
    }

    login(e) {
        e.preventDefault();
        fire.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then((u) => {
            this.props.history.push('/');
        }).catch((error) => {
            alert(error);
        });
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
                    <div className="title"> LOG IN </div>
                    <Form>
                        <Form.Group>
                            <Form.Label className="label">Email address</Form.Label>
                            <Form.Control className="inputBox" value={this.state.email} onChange={this.handleChange}
                                          required type="email" name="email" placeholder="Enter username" />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label className="label">Password</Form.Label>
                            <Form.Control className="inputBox" value={this.state.password} onChange={this.handleChange}
                                          required type="password" name="password" placeholder="Password" />
                        </Form.Group>
                        <Button type="submit" className="buttons" variant="light" onClick={this.login}>
                            Log In
                        </Button>
                        <Link to="/signup">
                            <Button type="submit" className="buttons" variant="light">
                                <i className="fas fa-sign-in-alt"/>
                                {' '}Sign Up
                            </Button>
                        </Link>
                    </Form>
                </div>

            </div>
        )
    }
}

export default withRouter(LogInPage)