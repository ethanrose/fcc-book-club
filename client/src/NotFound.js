import React, { Component } from 'react';

export default class NotFound extends Component {
    render() {
        return (
            <div className="container">
                <h1 className="text-primary">404 :(</h1><br/>
                <h3 className="text-danger">This is not the page you are looking for...</h3>
            </div>
        );
    }
}