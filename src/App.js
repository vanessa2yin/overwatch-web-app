import React, { Component } from 'react';
import './App.css';
import fire from './config/Fire';
import {
  BrowserRouter as Router,
  Route,
  withRouter,
  Redirect
} from 'react-router-dom';

import LogInPage from './components/LogInPage';
import SignUpPage from './components/SignUpPage';
import IndividualHeroPage from './components/IndividualHeroPage';
import StatsPage from "./components/StatsPage";
import AllHeroPage from "./components/AllHeroPage";

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user: {}
    }
  }

  componentDidMount() {
    this.authListener();
  }

  /**
   * authentication listener
   */
  authListener() {
    fire.auth().onAuthStateChanged((user) => {
      console.log("User logged in:");
      console.log(user);
      if (user) {
        this.setState({ user });
      } else {
        this.setState({ user: null });
      }
    })
  }

  render() {
    /**
     * custom route component for private pages
     * will render correct component and also pass user prop if it exists
     * @param Component
     * @param rest
     */
    const PrivateRoute = ({ component: Component, ...rest }) => (
        <Route {...rest} render={(props) => (
            this.state.user !== null
                ? <Component {...props} user={this.state.user.email} />
                : <Redirect to='/login' />
        )} />
    );

    /**
     * custom route component for public pages
     * @param Component
     * @param rest
     */
    const PublicRoute = ({ component: Component, ...rest }) => (
        <Route {...rest} render={(props) => (
            this.state.user == null
                ? <Component {...props}/>
                : <Redirect to='/' />
        )} />
    );

    return (
        <Router>
          <div>
            <PrivateRoute exact path="/" component={AllHeroPage}/>
            <PrivateRoute exact strict path="/heroes" component={AllHeroPage} />
            <PrivateRoute exact path="/heroes/:heroname" component={IndividualHeroPage} />
            <PrivateRoute exact path="/stats" component={StatsPage} />
            <PublicRoute exact path="/login" component={LogInPage} />
            <PublicRoute exact path="/signup" component={SignUpPage} />
          </div>
        </Router>
    );
  }
}

export default withRouter(App);
