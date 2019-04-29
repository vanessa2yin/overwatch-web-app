import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import '../styles/HeroImageButtons.css';
import { heroList } from "../const";

class HeroImageButtons extends Component {

    render() {
        let images = heroList.map(image => {
            return (
                <Link to={{
                    pathname: "heroes/" + image,
                    state: {
                        user: this.props.user
                    }
                }}>
                    <img key={image}
                         src={require(`../images/${image}.png`)}
                         alt={image}
                         className="img"
                         title={image}
                    />
                </Link>
            )
        });

        return (
            <div className="imageContainer">
                { images }
            </div>
        );
    }
}
export default withRouter(HeroImageButtons);