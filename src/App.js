import React, { Component } from 'react';
import './App.css';
import Home from './Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AccessList from './AccessList';
import AccessEdit from './AccessEdit';

class App extends Component {

  componentDidMount() {
    document.title = "B2B Accesses"
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route path='/' exact component={Home}/>
          <Route path='/accesses' exact component={AccessList}/>
          <Route path='/access/:id' component={AccessEdit}/>
        </Switch>
      </Router>
    )
  }
}

export default App;