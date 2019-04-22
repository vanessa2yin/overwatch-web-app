import React, { Component } from 'react';
import '../styles/StatsPage.css';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import '../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import * as firebase from "firebase";

const heroTypeOptions = {
    'DAMAGE': 'DAMAGE',
    'TANK': 'TANK',
    'SUPPORT': 'SUPPORT'
};


class StatsPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            tableData: []
        };
        this.rootRef = firebase.database().ref().child('0');
    }

    /**
     * Fetch all hero data from firebase
     * This function is only called once after the initial render
     */
    componentDidMount() {
        this.rootRef.on('value', this.gotData, this.errData);
    }

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

    errData = (err) => {
        console.log(err);
    };

    rowClassNameFormat(rowData) {
        if (rowData.type === 'DAMAGE') {
            return 'damageRowStyle'
        }
        if (rowData.type === 'SUPPORT') {
            return 'supportRowStyle'
        }
        if (rowData.type === 'TANK') {
            return 'tankRowStyle'
        }
    }

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

export default StatsPage;