import React from 'react';
import AdminContent from './AdminContent';
import { connect } from 'react-redux';
import { fetchUsers, fetchClassStandings, fetchDateGroups, fetchEthnicityGroups, fetchDailyUsers, handleDrawer, fetchPositiveDailyInventory, fetchNegativeDailyInventory, offSnackBar } from '../../actions';
import _ from 'lodash';
import SnackBar from '../SnackBar';
import { socket } from '../../socket';


class Dashboard extends React.Component {
    
    componentDidMount() {
        this.props.fetchClassStandings();
        this.props.fetchDateGroups();
        this.props.fetchEthnicityGroups();
        this.props.fetchDailyUsers();
        this.props.fetchPositiveDailyInventory();
        this.props.fetchNegativeDailyInventory();
        socket.on('change_data', this.changeData);
    }

    componentWillUnmount() {
        socket.off('change_data');
    }

    toggleDrawer = (drawerStatus) => {
        this.props.handleDrawer(drawerStatus);
    }

    changeQuarter = () => {
        this.props.fetchClassStandings();
        this.props.fetchEthnicityGroups();
    }

    changeData = () => {
        this.props.fetchClassStandings();
        this.props.fetchDateGroups();
        this.props.fetchEthnicityGroups();
        this.props.fetchDailyUsers();
    }


    render() {
        if (!this.props.classStandingsLabels || (!this.props.classStandingsValues) || !this.props.dateGroups || !this.props.ethnicitiesLabels || !this.props.ethnicitiesValues) {
            return <div>Loading</div>
        } 
        return(
            <div>
                 <AdminContent 
                    ethnicitiesLabels={this.props.ethnicitiesLabels} 
                    ethnicitiesValues={this.props.ethnicitiesValues} 
                    classStandingsLabels={this.props.classStandingsLabels} 
                    classStandingsValues={this.props.classStandingsValues} 
                    dateGroups={this.props.dateGroups} 
                    dailyUsers={this.props.dailyUsers} 
                    toggleDrawer={this.toggleDrawer} 
                    drawerStatus={this.props.drawerStatus} 
                    changeQuarter={this.changeQuarter}
                    negativeDaily={this.props.negativeDaily}
                    positiveDaily={this.props.positiveDaily}  
                />
                {this.props.error.toggleSnackBar && <SnackBar offSnackBar={this.props.offSnackBar} variant={this.props.error.variant} description={this.props.error.description} />}
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
        drawerStatus: state.handleDrawer,
        positiveDaily: state.positiveDaily,
        negativeDaily: state.negativeDaily,
        error: state.error
    });
}




export default connect(mapStateToProps, {fetchUsers, fetchClassStandings, fetchDateGroups, fetchEthnicityGroups, fetchDailyUsers, handleDrawer, fetchPositiveDailyInventory, fetchNegativeDailyInventory, offSnackBar}) (Dashboard);