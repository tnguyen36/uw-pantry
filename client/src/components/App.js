import React from 'react';
import { connect } from 'react-redux';
import { createUser, verifyToken } from '../actions';
import { Router, Route } from 'react-router-dom';
import FormWizard from './FormWizard';
import SignInPage from './studentlogin/SignInPage';
import Dashboard from './adminview/Dashboard';
import CustomerBoard from './adminview/CustomerPage/CustomerBoard';
import InventoryBoard from './adminview/InventoryPage/InventoryBoard';
import ReportBoard from './adminview/ReportPage/ReportBoard';
import OrderBoard from './adminview/OrderPage/OrderBoard';
import SettingBoard from './adminview/SettingPage/SettingBoard';
import Home from './Home';
import history from '../history';
import PrivateRoute from './PrivateRoute';
import CircularProgress from '@material-ui/core/CircularProgress';
import OnlineOrder from './orderContent/OnlineOrder';
import ReturnUserOrder from './orderContent/ReturnUserOrder';
import '../style.css';


class App extends React.Component {
    
    componentDidMount() {
        const token = localStorage.getItem('jwtToken');
        if (token || token !== '') {
            this.props.verifyToken(token);
        }
    }


    render() {
        if (this.props.isSignedIn.isSignedIn === true || this.props.isSignedIn.isSignedIn === false) {

        return (
            <div style={{height: '100%'}}>
                
                <Router history={history}>
                    <div style={{height: '100%'}}>
                        <Route path="/" exact component={Home}/>
                        <Route path="/register" exact component={FormWizard} />
                        <Route path="/login" exact component={SignInPage}/>
                        <Route path="/order/new" exact component={OnlineOrder} />
                        <Route path="/order/returning" exact component={ReturnUserOrder} />
                        <PrivateRoute path="/dashboard" exact component={Dashboard}/>
                        <PrivateRoute path="/dashboard/customers" exact component={CustomerBoard}/>
                        <PrivateRoute path="/dashboard/inventory" exact component={InventoryBoard}/>
                        <PrivateRoute path="/dashboard/report" exact component={ReportBoard}/>
                        <PrivateRoute path="/dashboard/order" exact component={OrderBoard}/>
                        <PrivateRoute path="/dashboard/setting" exact component={SettingBoard}/>
                    </div>               
                </Router>
               

                             
            </div>
        );
        } else {
            return <div><CircularProgress/></div>
        }
    }
}
const mapStateToProps = (state) => {
    return {
        isSignedIn: state.signIn,
    }
}



export default connect(mapStateToProps, {createUser, verifyToken})(App);