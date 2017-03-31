import React, { Component } from 'react';
import { Link } from 'react-router';

export default class App extends Component {

  render() {
    return (
      <div>
          {/* NAVBAR */}
        <nav className="navbar navbar-inverse">
          <div className="container-fluid">
            <div className="navbar-header">
              <Link className="navbar-brand" activeClassName="active" to="/">Bookswap!</Link>
            </div>

            <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-2">
              <ul className="nav navbar-nav navbar-right">
                <li><Link to="/newbook"><span className="glyphicon glyphicon-plus" /></Link></li>
                <li><Link to="/settings"><span className="glyphicon glyphicon-cog" /></Link></li>
                <li><Link to="/login" activeClassName="active">Login</Link></li>
              </ul>
            </div>
          </div>
        </nav>

          {this.props.children}
        
      </div>
    );
  }
}
