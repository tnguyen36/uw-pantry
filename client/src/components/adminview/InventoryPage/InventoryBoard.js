import React from 'react';
import InventoryContent from './InventoryContent';
import { connect } from 'react-redux';
import { handleDrawer, createInventoyPost, fetchInventoryPosts, deleteInventoryPost, fetchPositiveDailyInventory, fetchNegativeDailyInventory } from '../../../actions';


class InventoryBoard extends React.Component {

    componentDidMount() {
        this.props.fetchInventoryPosts();
        this.props.fetchPositiveDailyInventory();
        this.props.fetchNegativeDailyInventory();
    }

    toggleDrawer = (drawerStatus) => {
        this.props.handleDrawer(drawerStatus);
    }

    deletePosts = (posts) => {
        this.props.deleteInventoryPost(posts);
        this.props.fetchPositiveDailyInventory();
    }

    submitInventoryPost = (weight, operator) => {
        this.props.createInventoyPost(weight, operator);
        this.props.fetchPositiveDailyInventory();
    }

    render() {
        if (!this.props.positiveDaily || !this.props.negativeDaily) {
            return <div>Loading</div>
        } else {
            return (
                <div>
                    <InventoryContent toggleDrawer={this.toggleDrawer} drawerStatus={this.props.drawerStatus} submitInventoryPost={this.submitInventoryPost} inventoryPosts={this.props.inventoryPosts} deletePosts={this.deletePosts} positiveDaily={this.props.positiveDaily} negativeDaily={this.props.negativeDaily} />
                </div>
            );
        }
    }
}

const mapStateToProps = state => {
    return {
        drawerStatus: state.handleDrawer,
        inventoryPosts: Object.values(state.inventory),
        positiveDaily: state.positiveDaily,
        negativeDaily: state.negativeDaily
    }
}

export default connect(mapStateToProps, {handleDrawer, createInventoyPost, fetchInventoryPosts, deleteInventoryPost, fetchPositiveDailyInventory, fetchNegativeDailyInventory}) (InventoryBoard);