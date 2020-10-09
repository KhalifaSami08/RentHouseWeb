import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route, 
} from 'react-router-dom';

import Navbar from './layout/Navbar';

import Error from './component/Error';
import Home from './component/Home';
import CreateProperty from './component/CRUD/CreateProperty';
import CreateClient from './component/CRUD/CreateClient';
// import Update from './component/CRUD/Update';

import AdminProfile from './component/AdminProfile';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path={"/"} component={Home}/>  
        {/* <Route exact path={"/"} component={ownerRoutes}/>   */}
        <Route path={"/AdminProfile"} component={ownerRoutes}/>
        
        <Route component={Error} />
      </Switch>
    </Router>
  )
}

const ownerRoutes = ({match}) => (
  <>
    <Router>
      <Switch>
        <Route exact path={match.url + "/"} component={AdminProfile}/>
        <Route exact path={match.url + "/CreateProperty"} component={CreateProperty}/>
        <Route exact path={match.url + "/Update/:idParam"} component={CreateProperty}/>

        <Route exact path={match.url + "/CreateClient"} component={CreateClient}/>
        <Route component={Error} />
      </Switch>
    </Router>
      
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