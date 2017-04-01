import React, { Component } from 'react';
import { Link } from 'react-router';
import $ from 'jquery';

export default class App extends Component {

  constructor(){
    super();
    this.state = {authenticated: "loading"}
  }


  addBook(title, thumbnail){
    console.log('adding+' + title)
    console.log('adding+' + thumbnail)
    let newState = this.state.authenticated
    newState.books.push({title: title, thumbnail: thumbnail})
    this.setState({authenticated: newState})

    $.post('/api/addBook', {title: title, thumbnail: thumbnail}, (res)=>{console.log(res)})
  }

  handleLogout(){
    $.get('/api/logout', (res)=>{
      window.location.href = '/login'
    })
  }

  componentDidMount(){
    $.get('/api/amiauthenticated', (user)=>{
      if (user) this.setState({authenticated: user})
      else this.setState({authenticated: false})
    })
  }

  render() {
    return (
      <div>
        {/* NAVBAR UNAUTHENTICATED*/}
        {(this.state.authenticated !== "loading" && !this.state.authenticated) &&
          <nav className="navbar navbar-inverse">
            <div className="container-fluid">
              <div className="navbar-header">
                <Link className="navbar-brand" activeClassName="active" to="/">Bookswap!</Link>
              </div>

              <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-2">
                <ul className="nav navbar-nav navbar-right">
                  <li><Link to="/login" activeClassName="active">Login</Link></li>
                </ul>
              </div>
            </div>
          </nav>
        }

        {/*NAVBAR AUTHENTICATED*/}
        {(this.state.authenticated !== "loading" && this.state.authenticated) &&
          <nav className="navbar navbar-inverse">
            <div className="container-fluid">
              <div className="navbar-header">
                <Link className="navbar-brand" activeClassName="active" to="/">Bookswap!</Link>
              </div>

              <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-2">
                <ul className="nav navbar-nav navbar-right">
                  <li className="dropdown">
                    <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">{this.state.authenticated.username} <span className="caret"></span></a>
                    <ul className="dropdown-menu" role="menu">
                      <li><Link to="/profile">Profile</Link></li>
                      <li><Link to="/books">Library</Link></li>
                      <li className="divider"></li>
                      <li><a href="#" onClick={this.handleLogout}>Logout</a></li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        }

          {(this.props.children && this.state.authenticated !== "loading") &&
            React.cloneElement(this.props.children, 
              {
                user: this.state.authenticated,
                addBook: (title, thumbnail)=>{this.addBook(title, thumbnail)}
              })
          }
        
      </div>
    );
  }
}