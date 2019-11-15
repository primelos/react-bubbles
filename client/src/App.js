import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

import Login from "./components/Login";
import "./styles.scss";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <Router>
      <div className="App">
        <Route exact path="/" component={Login} />
        {/* 
          Build a PrivateRoute component that will 
          display BubblePage when you're authenticated 
        */}
        <PrivateRoute path='/protected' component={BubblePage} />

      </div>
    </Router>
  );
}

export default App;
