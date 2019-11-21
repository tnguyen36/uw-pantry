import React from 'react';
import { connect } from 'react-redux';
import { handleDrawer, fetchClassStandings, fetchEthnicityGroups, fetchUsers, fetchPositiveDailyInventory, fetchNegativeDailyInventory } from '../../../actions';
import ReportContent from './ReportContent';
import _ from 'lodash';



class ReportBoard extends React.Component {

    toggleDrawer = (drawerStatus) => {
        this.props.handleDrawer(drawerStatus);
    }

    getClassStandings = (startDate, endDate) => {
        this.props.fetchClassStandings(startDate, endDate);
        this.props.fetchEthnicityGroups(startDate, endDate);
        this.props.fetchUsers();
        this.props.fetchPositiveDailyInventory(startDate, endDate);
        this.props.fetchNegativeDailyInventory(startDate, endDate);
    }

    render() {
        return (
            <div>
                <ReportContent toggleDrawer={this.toggleDrawer} drawerStatus={this.props.drawerStatus} getClassStandings={this.getClassStandings} classStandingsValues={this.props.classStandingsValues} classStandingsLabels={this.props.classStandingsLabels} ethnicitiesValues={this.props.ethnicitiesValues} ethnicitiesLabels={this.props.ethnicitiesLabels} users={this.props.users} inventoryPosts={this.props.inventoryPosts} positiveDaily={this.props.positiveDaily} negativeDaily={this.props.negativeDaily} />
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        drawerStatus: state.handleDrawer,
        classStandingsLabels : _.map(state.classStandings, "_id"),
        classStandingsValues: _.map(state.classStandings, "total"),
        ethnicitiesLabels : _.map(state.ethnicities, "_id"),
        ethnicitiesValues: _.map(state.ethnicities, "total"),
        users: Object.values(state.users),
        positiveDaily: state.positiveDaily,
        negativeDaily: state.negativeDaily
    }
}

export default connect(mapStateToProps, {handleDrawer, fetchClassStandings, fetchEthnicityGroups, fetchUsers, fetchPositiveDailyInventory, fetchNegativeDailyInventory})(ReportBoard);