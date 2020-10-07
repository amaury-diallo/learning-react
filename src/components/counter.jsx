import React from "react";

export default function Counter({
  value,
  id,
  onIncrement,
  onDecrement,
  onDelete,
}) {
  const formatCount = () => (value ? value : "Zero");

  const getBagdeClasses = () => {
    let classes = "mr-3 badge badge-";
    classes += value ? "primary" : "warning";
    return classes;
  };

  return (
    <div className="container my-2">
      <div style={{ minWidth: "60px" }} className="d-inline-block">
        <span className={getBagdeClasses()}>{formatCount()}</span>
      </div>

      <button
        onClick={() => onIncrement(id)}
        className="btn btn-secondary btn-sm"
      >
        +
      </button>
      <button
        onClick={() => onDecrement(id)}
        className="btn btn-secondary btn-sm ml-3"
        disabled={value <= 0}
      >
        -
      </button>
      <button
        onClick={() => onDelete(id)}
        className="btn btn-danger btn-sm ml-3"
      >
        &times;
      </button>
    </div>
  );
}
