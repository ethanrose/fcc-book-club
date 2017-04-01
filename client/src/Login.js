import React, { Component } from 'react';

export default class Login extends Component {

	constructor(){
		super();
		this.state = {error: ''}
	}

	handleSubmit(e){
		//e.preventDefault();
	}

	render(){
		return(
			<div className="container">
				<h1>Login.</h1><br/><br/>

				<h3>You're almost on your journey to begin trading</h3><br/><br/>

				<form onSubmit={(e)=>this.handleSubmit(e)} method="post" action="/api/login">

					{this.state.error &&
						<div><h5 className="text-warning">{this.state.error}</h5></div>
					}

					<div className="form-group">
						<label className="control-label" for="inputUsername">Username</label>
						<input type="text" className="form-control" id="inputUsername" name="username" />
					</div>

					<div className="form-group">
						<label className="control-label" for="inputPassword">Password</label>
						<input type="password" className="form-control" id="inputPassword" name="password" />
					</div>

					<button type="submit" className="btn btn-primary">Submit</button>
				</form>

			</div>
			)
	}
}