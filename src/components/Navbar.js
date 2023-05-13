// import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export class Navbar extends Component {
  // static propTypes = {}
  searchHandler = async () => {
		this.props.setProgress(20);
		const url = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=5ed6668292e24f3a8d05038cae087b34&pagesize=${this.props.pageSize}&page=${this.state.page}&q=${this.props.query}`;
		let data = fetch(url);
		this.props.setProgress(50);
		let parsedData = await (await data).json();
		this.setState({
			articles: parsedData.articles,
			totalResults: parsedData.totalResults,
			loading: false,
		});
		this.props.setProgress(100);
	};

  render() {
    return (
      <div><nav className="navbar navbar-expand-lg bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">Fresh Feed</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/business">Business</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/entertainment">Entertainment</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/health">Health</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/science">Science</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/sports">Sports</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/technology">Technology</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/">Link</Link>
            </li>
            <li className="nav-item dropdown">
              <Link className="nav-link dropdown-toggle" to="/" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Dropdown
              </Link>
              <ul className="dropdown-menu">
                <li><Link className="dropdown-item" to="/">Action</Link></li>
                <li><Link className="dropdown-item" to="/">Another action</Link></li>
                <li><hr className="dropdown-divider"/></li>
                <li><Link className="dropdown-item" to="/">Something else here</Link></li>
              </ul>
            </li>
          </ul>
          <form className="d-flex" role="search">
            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
            <button className="btn btn-outline-success" type="submit" onClick={this.searchHandler}>Search</button>
          </form>
        </div>
      </div>
    </nav></div>
    )
  }
}

export default Navbar