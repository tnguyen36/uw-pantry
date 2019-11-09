import React from 'react';
import CustomerContent from './CustomerContent';
import { connect } from 'react-redux';
import { handleDrawer, fetchUsers, transferUser } from '../../../actions';
import { socket } from '../../../socket';


class CustomerBoard extends React.Component {

    componentDidMount() {
        this.props.fetchUsers();
        socket.on('change_data', this.changeData)
    }

    componentWillUnmount() {
        socket.off('change_data');
    }

    toggleDrawer = (drawerStatus) => {
        this.props.handleDrawer(drawerStatus);
    }

    transferUser = (users) => {
         this.props.transferUser(users);
    }

    changeData = () => {
        this.props.fetchUsers();
    }

    render() {
        return (
            <div>
                <CustomerContent 
                    toggleDrawer={this.toggleDrawer} 
                    drawerStatus={this.props.drawerStatus} 
                    users={this.props.users} 
                    transferUser={this.transferUser} 
                />
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