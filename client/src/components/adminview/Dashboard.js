import React from 'react';
import AdminContent from './AdminContent';
import { connect } from 'react-redux';
import { fetchUsers, fetchClassStandings } from '../../actions';
import _ from 'lodash';

class Dashboard extends React.Component {
    componentDidMount() {
        this.props.fetchClassStandings();
    }

    render() {
        if (!this.props.classStandingsLabels || !this.props.classStandingsValues) {
            return <div>Loading</div>
        } 
        return(
            <div>
                <AdminContent classStandingsLabels={this.props.classStandingsLabels} classStandingsValues={this.props.classStandingsValues}  />
            </div>
        );
    }
}
const mapStateToProps = state => {
    return ({
        classStandingsLabels : _.map(state.classStandings, "_id"),
        classStandingsValues: _.map(state.classStandings, "total")
    });
}


export default connect(mapStateToProps, {fetchUsers, fetchClassStandings}) (Dashboard);