import React from 'react';
import { Routes } from './Routes/index';
import { iRoute } from './Models/System';
import { Switch, Route } from 'react-router-dom';
import { Header } from './Components/Header/Header';

export class App extends React.Component {
  get routes() {

    return Routes.map((router: iRoute, index: number) => {

      if (router.isErrorPage) {
        return (<Route key={router.name} component={router.component} />);
      }

      return (
        <Route
          key={index}
          exact={index === 0 ? true : false}
          path={router.url}
          component={router.component}
        />
      );
    });
  }

  render() {
    return (
      <React.Fragment>
        <Header PagesRoutes={Routes.filter(r => !r.isErrorPage)} />
        <Switch>
          {this.routes}
        </Switch>
      </React.Fragment>
    );
  }
}
