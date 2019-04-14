import React, { Component } from 'react';
import WebNavBar from "./WebNavBar";
import '../styles/StatsPage.css';

class StatsPage extends Component {
    render() {
        return (
            <div>
                <WebNavBar/>
                <div className="statsPageTitle"> STATS INFO </div>
            </div>
        );
    }
}

export default StatsPage;