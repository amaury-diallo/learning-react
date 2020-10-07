import React, { Component } from "react";
import Counter from "./counter";

class Counters extends Component {
  render() {
    return (
      <React.Fragment>
        <h1>Counters</h1>
        <button onClick={this.props.onReset} className="btn btn-primary">
          Reset
        </button>
        {this.props.counters.map((counter) => (
          <Counter
            key={counter.id}
            value={counter.value}
            id={counter.id}
            onIncrement={this.props.onIncrement}
            onDelete={this.props.onDelete}
            onDecrement={this.props.onDecrement}
          />
        ))}
      </React.Fragment>
    );
  }
}

export default Counters;
