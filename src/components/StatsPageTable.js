import React, { Component } from 'react';
import '../styles/StatsPage.css';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import '../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import * as firebase from "firebase";

/**
 * These are the options to be displayed in the type filter in bootstrap table component
 * @type {{SUPPORT: string, TANK: string, DAMAGE: string}}
 */
const heroTypeOptions = {
    'DAMAGE': 'DAMAGE',
    'TANK': 'TANK',
    'SUPPORT': 'SUPPORT'
};


class StatsPageTable extends Component {
    constructor(props){
        super(props);
        this.state = {
            tableData: []
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
     * and then update the table data for bootstrap table component
     * @param data the whole data get from firebase
     */
    gotData = (data) => {
        let newTableData = [];
        const heroData = data.val();
        const keys = Object.keys(heroData);
        for (let i = 0; i < keys.length; i++) {
            const heroName = keys[i];
            // console.log(heroName);
            newTableData.push({
                name: heroName,
                type: heroData[heroName].type,
                health: heroData[heroName].health,
                armor: heroData[heroName].armor,
                shield: heroData[heroName].shield,
                pickRate: heroData[heroName]['advanced stats'] == null? 'N/A': heroData[heroName]['advanced stats']['pick rate'],
                winRate: heroData[heroName]['advanced stats'] == null? 'N/A': heroData[heroName]['advanced stats']['win rate'],
            });
        }
        this.setState({
            tableData: newTableData
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

    /**
     * return appropriate className for styling according to rowData's type data field
     * @param rowData row data of bootstrap table component
     * @returns {string} correct className
     */
    rowClassNameFormat = (rowData) => {
        if (rowData.type === 'DAMAGE') {
            return 'damageRowStyle'
        }
        if (rowData.type === 'SUPPORT') {
            return 'supportRowStyle'
        }
        if (rowData.type === 'TANK') {
            return 'tankRowStyle'
        }
    };

    render() {

        return (
            <div>
                <BootstrapTable className="table"
                                data={ this.state.tableData }
                                trClassName={this.rowClassNameFormat}
                >
                    <TableHeaderColumn dataField='name' isKey dataSort
                                       filter={{ type: 'TextFilter', delay: 1000 }}>
                        Name
                    </TableHeaderColumn>
                    <TableHeaderColumn dataField='type' dataSort filterFormatted
                                       formatExtraData={ heroTypeOptions }
                                       filter={{ type: 'SelectFilter', options: heroTypeOptions }}>
                        Type
                    </TableHeaderColumn>
                    <TableHeaderColumn dataField='health' dataSort filter={{
                        type: 'NumberFilter',
                        delay: 1000,
                        numberComparators: [ '=', '>', '<=' ]
                    }}>
                        Health
                    </TableHeaderColumn>
                    <TableHeaderColumn dataField='armor' dataSort filter={{
                        type: 'NumberFilter',
                        delay: 1000,
                        numberComparators: [ '=', '>', '<=' ]
                    }}> Armor </TableHeaderColumn>
                    <TableHeaderColumn dataField='shield' dataSort filter={{
                        type: 'NumberFilter',
                        delay: 1000,
                        numberComparators: [ '=', '>', '<=' ]
                    }}> Shield </TableHeaderColumn>
                    <TableHeaderColumn dataField='pickRate' dataSort filter={{
                        type: 'NumberFilter',
                        delay: 1000,
                        numberComparators: [ '=', '>', '<=' ]
                    }}> Pick Rate (%) </TableHeaderColumn>
                    <TableHeaderColumn dataField='winRate' dataSort filter={{
                        type: 'NumberFilter',
                        delay: 1000,
                        numberComparators: [ '=', '>', '<=' ]
                    }}> Win Rate (%) </TableHeaderColumn>
                </BootstrapTable>
            </div>
        );
    }
}

export default StatsPageTable;