import React from 'react';
import { connect } from 'react-redux';
import { createUser } from '../actions';
import { BrowserRouter, Route } from 'react-router-dom';
import FormWizard from './FormWizard';
import SignInPage from './studentlogin/SignInPage';
import Dashboard from './adminview/Dashboard';
import CustomerBoard from './adminview/CustomerPage/CustomerBoard';
import InventoryBoard from './adminview/InventoryPage/InventoryBoard';

import '../style.css';


class App extends React.Component {
    render() {
        return (
            <div>
                
                <BrowserRouter>
                    <div>
                        {/* <Header /> */}
                        <Route path="/" exact component={FormWizard}/>
                        <Route path="/login" exact component={SignInPage}/>
                        <Route path="/dashboard" exact component={Dashboard}/>
                        <Route path="/dashboard/customers" component={CustomerBoard}/>
                        <Route path="/dashboard/inventory" component={InventoryBoard}/>
                    </div>
                
                </BrowserRouter>
               

                {/* <SignInPage /> */}
                {/* <Dashboard /> */}

                
            </div>
        );
    }
}



export default connect(null, {createUser})(App);