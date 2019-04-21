import React, { Component } from 'react';
import './App.css';
import AllHeroPage from "./components/AllHeroPage";
import fire from './config/Fire';
import LogInPage from "./components/LogInPage";
import { withRouter } from 'react-router-dom';

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
      console.log(user);
      if (user) {
        this.setState({ user });
      } else {
        this.setState({ user: null });
      }
    })
  }

  render() {
    return (
        <div className="App">
          { this.state.user ? (<AllHeroPage/>) : (<LogInPage />) }
        </div>
    );
  }
}

export default withRouter(App);
