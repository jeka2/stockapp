import React, { Component } from 'react';
import Login from '../components/Login';
import Flash from '../components/Flash';

export default class Home extends Component {
    constructor() {
        super();
        this.state = {
            flashMessage: null,
            flashType: null,
            loggedIn: false
        }
        this.setFlash = this.setFlash.bind(this);
    }

    setFlash(flashMessage, type) {
        let that = this;
        setTimeout(removeFlash, 2000);
        this.setState({ flashMessage, flashType: type })

        function removeFlash() {
            that.setState({ flashMessage: null, flashType: null });
        }
    }

    render() {
        return (
            <>
                <Flash message={this.state.flashMessage} type={this.state.flashType} />
                <div className="personal-info">
                    <Login setFlash={this.setFlash} />
                </div>
            </>
        )
    }
}
