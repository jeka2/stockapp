import React, { Component } from 'react'

export default class Flash extends Component {
    render() {
        const { type, message } = this.props;
        return (
            <>
                {type ? <div className={`flash-message flash-${type}`}>
                    {message}
                </div> :
                    ""}
            </>
        )
    }
}
