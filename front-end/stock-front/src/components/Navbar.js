import { Navbar, Button, Form, Nav, FormControl, NavDropdown } from 'react-bootstrap';
import React, { Component } from 'react';
import { Typeahead } from 'react-bootstrap-typeahead';
import { Link, Redirect } from 'react-router-dom';

export default class Navb extends Component {
    constructor(props) {
        super(props);
        this.fieldRef = React.createRef();
        this.redirectToStockInfo = this.redirectToStockInfo.bind(this);

        this.state = {
            symbols: [],
            stockSelected: null
        }
    }

    redirectToStockInfo(val) {
        const stockSelected = val[0];
        this.setState({ stockSelected })
    }

    componentDidMount() {
        //fetch(`http://localhost:5000/`).then(resp => resp.json()).then(symbols => {
        //    this.setState({ symbols })
        //})
    }

    render() {
        if (this.state.stockSelected) {
            return <Redirect to={`/stock/${this.state.stockSelected}`} />
        }
        return (
            <>
                <Navbar bg="primary" variant="dark">
                    <Navbar.Brand href="#home">Navbar</Navbar.Brand>
                    <Nav className="mr-auto">
                        <Nav.Link href="#home">Home</Nav.Link>
                        <Nav.Link href="#features">Features</Nav.Link>
                        <Nav.Link href="#pricing">Pricing</Nav.Link>
                    </Nav>
                    <Typeahead id="stock-search" labelKey="name" onChange={this.redirectToStockInfo} options={this.state.symbols} placeholder="Search Stocks" />
                </Navbar>
            </>
        )
    }
}
