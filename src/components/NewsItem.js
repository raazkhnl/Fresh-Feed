// import PropTypes from 'prop-types'
import React, { Component } from "react";

export class NewsItem extends Component {
	render() {
		let { title, date, author, description, sourceName, imgUrl, newsUrl } =
			this.props;
		return (
			<div>
				<div className="card">
					<span className="position-absolute top-0  translate-middle badge rounded-pill bg-danger" style={{left: "87%", zIndex:'1'}}>
						{sourceName}
					</span>
					<img
						src={
							!imgUrl ? "https://cdn.ndtv.com/common/images/ogndtv.png" : imgUrl
						}
						className="card-img-top"
						style={{ height: "250px" }}
						alt="..."
					/>
					<div className="card-body">
						<h5 className="card-title">{title}</h5>
						<p className="card-text">{description}</p>
						<a href={newsUrl} target="blank" className="btn btn-sm btn-primary">
							Read More
						</a>
						<p className="card-text">
							<small className="text-muted">
								By {!author ? "Unknown" : author} on{" "}
								{new Date(date).toGMTString()}
							</small>
						</p>
					</div>
				</div>
			</div>
		);
	}
}

export default NewsItem;
