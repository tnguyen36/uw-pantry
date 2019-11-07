import React from 'react';
import { connect } from 'react-redux';
import { handleDrawer } from '../../../actions';
import ReportContent from './ReportContent';


class ReportBoard extends React.Component {
    toggleDrawer = (drawerStatus) => {
        this.props.handleDrawer(drawerStatus);
    }

    render() {
        return (
            <div>
                <ReportContent toggleDrawer={this.toggleDrawer} drawerStatus={this.props.drawerStatus} />
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        drawerStatus: state.handleDrawer
    }
}

export default connect(mapStateToProps, {handleDrawer})(ReportBoard);