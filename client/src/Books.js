import React, { Component } from 'react';
import $ from 'jquery';

export default class Books extends Component {

	constructor(){
		super();
		this.state = {}
	}

	handleSearchBook(e){
		e.preventDefault();
		let q = encodeURIComponent(document.getElementById('inputTitle').value)
		console.log(q)
    	$.get(`https://www.googleapis.com/books/v1/volumes?q=${q}&key=AIzaSyBm4NnZ_0973bI9ziQTTbP-dtuJi-VGqiI`, (res)=>{
    		console.log(res)
    		this.setState({searchResults: res})
    	})
	}

	render(){
		return (
			<div className="container">

				<div className="row">

						<div className="col-md-6">
						<h3>Add a book.</h3><br/>

						<form onSubmit={(e)=>this.handleSearchBook(e)}>
							<div className="form-group">
								<label className="control-label" for="inputTitle">Book Title</label>
								<input type="text" className="form-control" id="inputTitle" />
							</div>
							<button type="submit" className="btn btn-primary">Search</button>
						</form>

						{this.state.searchResults &&
							this.state.searchResults.items.map((book, i)=>{
								return (
									<div className="book-card" key={i}>

									{book.volumeInfo.imageLinks ?
										<div onClick={(title, thumbnail)=>this.props.addBook(book.volumeInfo.title, book.volumeInfo.imageLinks.thumbnail)}>
											<img className="img-responsive" src={book.volumeInfo.imageLinks.thumbnail} alt="book cover"></img> 
											<div className="add-book-icon">ADD</div>
											<h5 style={{fontSize: "12px", textAlign: "center"}}>
													{book.volumeInfo.title.length < 50 ? book.volumeInfo.title : book.volumeInfo.title.slice(0, 50) + "..."}
											</h5>
										</div>
									:
										<div onClick={(title, thumbnail)=>this.props.addBook(book.volumeInfo.title, '')}>
										<br/><br/>

											<div className="add-book-icon">ADD</div>
											<h5 style={{fontSize: "14px", textAlign: "center"}}>
													{book.volumeInfo.title.length < 75 ? book.volumeInfo.title : book.volumeInfo.title.slice(0, 75) + "..."}
											</h5>

										<br/><br/>
										</div>
									}

									</div>
								)
							})
						}
					</div>


					<div className="col-md-6">

						<h3>My Library.</h3><br/>
						{this.props.user && 
							this.props.user.books.map((book, i)=>{
								return(
									<div className="book-card" key={i}>
										<img className="img-responsive" src={book.thumbnail} alt="book cover"></img>
										<h5 style={{fontSize: "12px", textAlign: "center"}}>
											{book.title.length < 50 ? book.title : book.title.slice(0, 50) + "..."}
										</h5>
									</div>
									)
							})
						}

					</div>


				</div>

			</div>
			)
	}
}