import React, { Component } from "react";

import axios from "axios";

import SearchBar from "../components/SearchBar";
import Video from "../components/Video";
import "../style/style.css";

import VideoDetail from "./VideoDetail";
import VideoList from "./VideoList";
import Header from "../components/Header";


const API_KEY = "api_key=59ea784f19103418c3f715a2a1c54047";
const API_END_POINT = "https://api.themoviedb.org/3/";
const POPULAR_MOVIES_URL =
  "discover/movie?language=fr&sort_by=popularity.desc&include_adult=false&append_to_response=images";
const SEARCH_URL = "search/movie?language=fr&include_adult=false";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { movieList: {}, currentMovie: {} };
  }

  componentDidMount() {
    this.initMovies();
  }

  initMovies() {
    axios
      .get(`${API_END_POINT}${POPULAR_MOVIES_URL}&${API_KEY}`)
      .then(response => {
        this.setState(
          {
            movieList: response.data.results.slice(1, 6),
            currentMovie: response.data.results[0]
          },
          function() {
            this.applyVideoToCurrentMovie();
          }
        );
        // console.log(response);
        // console.log(this.state.currentMovie);
      });
  }

  applyVideoToCurrentMovie() {
    axios
      .get(
        `${API_END_POINT}movie/${this.state.currentMovie.id}?${API_KEY}&append_to_response=videos&include_adult=false`
      )
      .then(response => {
        console.log(response)
        const youtubeKey = response.data.videos.results[0].key;
        let newCurrentMovieState = this.state.currentMovie;
        newCurrentMovieState.videoID = youtubeKey;
        this.setState({ currentMovie: newCurrentMovieState });
        // console.log(newCurrentMovieState);
      });
  }

  onClickListItem(movie) {
    this.setState({ currentMovie: movie }, function() {
      this.applyVideoToCurrentMovie();
    });
  }

  onClickSearch(searchText) {
    axios
      .get(`${API_END_POINT}${SEARCH_URL}&${API_KEY}&query=${searchText}`)
      .then(response => {
        if (response.data && response.data.results[0]) {
          if (response.data.results[0].id !== this.state.currentMovie.id) {
            this.setState({ currentMovie: response.data.results[0] }, () => {
              this.applyVideoToCurrentMovie();
              this.setRecommendation();
            });
          }
        }
      });
  }

  setRecommendation() {
    axios
      .get(
        `${API_END_POINT}movie/${this.state.currentMovie.id}/recommendations?${API_KEY}&language=fr`
      )
      .then(response => {
        this.setState({
          movieList: response.data.results.slice(0, 5)
        });
      });
  }

  render() {
    const renderVideoList = () => {
      if (this.state.movieList.length >= 5) {
        return (
          <VideoList
            movieList={this.state.movieList}
            callback={this.onClickListItem.bind(this)}
          />
        );
      }
    };
    return (
      <div>
      <Header />
        <div className="search_bar">
          <SearchBar callback={this.onClickSearch.bind(this)} />
        </div>
        <div className="row">
          <div className="col-md-8">
            <Video videoId={this.state.currentMovie.videoID} />
            <VideoDetail
              title={this.state.currentMovie.title}
              description={this.state.currentMovie.overview}
            />
          </div>
          <div className="col-md-4">{renderVideoList()}</div>
        </div>
      </div>
    );
  }
}
