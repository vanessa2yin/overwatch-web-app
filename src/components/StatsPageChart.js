import React, { Component } from 'react';
import '../styles/StatsPage.css';
import '../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import * as firebase from "firebase";
import '../../node_modules/react-vis/dist/style.css';
import {
    RadialChart,
    Hint,
    XYPlot,
    XAxis,
    YAxis,
    VerticalGridLines,
    HorizontalGridLines,
    HorizontalBarSeries,
} from 'react-vis';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import '../styles/StatsPageChart.css';

class StatsPageChart extends Component {
    constructor(props){
        super(props);
        this.state = {
            chartData: [],
            donutDisplayValue: false, //tooltip for donut chart
            chartCategory: 'health', // default value for chart category
        };
        this.rootRef = firebase.database().ref('hero');
    }

    /**
     * Fetch all hero data from firebase
     * have two callbacks: one deal with data and one deal with error
     * This function is only called once after the initial render
     */
    componentDidMount() {
        this.rootRef.on('value', this.gotData, this.errData);
    }


    /**
     * the callback method when get value from firebase
     * get values from the database and push attributes into each hero's date field
     * and then update the chart data for react-vis RadialChart component
     * @param data the whole data get from firebase
     */
    gotData = (data) => {
        let newChartData = [];
        const heroData = data.val();
        const keys = Object.keys(heroData);
        for (let i = 0; i < keys.length; i++) {
            const heroName = keys[i];
            // console.log(heroName);
            newChartData.push({
                name: heroName,
                x:heroData[heroName].health,
                y:heroName,
                type: heroData[heroName].type,
                health: heroData[heroName].health,
                armor: heroData[heroName].armor,
                shield: heroData[heroName].shield,
                pickRate: heroData[heroName]['advanced stats'] == null? 'N/A': heroData[heroName]['advanced stats']['pick rate'],
                winRate: heroData[heroName]['advanced stats'] == null? 'N/A': heroData[heroName]['advanced stats']['win rate'],
            });
        }
        this.setState({
            chartData: newChartData
        });
    };

    /**
     * the callback method when get value from firebase
     * print error in the console
     * @param err
     */
    errData = (err) => {
        console.log(err);
    };

    render() {
        return (
            <div className="App chartPage">
                <div className="chartCategoryButtonGroup">
                    <ButtonGroup>
                        <Button variant="light" className="groupButtons"
                                active={this.state.chartCategory === 'health'}
                                onClick={e => {this.setState({chartCategory: 'health'})}}>Health</Button>
                        <Button variant="light" className="groupButtons"
                                active={this.state.chartCategory === 'armor'}
                                onClick={e => {this.setState({chartCategory: 'armor'})}}>Armor</Button>
                        <Button variant="light" className="groupButtons"
                                active={this.state.chartCategory === 'shield'}
                                onClick={e => {this.setState({chartCategory: 'shield'})}}>Shield</Button>
                        <Button variant="light" className="groupButtons"
                                active={this.state.chartCategory === 'pickRate'}
                                onClick={e => {this.setState({chartCategory: 'pickRate'})}}>Pick Rate</Button>
                        <Button variant="light" className="groupButtons"
                                active={this.state.chartCategory === 'winRate'}
                                onClick={e => {this.setState({chartCategory: 'winRate'})}}>Win Rate</Button>
                    </ButtonGroup>
                </div>
                <div className="chartContainer">
                    <RadialChart
                        animation
                        className="donutChart"
                        innerRadius={100}
                        radius={140}
                        getAngle={d => d[this.state.chartCategory]}
                        getColor={d => d.color}
                        data={this.state.chartData}
                        onValueMouseOver={v => this.setState({donutDisplayValue: v})}
                        onSeriesMouseOut={v => this.setState({donutDisplayValue: false})}
                        width={300}
                        height={300}
                        padAngle={0.04}
                    >
                        { this.state.donutDisplayValue !== false && <Hint value={this.state.donutDisplayValue} /> }
                    </RadialChart>
                    <XYPlot yType="ordinal"
                            className="barChart"
                            width={800}
                            height={800}
                            margin={{left: 100}}>
                        <VerticalGridLines />
                        <HorizontalGridLines />
                        <XAxis />
                        <YAxis />
                        <HorizontalBarSeries
                            className="verticalBarSeries"
                            getX={d => d[this.state.chartCategory]}
                            getY={d => d.y}
                            data={this.state.chartData}
                        />
                    </XYPlot>
                </div>
            </div>
        );
    }
}

export default StatsPageChart;