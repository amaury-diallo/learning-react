import React, { Component } from "react";

import { getMovies } from "../services/fakeMovieService";
import Like from "./Like";
import Pagination from "./Pagination";

class MovieList extends Component {
  state = {
    movies: getMovies(),
    MOVIE_PER_PAGE: 4,
    CURRENT_PAGE: 1,
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

  renderMovies = () => {
    if (this.state.movies.length === 0)
      return <p>There are no movies to display</p>;

    return (
      <main className="container pt-3">
        <p>Showing {this.state.movies.length} movies in the database</p>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Title</th>
              <th scope="col">Genre</th>
              <th scope="col">Stock</th>
              <th scope="col">Rate</th>
              <th scope="col"></th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {this.state.movies.slice(...this.getRange()).map((movie) => (
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
        {this.togglePagination()}
      </main>
    );
  };

  handleDelete = (id) => {
    this.setState((prevState) => ({
      movies: prevState.movies.filter((movie) => movie._id !== id),
    }));
  };

  gotoPage = (index) => {
    console.log(index, this.state.CURRENT_PAGE);
    this.setState({ CURRENT_PAGE: index });
    console.log(this.state.CURRENT_PAGE);
  };

  togglePagination = () =>
    this.state.movies.length / this.state.MOVIE_PER_PAGE > 1 ? (
      <Pagination
        totalPage={
          Math.floor(-this.state.movies.length / this.state.MOVIE_PER_PAGE) * -1
        }
        gotoPage={this.gotoPage}
      />
    ) : (
      ""
    );

  render() {
    return this.renderMovies();
  }
}

export default MovieList;
