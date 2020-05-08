import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import { Provider } from 'react-redux';
import store from './store';
import Alert from './components/layout/Alert';
import setAuthToken from './utils/setAuthToken';
import { loadUser } from './actions/auth';
import Dashboard from './components/dashboard/Dashboard';
import PrivateRoute from './components/routing/PrivateRoute';
import CreateProfile from './components/profile-forms/CreateProfile';
import EditProfile from './components/profile-forms/EditProfile';
import AddExperience from './components/profile-forms/AddExperience';
import AddEducation from './components/profile-forms/AddEducation';
import Profiles from './components/profiles/Profiles';
import UserProfile from './components/user-profile/UserProfile';

if (localStorage.token) {
	setAuthToken(localStorage.token);
}
const App = () => {
	
	useEffect(() => {
		setAuthToken(localStorage.token);
		store.dispatch(loadUser());
	  }, []);
	return (
		<Provider store={store}>
			<Router>
				<Fragment>
					<Navbar />
					<Route path='/' exact component={Landing} />

					<section className='container'>
						<Alert />
						<Switch>
							<Route path='/login' exact component={Login} />
							<Route path='/developers' exact component={Profiles} />
							<Route path='/profile/:id' exact component={UserProfile} />

							<Route
								path='/register'
								exact
								component={Register}
							/>
							<PrivateRoute path='/dashboard' exact component={Dashboard} />
							<PrivateRoute path='/create-profile' exact component={CreateProfile} />
							<PrivateRoute path='/edit-profile' exact component={EditProfile} />
							<PrivateRoute path='/add-experience' exact component={AddExperience} />
							<PrivateRoute path='/add-education' exact component={AddEducation} />


						</Switch>
					</section>
				</Fragment>
			</Router>
		</Provider>
	);
};
export default App;
