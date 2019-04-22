import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import WebNavBar from "./WebNavBar";
import * as firebase from "firebase";
import Card from 'react-bootstrap/Card';
import Carousel from 'react-bootstrap/Carousel';
import ListGroup from 'react-bootstrap/ListGroup';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import "react-tabs/style/react-tabs.css";
import '../styles/IndividualHeroPage.css';

class IndividualHeroPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            heroName: this.props.location.pathname.substring(8),
            data: null
        };
        this.fetchDataFromFirebase();
    }

    /**
     * Fetch data from firebase according to the router path param
     * This function is only called once before the initial render
     */
    fetchDataFromFirebase() {
        const rootRef = firebase.database().ref().child('0');
        const heroRef = rootRef.child(this.state.heroName);
        heroRef.on('value', snap => {
            this.setState({
                data: snap.val()
            });
            // console.log("type = " + this.state.data.type);
            // console.log("keys = " + Object.keys(this.state.data));
        });
    }

    /**
     * Create a list of carousel items using screenshots
     * @returns {Array} the list of Carousel.Items
     */
    createCarousel = () => {
        let carousels = [];
        for (let i = 1; i < 4; i++) {
            let children =
                (<Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={require(`../images/screenshots/${this.state.heroName}${i}.jpg`)}
                        alt={`slide ${i}`}
                    />
                </Carousel.Item>);
            carousels.push(children);
        }
        return carousels;
    };

    render() {

        if (!this.state.data) {
            return <div />
        } else {
            return (
                <div>
                    <WebNavBar/>
                    <h2 className="heroPageTitle">{this.state.heroName} </h2>
                    <div className="firstRowContainer">
                        <Card className="basicStatsContainer">
                            <Card.Header as="h5" className="firstRowHeader">I N F O</Card.Header>
                            <Card.Body>
                                <div>Type: {this.state.data.type}</div>
                                <div className="separateLine"/>
                                <div className="healthShieldArmorRow">
                                    <div>Health: </div>
                                    <div className="healthBox">{this.state.data.health}</div>
                                </div>
                                <div className="healthShieldArmorRow">
                                    <div>Shield:</div>
                                    <div className="shieldBox">{this.state.data.shield}</div>
                                </div>
                                <div className="healthShieldArmorRow">
                                    <div>Armor:</div>
                                    <div className="armorBox">{this.state.data.armor}</div>
                                </div>
                            </Card.Body>
                        </Card>
                        <Carousel className="screenshotsContainer" interval="3000">
                            {this.createCarousel()}
                        </Carousel>
                        <Card className="bioContainer">
                            <Card.Header as="h5" className="firstRowHeader">B I O</Card.Header>
                            <ListGroup>
                                {
                                    Object.keys(this.state.data.bio).map((bioAttribute) =>
                                        <ListGroup.Item className="listItems">
                                            {bioAttribute} : {this.state.data.bio[bioAttribute]}
                                        </ListGroup.Item>
                                    )
                                }
                            </ListGroup>
                        </Card>
                    </div>

                    <div className="abilityLine"/>

                    <div className="abilityTitle"> A B I L I T Y </div>
                    <Tabs className="abilityContainer" selectedTabClassName="tabSelected">
                        <TabList>
                            {
                                Object.keys(this.state.data.abilities).map((abilityName) =>
                                    <Tab>{abilityName}</Tab>
                                )
                            }
                        </TabList>
                        {
                            Object.keys(this.state.data.abilities).map((abilityName) =>
                                <TabPanel>
                                    {
                                        Object.keys(this.state.data.abilities[abilityName]).map(
                                            (eachAbilityAttribute) =>
                                                <ListGroup.Item className="listItems">
                                                    {eachAbilityAttribute} : {' '}
                                                    {this.state.data.abilities[abilityName][eachAbilityAttribute]}
                                                </ListGroup.Item>
                                        )
                                    }
                                </TabPanel>
                            )
                        }
                    </Tabs>
                    <img src={require('../styles/footer_image.png')} className="footer" alt="footer"/>
                </div>
            );
        }
    }
}

export default withRouter(IndividualHeroPage);