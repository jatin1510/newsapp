import React, { Component } from "react";

export class NewsItem extends Component {
  render() {
    let { title, description, imageUrl, newsUrl, author, date, source } = this.props;
    return (
      <>
        <div className="my-3">
          <div className="card" style={{ minHeight: "28rem" }}>
            <img src={imageUrl?imageUrl:"https://as1.ftcdn.net/v2/jpg/02/48/42/64/1000_F_248426448_NVKLywWqArG2ADUxDq6QprtIzsF82dMF.jpg"} className="card-img-top" alt="..." height='180px'/>
            <div className="card-body">
              <h5 className="card-title">{title}<span className="position-absolute top-0 start-50 translate-middle badge rounded-pill bg-danger">{source}</span></h5>
              <p className="card-text" style={{textAlign: 'justify', height: "7rem"}}>{description}</p>
              <p className="card-text"><small className="text-muted">By <strong>{author? author : "Unknown"}</strong> on <strong>{new Date(date).toGMTString()}</strong> </small></p>
              <a rel="noreferrer" href={newsUrl} className="btn btn-sm btn-dark" target="_blank">
                Read More
              </a>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default NewsItem;
