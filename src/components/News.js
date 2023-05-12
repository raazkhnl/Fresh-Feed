import PropTypes from "prop-types";
import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";

export class News extends Component {
	static propTypes = {
		category: PropTypes.string,
	};

	static defaultProps = {
		category: "general",
	};

	constructor() {
		super();
		this.state = {
			articles: [],
			loading: false,
			page: 1,
		};
	}
	async updateNews(pageNo){
		const url = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=5ed6668292e24f3a8d05038cae087b34&pagesize=${this.props.pageSize}&page=${this.state.page}`;
		this.setState({ loading: true });
		let data = fetch(url);
		let parsedData = await (await data).json();
		this.setState({
			articles: parsedData.articles,
			totalResults: parsedData.totalResults,
			loading: false
		});
			
	}

	async componentDidMount() {
		this.updateNews();

	}

	prevHandler = async () => {
		this.setState({page: this.state.page -1});
		this.updateNews();
	};

	nextHandler = async () => {
		this.setState({page: this.state.page + 1});
		this.updateNews();
	};

	render() {
		return (
			<div className="container my-3">
				<h2>Fresh Feed - Top Headlines</h2>
				{this.state.loading && <Spinner />}
				<div className="row my-3">
					{!this.state.loading &&
						this.state.articles.map((element) => {
							return (
								<div className="col-md-4 my-3" key={element.url}>
									<NewsItem
										title={element.title}
										description={element.description}
										imgUrl={element.urlToImage}
										newsUrl={element.url}
										  author={element.author}
										  date={element.publishedAt}
										  sourceName={element.source.name}
								/>
								</div>
							);
						})}

					<div className="d-flex justify-content-between">
						<button
							disabled={this.state.page <= 1}
							type="button"
							className="btn btn-info"
							onClick={this.prevHandler}
						>
							&larr; Previous
						</button>
						<button
							disabled={
								this.state.page + 1 > Math.ceil(this.state.totalResults / 18)
							}
							type="button"
							className="btn btn-info"
							onClick={this.nextHandler}
						>
							Next &rarr;
						</button>
					</div>
				</div>
			</div>
		);
	}
}
export default News;
