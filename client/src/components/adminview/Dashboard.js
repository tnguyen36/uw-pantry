import React from 'react';
import AdminContent from './AdminContent';
import { connect } from 'react-redux';
import { fetchUsers, fetchClassStandings, fetchDateGroups, fetchEthnicityGroups, fetchDailyUsers, handleDrawer } from '../../actions';
import _ from 'lodash';


class Dashboard extends React.Component {
    
    componentDidMount() {
        this.props.fetchClassStandings();
        this.props.fetchDateGroups();
        this.props.fetchEthnicityGroups();
        this.props.fetchDailyUsers();
    }

    toggleDrawer = (drawerStatus) => {
        this.props.handleDrawer(drawerStatus);
    }


    render() {
        if (!this.props.classStandingsLabels || !this.props.classStandingsValues || !this.props.dateGroups || !this.props.ethnicitiesLabels || !this.props.ethnicitiesValues) {
            return <div>Loading</div>
        } 
        return(
            <div>
                {isNaN(this.props.classStandingsValues) && <AdminContent ethnicitiesLabels={this.props.ethnicitiesLabels} ethnicitiesValues={this.props.ethnicitiesValues} classStandingsLabels={this.props.classStandingsLabels} classStandingsValues={this.props.classStandingsValues} dateGroups={this.props.dateGroups} dailyUsers={this.props.dailyUsers} toggleDrawer={this.toggleDrawer} drawerStatus={this.props.drawerStatus}  />}
            </div>
        );
    }
}
const mapStateToProps = state => {
    return ({
        classStandingsLabels : _.map(state.classStandings, "_id"),
        classStandingsValues: _.map(state.classStandings, "total"),
        ethnicitiesLabels : _.map(state.ethnicities, "_id"),
        ethnicitiesValues: _.map(state.ethnicities, "total"),
        dateGroups: state.dateGroups,
        dailyUsers: state.dailyUsers,
        drawerStatus: state.handleDrawer
    });
}




export default connect(mapStateToProps, {fetchUsers, fetchClassStandings, fetchDateGroups, fetchEthnicityGroups, fetchDailyUsers, handleDrawer}) (Dashboard);