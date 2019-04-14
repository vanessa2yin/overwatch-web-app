import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import { Link, withRouter } from 'react-router-dom';
import Autocomplete from 'react-autocomplete';
import { heroCategoryList } from '../const.js';
import '../styles/WebNavBar.css';

class WebNavBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: ''
        }
    }

    /**
     * handle search event when the search button is clicked
     * @param e
     * @param heroName
     */
    handleSearch(e, heroName) {
        e.preventDefault();
        console.log("Go to page of " + heroName);
        let path = "/heroes/"+ heroName;
        this.props.history.push(path);
        window.location.reload();
    }

    render() {
        const inputProps = {
            className: "autoComplete",
            placeholder: "Search hero (๑•̀ㅂ•́)و",
            value: this.state.value,
            onChange: this.onChange
        };
        return (
            <Navbar variant="dark" expand="lg">
                <Navbar.Brand href="/">
                    <img src={require('../styles/web_logo.png')} height="30" alt="logo"/>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="/heroes">
                            <i className="fab fa-superpowers"/>
                            Heroes
                        </Nav.Link>
                        <Nav.Link href="/stats">
                            <i className="fas fa-stream"/>
                            Stats
                        </Nav.Link>
                    </Nav>
                    <Form inline>
                        <Autocomplete
                            items={heroCategoryList}
                            getItemValue={item => item.name}
                            shouldItemRender={(item, value) =>
                                item.name.toLowerCase().indexOf(value.toLowerCase()) > -1 ||
                                item.type.toLowerCase().indexOf(value.toLowerCase()) !== -1}
                            renderItem={(item, isHighlighted) =>
                                <div style={{ background: isHighlighted ? 'lightgray' : 'transparent'}}>
                                    <div style={{fontWeight: 'bold', fontSize: '16px'}}> {item.name} </div>
                                    <p style={{color: 'grey', fontSize: '10px'}}>({item.type})</p>
                                </div>
                            }
                            value={this.state.value}
                            inputProps={inputProps}
                            onChange={(e, value) => this.setState( {value})}
                            onSelect={(value) => this.setState( {value})}
                        />
                        <Button variant="outline-light" className="mr-sm-2"
                                onClick={e=>{ this.handleSearch(e, this.state.value); }}>
                            <i className="fas fa-search"/>
                        </Button>
                    </Form>
                    <Link to="/login"><Button variant="outline-light">Log Out</Button></Link>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

export default withRouter(WebNavBar);