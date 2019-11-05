import React, { Component } from 'react';
import { Form, Col, Row, Button } from 'react-bootstrap';
import axios from 'axios';

let qs = require('qs');

export default class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            register: false,
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.switchType = this.switchType.bind(this);
    }

    switchType() {
        this.setState({ register: !this.state.register })
    }

    handleSubmit(e) {
        //this.props.setType()
        const email = e.target[0].value;
        const pass = e.target[1].value;
        e.preventDefault()
        if (this.state.register) {
            const passConfirm = e.target[2].value;
            // Warn user of unmatched passwords
            if (pass !== passConfirm) {
                this.props.setFlash('The passwords did not match', 'danger');
                return;
            }
            axios.post(`https://localhost:44338/api/users`,
                qs.stringify({ email, pass })
            ).then(res => {
                console.log(res)
            }).catch(err => {
                console.log(err)
            })
        }
        else {
            //get the user info
        }
    }

    render() {
        return (
            <div id="login-form">
                <Form onSubmit={this.handleSubmit}>
                    <header className="form-header">{this.state.register ? "Register" : "Log In"}</header>
                    <Form.Group as={Row} controlId="formPlaintextEmail">
                        <Form.Label column sm="2">
                            Email
                        </Form.Label>
                        <Col sm="12">
                            <Form.Control className="input email-input" type="email" placeholder="example@example.com" />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="formPlaintextPassword">
                        <Form.Label column sm="2">
                            Password
                        </Form.Label>
                        <Col sm="12">
                            <Form.Control className="input password-input" type="password" placeholder="Password" />
                        </Col>
                    </Form.Group>
                    {this.state.register ? (
                        <Form.Group as={Row} controlId="formPlaintextPassword" className="register-field">
                            <Form.Label column sm="2">
                                Confirm
                            </Form.Label>
                            <Col sm="12">
                                <Form.Control className="input password-confirm-input" type="password" placeholder="Password" />
                            </Col>
                        </Form.Group>
                    ) : ""}
                    {this.state.register ? (
                        <div className="sign-up-switch">
                            Already have an accout? <span className="switch-type" onClick={this.switchType}>Sign In</span>
                        </div>
                    ) :
                        <div className="sign-up-switch">
                            Need An Account? <span className="switch-type" onClick={this.switchType}>Register</span>
                        </div>
                    }
                    <Button variant="primary" type="submit" className="session-enter-button">
                        Submit
                    </Button>
                </Form>
            </div>
        )
    }
}
