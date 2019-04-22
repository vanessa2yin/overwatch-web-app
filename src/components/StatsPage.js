import React, { Component } from 'react';
import WebNavBar from "./WebNavBar";
import '../styles/StatsPage.css';
import '../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import StatsWithTable from "./StatsWithTable";

class StatsPage extends Component {

    render() {

        return (
            <div>
                <WebNavBar/>
                <div className="statsPageTitle"> STATS INFO </div>
                <StatsWithTable />
            </div>
        );
    }
}

export default StatsPage;