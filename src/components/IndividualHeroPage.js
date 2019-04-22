import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import WebNavBar from "./WebNavBar";
import * as firebase from "firebase";
import Card from 'react-bootstrap/Card';
import Carousel from 'react-bootstrap/Carousel';
import ListGroup from 'react-bootstrap/ListGroup';
import '../styles/IndividualHeroPage.css';

class IndividualHeroPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            heroName: this.props.location.pathname.substring(8),
            data: null
        }
    }

    /**
     * Fetch data from firebase according to the router path param
     * This function is only called once before the initial render
     */
    componentWillMount() {
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

    render() {

        const heroName = this.props.location.pathname.substring(8);
        if (!this.state.data) {
            return <div />
        }
        return (
            <div>
                <WebNavBar/>
                <h2 className="heroPageTitle">{heroName} </h2>
                <div className="firstRowContainer">
                    <Card className="basicStatsContainer">
                        <Card.Header as="h5" className="firstRowHeader">I N F O</Card.Header>
                        <Card.Body>
                            <div>Type: {this.state.data.type}</div>
                            <div className="separateLine"/>
                            <Card.Text>
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
                            </Card.Text>
                        </Card.Body>
                    </Card>
                    <Carousel className="screenshotsContainer" interval="3000">
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src={require(`../images/screenshots/${heroName}1.jpg`)}
                                alt="First picture"
                            />
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src={require(`../images/screenshots/${heroName}2.jpg`)}
                                alt="Second picture"
                            />
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src={require(`../images/screenshots/${heroName}3.jpg`)}
                                alt="Third picture"
                            />
                        </Carousel.Item>
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
                <div className="abilityContainer">
                    {
                        Object.keys(this.state.data.abilities).map((abilityName) =>
                            <Card>
                                <Card.Header as="h5"> {abilityName} </Card.Header>
                                <ListGroup>
                                    {
                                        Object.keys(this.state.data.abilities[abilityName]).map(
                                            (eachAbilityAttribute) =>
                                            <ListGroup.Item>
                                                {eachAbilityAttribute} :
                                                {this.state.data.abilities[abilityName][eachAbilityAttribute]}
                                            </ListGroup.Item>
                                        )
                                    }
                                </ListGroup>
                            </Card>
                        )
                    }
                </div>

            </div>
        );
    }
}

export default withRouter(IndividualHeroPage);