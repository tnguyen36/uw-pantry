import React from 'react';
import AdminContent from './AdminContent';
import { connect } from 'react-redux';
import { fetchUsers } from '../../actions';

class Dashboard extends React.Component {
    componentDidMount() {
        this.props.fetchUsers();
    }

    render() {
        if (!this.props.users) {
            return <div>Loading</div>
        } 
        return(
            <div>
                <AdminContent userList={this.props.users[0]} />
            </div>
        );
    }
}
const mapStateToProps = state => {
    return ({
        users: state.users
    });
}


export default connect(mapStateToProps, {fetchUsers}) (Dashboard);