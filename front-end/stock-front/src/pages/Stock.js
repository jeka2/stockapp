import React, { Component } from 'react'

export default class Stock extends Component {
    constructor(props) {
        super(props);
        this.state = {
            symbol: ""
        }
    }
    componentWillMount() {
        const { symbol } = this.props.match.params;
        console.log(symbol)
    }
    render() {
        return (
            <div>
                hi
            </div>
        )
    }
}
