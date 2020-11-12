import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route, 
  Redirect, 
} from 'react-router-dom';

import Navbar from './layout/Navbar';
import Error from './component/Error';
// import Home from './component/Home';

import GenerateContract from './component/GenerateContract';
import CreateProperty from './component/CRUD/Create/CreateProperty';
import CreateContract from './component/CRUD/Create/CreateContract';
import CreateClient from './component/CRUD/Create/CreateClient';

import AdminProfile from './component/AdminProfile';


const App = () => {

  return (
    <Router>
      <Navbar />
      <Switch>
        <Redirect exact from="/" to="/AdminProfile" />
        {/* <Route exact path={"/"} component={Home}/>   */}
        <Route path="/AdminProfile" component={ownerRoutes}/>
        
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
        <Route exact path={match.url + "/Property/Create"} component={CreateProperty}/>
        <Route exact path={match.url + "/Property/Update/:idParam"} component={CreateProperty}/>

        <Route exact path={match.url + "/Client/Create"} component={CreateClient}/>
        <Route exact path={match.url + "/Client/Update/:idParam"} component={CreateClient}/>

        <Route exact path={match.url + "/Contract/Create"} component={CreateContract}/>
        <Route exact path={match.url + "/Contract/Update/:idParam"} component={CreateContract}/>

        <Route exact path={match.url + "/Contract/GenerateContract/:idParam"} component={GenerateContract}/>
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