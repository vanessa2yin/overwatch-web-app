import React, { Component } from 'react';
import WebNavBar from "./WebNavBar";
import '../styles/StatsPage.css';
import '../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import StatsPageTable from "./StatsPageTable";
import StatsPageChart from "./StatsPageChart";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

class StatsPage extends Component {

    render() {

        return (
            <div>
                <WebNavBar/>
                <div className="statsPageTitle"> STATS INFO </div>
                <Tabs className="abilityContainer" selectedTabClassName="tabSelected">
                    <TabList>
                        <Tab> <i className="fas fa-table"/> Table </Tab>
                        <Tab> <i className="fas fa-chart-pie"/> Chart </Tab>
                    </TabList>
                    <TabPanel>
                        <StatsPageTable />
                    </TabPanel>
                    <TabPanel>
                        <StatsPageChart />
                    </TabPanel>
                </Tabs>
                <img src={require('../styles/footer_image.png')} className="footer" alt="footer"/>
            </div>
        );
    }
}

export default StatsPage;