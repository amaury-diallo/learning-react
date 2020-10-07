import React from "react";

export default Table = ({ headers, rows }) => (
  <table class="table">
    <thead>
      <tr>
        {headers.map((title, index) => (
          <th scope="col" key={index}>
            {title}
          </th>
        ))}
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row">1</th>
        <td>Mark</td>
        <td>Otto</td>
        <td>@mdo</td>
      </tr>
    </tbody>
  </table>
);
