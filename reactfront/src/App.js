import "bootstrap/dist/css/bootstrap.min.css";
import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import Navbar from "./components/navbar.component"
import ConcertList from "./components/concert-list.component";
import CreateConcert from "./components/create-concert.component";
import EditConcert from "./components/edit-concert.component";

function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <br />
        <Route path='/' exact component={ConcertList} />
        <Route path='/create' component={CreateConcert} />
        <Route path='/edit/:id' component={EditConcert} />
      </div>
    </Router>
  );
}

export default App;
