import React from 'react';
import InventoryContent from './InventoryContent';
import { connect } from 'react-redux';
import { handleDrawer } from '../../../actions';

class InventoryBoard extends React.Component {

    toggleDrawer = (drawerStatus) => {
        this.props.handleDrawer(drawerStatus);
    }


    render() {
        return (
            <div>
                <InventoryContent toggleDrawer={this.toggleDrawer} drawerStatus={this.props.drawerStatus} />
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        drawerStatus: state.handleDrawer
    }
}

export default connect(mapStateToProps, {handleDrawer}) (InventoryBoard);