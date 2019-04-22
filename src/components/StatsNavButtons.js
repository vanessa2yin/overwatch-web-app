import React, { Component } from 'react';
import '../styles/StatsPage.css';
import Nav from 'react-bootstrap/Nav';

class StatsNavButtons extends Component {

    render() {

        return (
            <div>
                <Nav justify variant="tabs">
                    <Nav.Item>
                        <Nav.Link href="/stats">Table</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link href="/stats/pie">Pie Chart</Nav.Link>
                    </Nav.Item>
                </Nav>
            </div>
        );
    }
}

export default StatsNavButtons;