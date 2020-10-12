import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
// import App from "./App";
import * as serviceWorker from "./serviceWorker";

import "bootstrap/dist/css/bootstrap.css";
import "font-awesome/css/font-awesome.css";
// import Counter from "./components/counter";
import MovieList from "./components/MovieList";
import NavBar from "./components/NavBar";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import Customers from "./pages/Customers";
import Rentals from "./pages/Rentals";

const VidlyApp = () => {
  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route path='/movies' component={MovieList}/>
        <Route path="/customers" component={Customers}/>
        <Route path="/rentals" component={Rentals}/>
        <Redirect from="/" to="/movies"/>
      </Switch>
    </BrowserRouter>
  );
}

ReactDOM.render(
  <React.StrictMode>
    {/* <App /> */}
    <VidlyApp />   
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
