import React, { Component } from 'react';
import Login from '../components/Login';
import Flash from '../components/Flash';
import Overview from '../components/Overview';
import cookie from 'react-cookies';


export default class Home extends Component {
    constructor() {
        super();
        this.state = {
            flashMessage: null,
            flashType: null,
            loggedIn: false,
        }
        this.setFlash = this.setFlash.bind(this);
        this.logIn = this.logIn.bind(this);
    }

    logIn() {
        this.setState({ loggedIn: true });
    }

    setFlash(flashMessage, type) {
        let that = this;
        setTimeout(removeFlash, 2000);
        this.setState({ flashMessage, flashType: type })

        function removeFlash() {
            that.setState({ flashMessage: null, flashType: null });
        }
    }

    componentWillMount() {
        console.log(cookie)
        // if there's a token stored as a cookie, log the user in
        if (cookie.load('token')) {

        }
    }

    render() {
        return (
            <>
                <Flash message={this.state.flashMessage} type={this.state.flashType} />
                {this.state.loggedIn ?
                    <div className="my-overview">
                        <Overview />
                    </div>
                    :
                    <div className="log-in-form">
                        <Login setFlash={this.setFlash} logIn={this.logIn} />
                    </div>
                }
            </>
        )
    }
}
