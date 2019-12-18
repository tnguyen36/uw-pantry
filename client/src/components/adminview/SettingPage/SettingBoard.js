import React from 'react';
import { connect } from 'react-redux';
import { handleDrawer } from '../../../actions';
import SettingContent from './SettingContent';
import axios from 'axios';
import { Helmet } from 'react-helmet';

class SettingBoard extends React.Component {
    state = {accessCode: ''};

    componentDidMount() {
        this.getAccessCode();
    }

    toggleDrawer = (drawerStatus) => {
        this.props.handleDrawer(drawerStatus);
    }

    getAccessCode = async () => {
        const response = await axios.get('/admin/code');
        this.setState({accessCode: response.data.accessCode})
    }

    changeAccessCode = async newCode => {
        const code = {accessCode: newCode};
        await axios.post("/admin/code", code);
        this.setState({accessCode: newCode});
    }

    render() {
        return (
            <div>
                <Helmet>
                    <title>Settings</title>
                </Helmet>
                <SettingContent drawerStatus={this.props.drawerStatus} toggleDrawer={this.toggleDrawer} code={this.state.accessCode} changeAccessCode={this.changeAccessCode} />
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        drawerStatus: state.handleDrawer, 
    }
}

export default connect(mapStateToProps, {handleDrawer}) (SettingBoard);