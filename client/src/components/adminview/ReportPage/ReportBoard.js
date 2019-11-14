import React from 'react';
import { connect } from 'react-redux';
import { handleDrawer, fetchClassStandings, fetchEthnicityGroups, fetchUsers, fetchInventoryPosts } from '../../../actions';
import ReportContent from './ReportContent';
import _ from 'lodash';


class ReportBoard extends React.Component {
    toggleDrawer = (drawerStatus) => {
        this.props.handleDrawer(drawerStatus);
    }

    getClassStandings = (startDate, endDate) => {
        this.props.fetchClassStandings(undefined, startDate, endDate);
        this.props.fetchEthnicityGroups(undefined, startDate, endDate);
        this.props.fetchUsers(startDate, endDate);
        this.props.fetchInventoryPosts(startDate, endDate);
    }

    render() {
        return (
            <div>
                <ReportContent toggleDrawer={this.toggleDrawer} drawerStatus={this.props.drawerStatus} getClassStandings={this.getClassStandings} classStandingsValues={this.props.classStandingsValues} classStandingsLabels={this.props.classStandingsLabels} ethnicitiesValues={this.props.ethnicitiesValues} ethnicitiesLabels={this.props.ethnicitiesLabels} user={this.props.users} inventoryPosts={this.props.inventoryPosts} />
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
        users: _.map(Object.values(state.users), 'householdNumber'),
        inventoryPosts: Object.values(state.inventory),
    }
}

export default connect(mapStateToProps, {handleDrawer, fetchClassStandings, fetchEthnicityGroups, fetchUsers, fetchInventoryPosts})(ReportBoard);