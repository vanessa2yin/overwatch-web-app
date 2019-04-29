import React, { Component } from 'react';
import WebNavBar from "./WebNavBar";
import HeroImageButtons from "./HeroImageButtons";
import { withRouter } from 'react-router-dom';
import '../styles/AllHeroPage.css';

class AllHeroPage extends Component {

    render() {
        return (
            <div>
                <WebNavBar user={this.props.user}/>
                <div className="heroPageTitle"> ALL HEROES </div>
                <HeroImageButtons className="container" user={this.props.user}/>
                <img src={require('../styles/footer_image.png')} className="footer" alt="footer"/>
            </div>
        );
    }
}

export default withRouter(AllHeroPage);
