import React from 'react';
import CustomerContent from './CustomerContent';
import { connect } from 'react-redux';
import { handleDrawer, fetchUsers, transferUser } from '../../../actions';





class CustomerBoard extends React.Component {

    componentDidMount() {
        this.props.fetchUsers();
    }


    toggleDrawer = (drawerStatus) => {
        this.props.handleDrawer(drawerStatus);
    }

    transferUser = (users) => {
        this.props.transferUser(users);
    }

    render() {
        return (
            <div>
                <CustomerContent toggleDrawer={this.toggleDrawer} drawerStatus={this.props.drawerStatus} users={this.props.users} transferUser={this.transferUser} />
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        drawerStatus: state.handleDrawer,
        users: Object.values(state.users)
    }
    
}

export default connect(mapStateToProps, { handleDrawer, fetchUsers, transferUser}) (CustomerBoard);