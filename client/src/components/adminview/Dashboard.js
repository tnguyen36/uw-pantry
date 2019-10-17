import React from 'react';
import AdminContent from './AdminContent';
import { connect } from 'react-redux';
import { fetchUsers, fetchClassStandings, fetchDateGroups } from '../../actions';
import _ from 'lodash';


class Dashboard extends React.Component {
    
    componentDidMount() {
        this.props.fetchClassStandings();
        this.props.fetchDateGroups();
    }

    render() {
        if (!this.props.classStandingsLabels || !this.props.classStandingsValues || !this.props.dateGroups) {
            return <div>Loading</div>
        } 
        return(
            <div>
                <AdminContent classStandingsLabels={this.props.classStandingsLabels} classStandingsValues={this.props.classStandingsValues} dateGroups={this.props.dateGroups}  />
            </div>
        );
    }
}
const mapStateToProps = state => {
    return ({
        classStandingsLabels : _.map(state.classStandings, "_id"),
        classStandingsValues: _.map(state.classStandings, "total"),
        dateGroups: state.dateGroups
    });
}




export default connect(mapStateToProps, {fetchUsers, fetchClassStandings, fetchDateGroups}) (Dashboard);