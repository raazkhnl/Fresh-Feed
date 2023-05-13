import React, { Component } from "react";

const NewsItem =(props)=> {
		let { title, date, author, description, sourceName, imgUrl, newsUrl } =
			props;
		return (
			<div>
				<div className="card">
					<div className="position-absolute " style={{display: 'flex', justifyContent: 'flex-end', right: '0'}}>
						<span className="badge rounded-pill bg-danger" >{sourceName}</span>
					</div>
					<img
						src={!imgUrl ? "https://cdn.ndtv.com/common/images/ogndtv.png" : imgUrl}
						className="card-img-top"
						style={{ height: "250px" }}
						alt="..."/>
					<div className="card-body">
						<h5 className="card-title">{title}</h5>
						<p className="card-text">{description}</p>
						<a href={newsUrl} target="blank" className="btn btn-sm btn-primary">Read More</a>
						<p className="card-text">
							<small className="text-muted">By {!author ? "Unknown" : author} on {" "}{new Date(date).toGMTString()}</small>
						</p>
					</div>
				</div>
			</div>
		);
	}
export default NewsItem;
