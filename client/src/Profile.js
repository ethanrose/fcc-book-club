import React, { Component } from 'react';
import $ from 'jquery';

export default class Profile extends Component {

	handleSubmitInfo(e){
		e.preventDefault();

		$('#profileLoader').text('Updating...')
		let data = {
			name: document.getElementById('inputName').value,
			city: document.getElementById('inputCity').value,
			state: document.getElementById('inputState').value
		}

		$.ajax({
		    url: '/api/updateProfile',
		    type: 'PUT',
		    dataType: "json",
		    data: data,
		    success: (res)=>{
		    	$('#profileLoader').text('Successfully Updated!')
		    }
		});
	}

	render(){
		return(
			<div className="container">

				<h1>{this.props.user.username}'s profile.</h1><br/><br/>



				<h3>Name and Location info.</h3><br/>

				<form onSubmit={(e)=>this.handleSubmitInfo(e)}>
					<div className="form-group">
						<label className="control-label" for="inputName">Full Name</label>
						<input type="text" className="form-control" id="inputName" defaultValue={this.props.user.name} />
					</div>
					<div className="form-group">
						<label className="control-label" for="inputCity">City</label>
						<input type="text" className="form-control" id="inputCity" defaultValue={this.props.user.city}/>
					</div>
					<div className="form-group">
						<label className="control-label" for="inputState">State/Province/Region</label>
						<input type="text" className="form-control" id="inputState" defaultValue={this.props.user.state}/>
					</div>

					<button type="submit" className="btn btn-info">Update</button> <span className="text-info" id="profileLoader" />
				</form>

			</div>
			)
	}
}