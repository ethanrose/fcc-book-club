import React, { Component } from 'react';
import {Link} from 'react-router';

export default class Home extends Component {
    render() {
        return (
            <div className="container">
            	<Link to="/signup" className="btn btn-success">Sign up!</Link>
                <h3>All Posted Books</h3>
            </div>
        );
    }
}