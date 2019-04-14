import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import App from './App';
import LogInPage from './components/LogInPage';
import SignUpPage from './components/SignUpPage';
import IndividualHeroPage from './components/IndividualHeroPage';
import * as firebase from 'firebase';
import StatsPage from "./components/StatsPage";

var config = {
    apiKey: "AIzaSyBjh_slFpHUvImMsoPq_Yt8VVhyinpVmDo",
    authDomain: "overwatch-web-app.firebaseapp.com",
    databaseURL: "https://overwatch-web-app.firebaseio.com",
    projectId: "overwatch-web-app",
    storageBucket: "",
    messagingSenderId: "1095764019962"
};
firebase.initializeApp(config);

ReactDOM.render(
    <Router>
        <div>
            <Route exact path="/" component={App} />
            <Route exact path="/home" component={App} />
            <Route exact strict path="/heroes" component={App} />
            <Route exact path="/heroes/:heroname" component={IndividualHeroPage} />
            <Route exact path="/stats" component={StatsPage} />
            <Route exact path="/login" component={LogInPage} />
            <Route exact path="/signup" component={SignUpPage} />
        </div>
    </Router>,
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
