import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import WebNavBar from "./WebNavBar";
import * as firebase from "firebase";
import Card from 'react-bootstrap/Card';
import Carousel from 'react-bootstrap/Carousel';
import ListGroup from 'react-bootstrap/ListGroup';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Comment from "./Comment";
import swal from 'sweetalert';
import "react-tabs/style/react-tabs.css";
import '../styles/IndividualHeroPage.css';

class IndividualHeroPage extends Component {
    constructor(props) {
        super(props);
        this.postCommentToFirebase = this.postCommentToFirebase.bind(this);
        this.state = {
            heroName: this.props.location.pathname.substring(8),
            data: null,
            commentData: []
        };
        this.fetchHeroDataFromFirebase();
    }

    /**
     * The fetch function must be put here to update after first mount
     */
    componentDidMount() {
        this.fetchCommentFromFirebase();
    }

    /**
     * Fetch data from firebase according to the router path param
     * This function is only called once before the initial render
     */
    fetchHeroDataFromFirebase() {
        const allHeroRef = firebase.database().ref('hero');
        const heroRef = allHeroRef.child(this.state.heroName);
        heroRef.on('value', snap => {
            this.setState({
                data: snap.val()
            });
            // console.log("type = " + this.state.data.type);
            // console.log("keys = " + Object.keys(this.state.data));
        });
    }

    /**
     * post comments to firebase with email, title, context and hero
     * prevent from posting empty comments
     * @param email email of user logged in
     * @param title input by user
     * @param context input by user
     */
    postCommentToFirebase = (e, email, title, context) => {
        e.preventDefault();
        if (title === '' || context === '') {
            swal("Whoops!", "You need to fill in all fields for your comment!", "error");
            return;
        }
        // console.log("post comment to firebase");
        let postRef = firebase.database().ref('posts');
        postRef.push({
            hero: this.state.heroName,
            email: email,
            title: title,
            context : context
        });
        swal("Post Sent!", "You have posted a comment!", "success");
        this.commentContext.value = '';
        this.commentTitle.value = '';
    };

    /**
     * Fetch comment data from firebase
     */
    fetchCommentFromFirebase() {
        const postRef = firebase.database().ref('posts');
        postRef.on('value', snap => {
            this.setState({
                commentData: snap.val()
            });

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

            // filter comments with hero rendered on this page only
            const commentFiltered =
                Object.keys(this.state.commentData)
                    .filter((commentKey) => this.state.commentData[commentKey].hero === this.state.heroName);

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
                                            <strong>{bioAttribute}</strong>: {this.state.data.bio[bioAttribute]}
                                        </ListGroup.Item>
                                    )
                                }
                            </ListGroup>
                        </Card>
                    </div>

                    <div className="sectionLine"/>
                    <div className="sectionTitle"> A B I L I T Y </div>
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
                                                    <strong>{eachAbilityAttribute}</strong> : {' '}
                                                    {this.state.data.abilities[abilityName][eachAbilityAttribute]}
                                                </ListGroup.Item>
                                        )
                                    }
                                </TabPanel>
                            )
                        }
                    </Tabs>

                    <div className="sectionLine"/>
                    <div className="sectionTitle"> C O M M E N T </div>
                    <Form className="commentForm">
                        <Form.Group controlId="comment" className="formGroup">
                            <Form.Control type="text" required oninvalid="alert('Hey, you missed something on modal!')" placeholder="title"
                                          ref={(input) => {this.commentTitle = input}} />
                            <br />
                            <Form.Control as="textarea" required oninvalid="alert('Hey, you missed something on modal!')" placeholder="Add your comment..."
                                          ref={(input) => {this.commentContext = input}} rows="3" />
                            <Form.Text className="text-muted">
                                Your email will be shown as username.
                            </Form.Text>
                        </Form.Group>
                        <Button className="postButton" variant="light" type="submit"
                                onClick={e => this.postCommentToFirebase(e, this.props.user, this.commentTitle.value, this.commentContext.value)}>
                            Post
                        </Button>
                    </Form>
                    <div className="seperateLineAboveCommentCount"/>
                    <div className="commentCount">
                        <div>{commentFiltered.length} comment(s) for {this.state.heroName} </div>
                        <div className="seperateLine"/>
                    </div>
                    <div className="comments">
                        {
                            commentFiltered.map((comment, idx) =>
                                <Comment commentData={this.state.commentData[comment]} index={idx} />
                            )
                        }
                    </div>

                    <img src={require('../styles/footer_image.png')} className="footer" alt="footer"/>
                </div>
            );
        }
    }
}

export default withRouter(IndividualHeroPage);