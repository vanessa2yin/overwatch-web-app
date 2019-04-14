import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import WebNavBar from "./WebNavBar";
import * as firebase from "firebase";
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

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
        if (!this.state.data) {
            return <div />
        }
        return (
            <div>
                <WebNavBar/>
                <h2 className="heroPageTitle">{this.props.location.pathname.substring(8)} </h2>

                <Card>
                    <Card.Header as="h5">Basic stats</Card.Header>
                    <Card.Body>
                        <Card.Text>Type: {this.state.data.type}</Card.Text>
                        <Card.Text>
                            Health: {this.state.data.health}
                            {' '}
                            Shield: {this.state.data.shield}
                            {' '}
                            Armor: {this.state.data.armor}
                        </Card.Text>
                    </Card.Body>
                </Card>
                <Card>
                    <Card.Header as="h5">Bio</Card.Header>
                    <ListGroup>
                    {
                        Object.keys(this.state.data.bio).map((bioAttribute) =>
                        <ListGroup.Item>
                            {bioAttribute} : {this.state.data.bio[bioAttribute]}
                        </ListGroup.Item>
                    )
                    }
                    </ListGroup>
                </Card>
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
        );
    }
}

export default withRouter(IndividualHeroPage);