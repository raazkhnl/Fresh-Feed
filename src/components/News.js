import PropTypes from "prop-types";
import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
	static propTypes = {
		category: PropTypes.string,
	};

	static defaultProps = {
		category: "general",
		pageSize: "18",
		};

	constructor(props) {
		super(props);
		this.state = {
			articles: [],
			loading: true,
			page: 1,
			
		};
		document.title = `Fresh Feed - ${
			this.props.category.charAt(0).toUpperCase() + this.props.category.slice(1)
		}`;
	}
	async updateNews() {
		this.props.setProgress(20);
		const url = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=${this.props.apiKey}&pagesize=${this.props.pageSize}&page=${this.state.page}`;
		let data = fetch(url);
		this.props.setProgress(50);
		let parsedData = await (await data).json();
		this.setState({
			articles: parsedData.articles,
			totalResults: parsedData.totalResults,
			loading: false,
		});
		this.props.setProgress(100);

	}

	async componentDidMount() {
		this.updateNews();
	}z

	prevHandler = async () => {
		this.setState({ page: this.state.page - 1 });
		this.updateNews();
	};

	nextHandler = async () => {
		this.setState({ page: this.state.page + 1 });
		this.updateNews();
	};

	fetchMoreData = async () => {
		this.setState({ page: this.state.page + 1 });
		this.setState({ loading: true });
		const url = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=${this.props.apiKey}&pagesize=${this.props.pageSize}&page=${this.state.page}`;
		let data = fetch(url);
		let parsedData = await (await data).json();
		this.setState({
			articles: this.state.articles.concat(parsedData.articles),
			totalResults: parsedData.totalResults,
			loading: false,
		});
	  };
	  setProgress = (progress) => {
		this.setState({progress: progress})
	  }

	render() {
		return (
			<>
				<h2>
					Fresh Feed - Top{" "}
					{this.props.category.charAt(0).toUpperCase() +
						this.props.category.slice(1)}{" "}
					Headlines
				</h2>
				{/* {this.state.loading && <Spinner />} */}

				
					<InfiniteScroll
						dataLength={this.state.articles.length}
						next={this.fetchMoreData}
						hasMore={this.state.articles.length !== this.state.totalResults}
						loader={this.state.loading && <Spinner />}
					>
						<div className="container my-3">
						<div className="row my-3">
						{this.state.articles.map((element) => {
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
						</div>
						</div>
					</InfiniteScroll>

					{/* <div className="d-flex justify-content-between">
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
					</div> */}
				</>
				
			
		);

	}
}
export default News;
