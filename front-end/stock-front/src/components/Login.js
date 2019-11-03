import React, { Component } from 'react';
import { Form, Col, Row, Button } from 'react-bootstrap';

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        //e.target[0] = email
        //e.target[1] = pass
        e.preventDefault()
        console.log(e.target[1].value)
    }

    render() {
        return (
            <div id="login-form">
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group as={Row} controlId="formPlaintextEmail">
                        <Form.Label column sm="2">
                            Email
                        </Form.Label>
                        <Col sm="12" md="12">
                            <Form.Control className="input email-input" plaintext placeholder="example@example.com" />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="formPlaintextPassword">
                        <Form.Label column sm="2">
                            Password
                        </Form.Label>
                        <Col sm="12" md="12">
                            <Form.Control className="input password-input" type="password" placeholder="Password" />
                        </Col>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </div>
        )
    }
}
