import { Navbar, Button, Form, Nav, FormControl, NavDropdown } from 'react-bootstrap';
import React, { Component } from 'react';

export default class Navb extends Component {
    constructor(props) {
        super(props);
        this.fieldRef = React.createRef();
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.getSearchText = this.getSearchText.bind(this);

        this.state = {
            symbols: []
        }
    }

    getSearchText(ref) {
        let that = this
        this.searchTimeout = setTimeout(function () {
            fetch(`http://localhost:5000/?name=${ref.current.value}`).then(resp => resp.json()).then(symbols => {
                that.setState({ symbols })
            })
        }, 200)
    }

    handleKeyPress(e) {
        if (this.searchTimeout) {
            clearTimeout(this.searchTimeout)
        }
        this.getSearchText(this.fieldRef);
    }

    render() {
        return (
            <>
                <Navbar bg="primary" variant="dark">
                    <Navbar.Brand href="#home">Navbar</Navbar.Brand>
                    <Nav className="mr-auto">
                        <Nav.Link href="#home">Home</Nav.Link>
                        <Nav.Link href="#features">Features</Nav.Link>
                        <Nav.Link href="#pricing">Pricing</Nav.Link>
                    </Nav>
                    <Form inline>
                        <FormControl type="text" placeholder="Search" className="mr-sm-2" ref={this.fieldRef} onKeyDown={this.handleKeyPress} />
                        <Button variant="outline-light">Search</Button>
                    </Form>
                </Navbar>
                {this.state.symbols.map((el, i) => {
                    return el
                })}
            </>
        )
    }
}
