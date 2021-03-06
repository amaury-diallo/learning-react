import React, { Component } from "react";

import _ from "lodash";
import { FaSortDown, FaSortUp } from "react-icons/fa";

import { getMovies } from "../services/fakeMovieService";
import Like from "./Like";
import Pagination from "./Pagination";
import { getGenres } from "../services/fakeGenreService";

class MovieList extends Component {
  state = {
    movies: getMovies(),
    MOVIE_PER_PAGE: 4,
    CURRENT_PAGE: 1,
    sortingOrder: "asc",
    sortedBy: null,
    genres: [{ name: "All genres" }, ...getGenres()],
    filterByGenre: null,
  };

  handleLike = ({ _id }) => {
    this.setState(({ movies }) => ({
      movies: movies.map((movie) =>
        movie._id === _id ? { ...movie, liked: !movie.liked } : movie
      ),
    }));
  };

  getRange = () => [
    (this.state.CURRENT_PAGE - 1) * this.state.MOVIE_PER_PAGE,
    this.state.CURRENT_PAGE * this.state.MOVIE_PER_PAGE,
  ];

  toggleOrder = (currentOrder) => (currentOrder === "asc" ? "desc" : "asc");

  sortMoviesBy = (key) => {
    const sortedMovies = _.orderBy(
      this.state.movies,
      key,
      this.state.sortingOrder
    );
    this.setState((prevState) => ({
      movies: sortedMovies,
      sortingOrder: this.toggleOrder(prevState.sortingOrder),
      sortedBy: key,
    }));
  };

  toggleOrderingIcon = (key) => {
    return key === this.state.sortedBy ? (
      this.state.sortingOrder === "asc" ? (
        <FaSortDown />
      ) : (
        <FaSortUp />
      )
    ) : null;
  };

  filterByGenre = (genre) => {
    this.setState({
      filterByGenre: genre.hasOwnProperty("_id") ? genre.name : null,
      CURRENT_PAGE: 1,
    });
  };

  getVisibleMovies = () => {
    let { movies } = this.state;
    movies = this.state.filterByGenre
      ? movies.filter((movie) => movie.genre.name === this.state.filterByGenre)
      : movies;
    return movies;
  };

  toggleActiveFilter = (genre) => {
    return genre.name === this.state.filterByGenre ||
      (this.state.filterByGenre == null && !genre._id)
      ? "active"
      : "";
  };

  renderMovies = () => {
    if (this.state.movies.length === 0)
      return <p>There are no movies to display</p>;

    return (
      <main className="container pt-5">
        <div className="row">
          <div className="col-3">
            <ul className="list-group">
              {this.state.genres.map((genre, index) => (
                <li
                  key={index}
                  className={
                    "list-group-item clickable " +
                    this.toggleActiveFilter(genre)
                  }
                  onClick={() => this.filterByGenre(genre)}
                >
                  {genre.name}
                </li>
              ))}
            </ul>
          </div>
          <div className="col">
            <p>
              Showing {this.getVisibleMovies().slice(...this.getRange()).length}{" "}
              movies in the database
            </p>
            <table className="table">
              <thead>
                <tr>
                  <th
                    className="clickable"
                    onClick={() => this.sortMoviesBy("title")}
                  >
                    Title {this.toggleOrderingIcon("title")}
                  </th>
                  <th
                    className="clickable"
                    onClick={() => this.sortMoviesBy("genre.name")}
                  >
                    Genre {this.toggleOrderingIcon("genre.name")}
                  </th>
                  <th
                    className="clickable"
                    onClick={() => this.sortMoviesBy("numberInStock")}
                  >
                    Stock {this.toggleOrderingIcon("numberInStock")}
                  </th>
                  <th
                    className="clickable"
                    onClick={() => this.sortMoviesBy("dailyRentalRate")}
                  >
                    Rate {this.toggleOrderingIcon("dailyRentalRate")}
                  </th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {this.getVisibleMovies()
                  .slice(...this.getRange())
                  .map((movie) => (
                    <tr key={movie._id}>
                      <td>{movie.title}</td>
                      <td>{movie.genre.name}</td>
                      <td>{movie.numberInStock}</td>
                      <td>{movie.dailyRentalRate}</td>
                      <th>
                        <Like
                          isLiked={movie.liked}
                          onLike={this.handleLike}
                          target={movie}
                        />
                      </th>
                      <th>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={this.handleDelete.bind(this, movie._id)}
                        >
                          Delete
                        </button>
                      </th>
                    </tr>
                  ))}
              </tbody>
            </table>
            <Pagination
              totalPage={Math.ceil(
                this.getVisibleMovies().length / this.state.MOVIE_PER_PAGE
              )}
              gotoPage={this.gotoPage}
              currentPage={this.state.CURRENT_PAGE}
            />
          </div>
        </div>
      </main>
    );
  };

  handleDelete = (id) => {
    this.setState((prevState) => ({
      movies: prevState.movies.filter((movie) => movie._id !== id),
    }));
  };

  gotoPage = (index) => {
    this.setState({ CURRENT_PAGE: index });
  };

  componentDidUpdate(prevProps, prevState) {
    const pages = _.chunk(this.state.movies, this.state.MOVIE_PER_PAGE);

    let currentPageIndex = this.state.CURRENT_PAGE;
    const isCurrentPageEmpty = () => !pages[currentPageIndex - 1];

    while (isCurrentPageEmpty()) {
      if (currentPageIndex <= 0) break;

      --currentPageIndex;
      this.setState({ CURRENT_PAGE: currentPageIndex });
    }
  }

  render() {
    return this.renderMovies();
  }
}

export default MovieList;
