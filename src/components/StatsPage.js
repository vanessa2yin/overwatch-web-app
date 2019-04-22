import React, { Component } from 'react';
import WebNavBar from "./WebNavBar";
import '../styles/StatsPage.css';
import '../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import StatsPageTable from "./StatsPageTable";

class StatsPage extends Component {

    render() {

        return (
            <div>
                <WebNavBar/>
                <div className="statsPageTitle"> STATS INFO </div>
                <StatsPageTable />
                <img src={require('../styles/footer_image.png')} className="footer" alt="footer"/>
            </div>
        );
    }
}

export default StatsPage;