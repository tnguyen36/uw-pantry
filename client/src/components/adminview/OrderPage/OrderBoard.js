import React from 'react';
import OrderContent from './OrderContent';
import { connect } from 'react-redux';
import { handleDrawer, fetchUsers, processOrder, fetchReturningUsers, processReturningUserOrder } from '../../../actions';
import { socket } from '../../../socket';
import { Helmet } from 'react-helmet';

class OrderBoard extends React.Component {

    componentDidMount() {
        this.props.fetchUsers();
        this.props.fetchReturningUsers();
        socket.on('change_data', this.changeData);
    }

    changeData = () => {
        this.props.fetchUsers();
        this.props.fetchReturningUsers();
    }

    toggleDrawer = (drawerStatus) => {
        this.props.handleDrawer(drawerStatus);
    }

    processOrder = (users) => {
        this.props.processOrder(users);
   }

   processReturningUserOrder = (users) => {
        this.props.processReturningUserOrder(users);
   }

    render() {
        return (
            <div>
                <Helmet>
                    <title>Online Order</title>
                </Helmet>
                <OrderContent 
                    toggleDrawer={this.toggleDrawer} 
                    drawerStatus={this.props.drawerStatus} 
                    processOrder={this.processOrder}  
                    users={this.props.users}
                    returningUsers={this.props.returningUsers}
                    processReturningUserOrder={this.processReturningUserOrder}
                />
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        drawerStatus: state.handleDrawer,
        users: Object.values(state.users),
        returningUsers: Object.values(state.returningUsers)
    }
}

export default connect(mapStateToProps, {handleDrawer, fetchUsers, processOrder, fetchReturningUsers, processReturningUserOrder}) (OrderBoard);