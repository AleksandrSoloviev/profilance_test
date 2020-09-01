import React, {Component} from 'react';
import './App.css';
import "./components/header/Header.scss"
import Header from "./components/header/Header";
import {Route, Switch} from 'react-router-dom';
import {routes} from "./routes/routes";


class App extends Component {
  render() {
      return (
      <div>
          <Header/>
          <Switch>
              {routes.map((route, key)=>{
                  return(
                      <Route
                          key={key}
                          component={route.component}
                          path={route.path}
                          exact={route.exact}
                      />
                  )
              })}
          </Switch>
      </div>
      );
  }
}

export default App;
