import React, { Component } from 'react';
import Flash from '../components/Flash';
import Overview from '../components/Overview';
import cookie from 'react-cookies';


export default class Home extends Component {
    constructor() {
        super();
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

                    </div>
                }
            </>
        )
    }
}
