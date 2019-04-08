import React, { Component } from 'react';

class HeroImageButtons extends Component {

    /**
     * TO BE CONTINUED
     * handle click event when the image button is clicked
     * @param e
     * @param imageName
     */
    handleImageClick(e, imageName) {
        e.preventDefault();
        console.log("CLICKED " + imageName);
    }

    render() {
        let array = ["Ana", "Ashe", "Baptiste", "Bastion", "D-va", "Doomfist", "Genji", "Hanzo", "Junkrat", "Lucio",
            "McCree", "Mei", "Mercy", "Moira", "Orisa", "Pharah", "Reaper", "Reinhardt", "Roadhog", "Soldier-76",
            "Sombra", "Symmetra", "Torbjorn", "Tracer", "Widowmaker", "Winston", "Wrecking-ball", "Zarya", "Zenyatta"];

        let images = array.map(image => {
            return (
                <button onClick={e=>{ this.handleImageClick(e, image); }}>
                    <img key={image} src={require(`../images/${image}.png`)} alt={image}
                        className="img-responsive" />
                    {image}
                </button>
            )
        });

        return (
            <div className="container">
                { images }
            </div>
        );
    }
}
export default HeroImageButtons;