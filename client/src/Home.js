import React, { Component } from 'react';
import $ from 'jquery';
import { Link } from 'react-router';

export default class Home extends Component {
	constructor(){
		super();
		this.state = {};
	}

	initiateTrade(owner, title, i){
		this.setState({selectedTradeIndex: i});
		/*
		let newList = this.state.masterList
		newList[i].trader = this.props.user.username
		this.setState({masterList: newList})
		console.log(newList)
		*/
	}

	submitTradeRequest(tradeBook, tradeOwner, tradeFor, i) {
		let data = {
			tradeBook: tradeBook,
			tradeOwner: tradeOwner,
			tradeFor: tradeFor,
			requestedBy: this.props.user.username
		}

		$.ajax({
		    url: '/api/submitTradeRequest',
		    type: 'PUT',
		    dataType: "json",
		    data: data,
		    success: (res)=>{console.log(res)}
		});
		this.setState({selectedTradeIndex: -1, tradeSuccess: true});
	}

	acceptTrade(owner, title, i){

		$('#traderequest'+i).fadeOut();

		let data = {
			owner: owner,
			title: title
		}

		$.ajax({
		    url: '/api/acceptTrade',
		    type: 'PUT',
		    dataType: "json",
		    data: data,
		    success: (res)=>{console.log(res)}
		});
	}

	componentDidMount(){
		$.get('/api/getMasterList', (res)=>{
			this.setState({masterList: res})
		})
	}

    render() {
        return (
            <div className="container" style={{textAlign: "center"}}>

            	<br/><br/>
                <h3>Welcome to the FCC Book Trading Club.</h3><br/>

                {!this.props.user.username &&
                	<div>
            			<Link to="/signup" className="btn btn-success">Sign up!</Link>
            			<h5>or</h5> 
            			<Link to="/login" className="btn btn-info">Login</Link>
            		</div>
            	}

            	{this.state.masterList && <h3>Trade requests from others:</h3>}
            	{(this.state.masterList && this.props.user) &&
					this.state.masterList.map((book, i)=>{
						if (book.owner == this.props.user.username && book.trade.length){
							return (
								<p className="text-info" key={i} id={"traderequest"+i}>
									<b>{book.trade[0]}</b> is requesting to trade <i>"{book.trade[1]}"</i> for your <i>"{book.title}"</i>...
									<a href="#" 
										className="btn btn-primary btn-xs" 
										onClick={()=>this.acceptTrade(book.owner, book.title, i)}>
										Accept?
									</a>
								</p>
								)
						}
					})
				}

				<br/><br/>
				{this.state.masterList && <h3>All Books</h3>}
                {this.state.tradeSuccess && <h5 className="text-success">Trade request was successful. Wait for the other party to confirm.</h5>}
                {this.state.masterList &&
					this.state.masterList.map((book, i)=>{
						return(
							<div className="book-card" style={{cursor: "default"}} key={i}>
								<img className="img-responsive" src={book.thumbnail} alt="book cover"></img>

								{this.props.user && 
									<div className="add-book-icon" style={{cursor: "pointer"}} onClick={()=>this.initiateTrade(book.owner, book.title, i)}>
											<span className="glyphicon glyphicon-retweet" />
									</div>
								}

								<h5 style={{fontSize: "12px", textAlign: "center"}}>
									{book.title.length < 50 ? book.title : book.title.slice(0, 50) + "..."}
								</h5>

								{(this.props.user && this.state.selectedTradeIndex === i) &&

									<div id={"book-dropdown-"+i}>
										<div className="book-dropdown-list">
											<div className="book-dropdown-list-title">Trade for</div>

											{this.props.user.books.map((bookTrading, i)=>{
												return(
													<div key={i} className="book-dropdown-list-item" onClick={()=>this.submitTradeRequest(book.title, book.owner, bookTrading.title)}>
														{bookTrading.title}
													</div>)
											})}

										</div>
									</div>
								}

							</div>
							)
					})
            	}


            </div>
        );
    }
}