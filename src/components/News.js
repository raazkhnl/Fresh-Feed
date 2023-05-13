import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
	const [articles, setArticles] = useState([]);
	const [loading, setLoading] = useState(true);
	const [page, setPage] = useState(1);
	const [totalResult, setTotalResult] = useState(0);
	document.title = `Fresh Feed - ${
		props.category.charAt(0).toUpperCase() + props.category.slice(1)
	}`;

	const updateNews = async () => {
		props.setProgress(20);
		const url = `https://newsapi.org/v2/top-headlines?country=in&category=${props.category}&apiKey=${props.apiKey}&pagesize=${props.pageSize}&page=${page}`;
		let data = await fetch(url);
		props.setProgress(50);
		let parsedData = await (await data).json();
		setArticles(parsedData.articles);
		setTotalResult(parsedData.totalResults);
		setLoading(false);
		props.setProgress(100);
	};

	useEffect(() => {
		updateNews();
	}, []);

	const fetchMoreData = async () => {
		setLoading(true);
		const url = `https://newsapi.org/v2/top-headlines?country=in&category=${
			props.category
		}&apiKey=${props.apiKey}&pagesize=${props.pageSize}&page=${page + 1}`;
		setPage(page + 1);
		let data = fetch(url);
		let parsedData = await (await data).json();
		setArticles(articles.concat(parsedData.articles));
		setTotalResult(parsedData.totalResults);
		setLoading(false);
	};

	return (
		<>
			<h2>
				Fresh Feed - Top{" "}
				{props.category.charAt(0).toUpperCase() + props.category.slice(1)}{" "}
				Headlines
			</h2>

			<InfiniteScroll
				dataLength={articles.length}
				next={fetchMoreData}
				hasMore={articles.length !== totalResult}
				loader={loading && <Spinner />}>
				<div className="container my-3">
					<div className="row my-3">
						{articles.map((element) => {
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
		</>
	);
};

News.propTypes = {
	category: PropTypes.string,
};

News.defaultProps = {
	category: "general",
	pageSize: "18",
};
export default News;
