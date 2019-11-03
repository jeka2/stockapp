import React, { Component } from 'react';
import Login from '../components/Login';

export default class Home extends Component {
    render() {
        return (
            //transaction history
            //ability to look up and purchase
            //
            <>
                <div className="personal-info">
                    <Login />
                </div>
            </>
        )
    }
}
