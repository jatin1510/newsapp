import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };

  static defaultProps = {
    country: "in",
    pageSize: 4,
    category: "general",
  };

  capitalizeIthCharacter(s) {
    return s.charAt(0).toUpperCase() + s.slice(1);
  }

  constructor(props) {
    console.log("constructor called");
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      pageSize: this.props.pageSize,
      country: this.props.country,
      category: this.props.category,
      apiKey: process.env.REACT_APP_NEWS_API,
      totalResults: 0,
    };
    document.title = `${this.capitalizeIthCharacter(
      this.props.category
    )} - NewsMonkey`;
  }

  // updateNews = async () => {
  //   const url = `https://newsapi.org/v2/top-headlines?country=${this.state.country}&category=${this.state.category}&apiKey=${this.state.apiKey}&page=${this.state.page}&pagesize=${this.state.pageSize}`;
  //   this.setState({
  //     loading: true,
  //     country: this.props.country,
  //   });
  //   let data = await fetch(url);
  //   let parsedData = await data.json();
  //   this.setState({
  //     articles: parsedData.articles,
  //     totalResults: parsedData.totalResults,
  //     loading: false,
  //   });
  // };
  async componentDidMount() {
    console.log("componentDidMount called");
    this.props.setProgress(0);
    let url = `https://newsapi.org/v2/top-headlines?country=${this.state.country}&category=${this.state.category}&apiKey=${this.state.apiKey}&page=1&pagesize=${this.state.pageSize}`;
    this.setState({
      loading: true,
      country: this.props.country,
    });
    this.props.setProgress(25);
    let data = await fetch(url);
    this.props.setProgress(50);
    let parsedData = await data.json();
    this.props.setProgress(75);
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
    });
    this.props.setProgress(100);
  }

  // handlePrevClick = async () => {
  //   console.log("HandlePrevClick called");
  //   let url = `https://newsapi.org/v2/top-headlines?country=${
  //     this.state.country
  //   }&category=${this.state.category}&apiKey=${this.state.apiKey}&page=${
  //     this.state.page - 1
  //   }&pagesize=${this.state.pageSize}`;
  //   this.setState({
  //     loading: true,
  //   });
  //   let data = await fetch(url);
  //   let parsedData = await data.json();

  //   this.setState({
  //     page: this.state.page - 1,
  //     articles: parsedData.articles,
  //     totalResults: parsedData.totalResults,
  //     loading: false,
  //   });
  //   // this.setState({
  //   //   page: this.state.page - 1,
  //   // });
  //   // this.updateNews();
  // };

  // handleNextClick = async () => {
  //   console.log("HandleNextClick called");
  //   let url = `https://newsapi.org/v2/top-headlines?country=${
  //     this.state.country
  //   }&category=${this.state.category}&apiKey=${this.state.apiKey}&page=${
  //     this.state.page + 1
  //   }&pagesize=${this.state.pageSize}`;
  //   this.setState({
  //     loading: true,
  //   });
  //   let data = await fetch(url);
  //   let parsedData = await data.json();
  //   this.setState({
  //     page: this.state.page + 1,
  //     articles: parsedData.articles,
  //     totalResults: parsedData.totalResults,
  //     loading: false,
  //   });
  //   // this.setState({
  //   //   page: this.state.page + 1,
  //   // });
  //   // this.updateNews();
  // };

  fetchMoreData = async () => {
    console.log("FetchMoreData called");
    const url = `https://newsapi.org/v2/top-headlines?country=${this.state.country}&category=${this.state.category}&apiKey=${this.state.apiKey}&page=${this.state.page + 1}&pagesize=${this.state.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    await this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults,
      page: this.state.page + 1
    });
  };

  render() {
    return (
      <>
        <h1 className="text-center my-4">
          NewsMonkey - Top {this.capitalizeIthCharacter(this.props.category)}{" "}
          Headlines
        </h1>
        {this.state.loading && <Spinner />}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner />}
          endMessage={
            <p style={{ textAlign: 'center' }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
          <div className="container">
            <div className="row my-3">
              {/* {!this.state.loading &&
              this.state.articles && */}
              {this.state.articles.map((element, index) => {
                return (
                  <div className="col-md-3" key={element.url}>
                    <NewsItem
                      title={
                        element.title
                          ? element.title.length > 65
                            ? element.title.slice(0, 65) + "..."
                            : element.title
                          : ""
                      }
                      description={
                        element.description
                          ? element.description.length > 150
                            ? element.description.slice(0, 150) + "..."
                            : element.description
                          : ""
                      }
                      imageUrl={element.urlToImage}
                      newsUrl={element.url}
                      author={element.author}
                      date={element.publishedAt}
                      source={element.source.name}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </InfiniteScroll>
        {/* <div className="container d-flex justify-content-between fixed-bottom my-4">
          <button
            disabled={this.state.page <= 1}
            type="button"
            className="btn btn-dark"
            onClick={this.handlePrevClick}
          >
            &larr; Previous
          </button>
          <span>
            Page{" "}
            <strong>
              {this.state.page}/
              {Math.ceil(this.state.totalResults / this.state.pageSize)}
            </strong>
          </span>
          <button
            disabled={
              this.state.page + 1 >
              Math.ceil(this.state.totalResults / this.state.pageSize)
            }
            type="button"
            className="btn btn-dark"
            onClick={this.handleNextClick}
          >
            Next &rarr;
          </button>
        </div> */}
      </>
    );
  }
}

export default News;
