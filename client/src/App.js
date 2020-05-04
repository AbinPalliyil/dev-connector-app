import React, {Fragment} from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'; 
import './App.css';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';

const App = () => 
<Router>
  <Fragment>
    <Navbar />
  <Route path="/" exact component={Landing} />

  <section className="container">
  <Switch>
  <Route path="/login" exact component={Login} />
  <Route path="/register" exact component={Register} />
</Switch>
  </section>
  </Fragment>

  </Router>


export default App;
