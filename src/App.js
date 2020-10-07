import React, { Component } from "react";
import "./App.css";
import Counters from "./components/Counters";
import MovieList from "./components/MovieList";
import NavBar from "./components/NavBar";

class App extends Component {
  state = {
    counters: [
      { id: 1, value: 0 },
      { id: 2, value: 0 },
      { id: 3, value: 0 },
      { id: 4, value: 0 },
    ],
  };

  handleIncrement = (id) => {
    this.setState(({ counters }) => ({
      counters: counters.map((counter) =>
        counter.id === id ? { ...counter, value: counter.value++ } : counter
      ),
    }));
  };

  handleDecrement = (id) => {
    this.setState(({ counters }) => ({
      counters: counters.map((counter) =>
        counter.id === id && counter.value > 0
          ? { ...counter, value: counter.value-- }
          : counter
      ),
    }));
  };

  handleDelete = (id) => {
    this.setState(({ counters }) => ({
      counters: counters.filter((counter) => counter.id !== id),
    }));
  };

  handleReset = (id) => {
    this.setState(({ counters }) => ({
      counters: counters.map((counter) => ({ ...counter, value: 0 })),
    }));
  };

  render() {
    return (
      <React.Fragment>
        <NavBar counters={this.state.counters} />
        <main className="container pt-3">
          {/* <MovieList /> */}
          <Counters
            counters={this.state.counters}
            onIncrement={this.handleIncrement}
            onDecrement={this.handleDecrement}
            onDelete={this.handleDelete}
            onReset={this.handleReset}
          />
        </main>
      </React.Fragment>
    );
  }
}

export default App;
