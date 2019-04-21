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
import StatsPage from "./components/StatsPage";
import AllHeroPage from "./components/AllHeroPage";

ReactDOM.render(
    <Router>
        <div>
            <Route exact path="/" component={App} />
            <Route exact strict path="/heroes" component={AllHeroPage} />
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
