import React, { Component } from 'react';
import $ from 'jquery';
import { browserHistory } from 'react-router'

export default class Signup extends Component {

	constructor(){
		super();
		this.state={
			validUser: false,
			error: ''
		}
	}

	checkValidUser(){
		let user = $('#inputUsername').val() || "invalid"
		if (!user) this.setState({error: "Please use a valid username.", validUser: false})
		$.get('/api/checkValidUser/' + user, (res)=>{
			if (res) this.setState({error: "Username is already in use.", validUser: false})
			else {this.setState({error: "", validUser: true})}
		})
	}

	handleSubmit(e){
		e.preventDefault()
		let user = $('#inputUsername').val()
		let pass = $('#inputPassword').val()

		let errors = []

		if (pass.length < 6) errors.push('Password must be at least 6 characters.')
		if (!this.state.validUser) errors.push('Username is invalid.')
		

		if (errors.length) this.setState({error: errors.join('  ')})
		else this.createUser(user, pass)

	}

	createUser(user, pass){
		$.post('/api/createUser', {user: user, pass: pass}, (res)=>{
			if (res === "success") {
				browserHistory.push('/login')
			} else {
				this.setState({error: "internal server error :("})
			}

		})
	}

	render(){
		return(
			<div className="container">
				<h1>Sign up today and start trading.</h1><br/><br/>

				<h3>Create your unique login</h3><br/><br/>

				<form onSubmit={(e)=>this.handleSubmit(e)}>

					{this.state.error &&
						<div><h5 className="text-warning">{this.state.error}</h5></div>
					}

					<div className="form-group">
						<label className="control-label" for="inputUsername">Username</label>
						<input type="text" className="form-control" id="inputUsername" onBlur={()=>this.checkValidUser()} />
					</div>

					<div className="form-group">
						<label className="control-label" for="inputPassword">Password</label>
						<input type="password" className="form-control" id="inputPassword" />
					</div>

					<button type="submit" className="btn btn-primary">Submit</button>
				</form>

			</div>
			)
	}
}