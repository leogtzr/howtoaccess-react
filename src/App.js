import React, { Component } from 'react';
import './App.css';
import Home from './Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import GroupList from './GroupList';
import GroupEdit from './GroupEdit';
import GroupMenu from './GroupMenu';
import AccessList from './AccessList';
import MenuView from './MenuView';

class App extends Component {

  componentDidMount(){
    document.title = "B2B Accesses"
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route path='/' exact component={Home}/>
          <Route path='/groups' exact component={GroupList}/>
          <Route path='/accesses' exact component={AccessList}/>
          <Route path='/groups/:id' component={GroupEdit}/>
          <Route path='/menus/:title' component={MenuView} />
          <Route path='/menus' component={GroupMenu} exact />
        </Switch>
      </Router>
    )
  }
}

export default App;