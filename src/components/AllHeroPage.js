import React, { Component } from 'react';
import WebNavBar from "./WebNavBar";
import HeroImageButtons from "./HeroImageButtons";

class AllHeroPage extends Component {
    render() {
        return (
            <div>
                <WebNavBar/>
                <HeroImageButtons />
            </div>
        );
    }
}

export default AllHeroPage;
