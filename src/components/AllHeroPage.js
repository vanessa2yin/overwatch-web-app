import React, { Component } from 'react';
import WebNavBar from "./WebNavBar";
import HeroImageButtons from "./HeroImageButtons";
import '../styles/AllHeroPage.css';

class AllHeroPage extends Component {
    render() {
        return (
            <div>
                <WebNavBar/>
                <div className="heroPageTitle"> ALL HEROES </div>
                <HeroImageButtons className="container"/>
                <img src={require('../styles/footer_image.png')} className="footer"/>
            </div>
        );
    }
}

export default AllHeroPage;
