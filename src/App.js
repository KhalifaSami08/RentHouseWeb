import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import Navbar from './layout/Navbar';

import Error from './component/Error';
import Home from './component/Home';
import Create from './component/CRUD/Create';
import Read from './component/CRUD/Read';
import Update from './component/CRUD/Update';

import Profile from './component/Owner';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path={"/"} component={Home}/>  
        <Route path={"/Owner"} component={ownerRoutes}/>
        
        <Route component={Error} />
      </Switch>
    </Router>
  )
}

const ownerRoutes = ({match}) => (
  <>
      <Route exact path={match.url + "/"} component={Profile}/>
      <Route exact path={match.url + "/Create"} component={Create}/>
      <Route exact path={match.url + "/Read/:id"} component={Read}/>
      <Route exact path={match.url + "/Update/:id"} component={Update}/>
  </>
);

/* const withAuth = (Component) => {
  const AuthRoute = () => {
    const isAuth = !!localStorage.getItem("token");
    if (isAuth) {
      return <Component />;
    } else {
      return <Redirect to="/" />;
    }
  };

  return AuthRoute;
}; */

export default App;