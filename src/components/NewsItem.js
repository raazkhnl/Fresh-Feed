// import PropTypes from 'prop-types'
import React, { Component } from 'react'

export class NewsItem extends Component {
    

  render() {
    let {title, date, author, description, imgUrl, newsUrl} = this.props;
    return (
      <div>
        <div className="card">
  <img src={!imgUrl?"https://cdn.ndtv.com/common/images/ogndtv.png":imgUrl} className="card-img-top" style={{height: "250px"}} alt="..."/>
  <div className="card-body">
    <h5 className="card-title">{title}</h5>
    <p className="card-text">{description}</p>
    <a href={newsUrl} target="blank" className="btn btn-sm btn-primary">Read More</a>
    <p className="card-text"><small className="text-muted">By {!author?"Unknown":author} on {new Date (date).toGMTString()}</small></p>
  </div>
</div>
      </div>
    )
  }
}

export default NewsItem