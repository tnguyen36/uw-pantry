import React from 'react';
import DashHeader from '../DashHeader';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Table from '../Table';
import Grid from '@material-ui/core/Grid';
import {action, renderColumns, renderReturningUserColumns, detailPanel, returningUserDetailPanel} from '../../columns/orderColumn';

const useStyles = makeStyles(theme => ({
    root: {
    	display: 'flex',
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
      	flexGrow: 1,
     	height: '100vh',
      	overflow: 'auto',
    },
    container: {
      	paddingTop: theme.spacing(11),
      	paddingBottom: theme.spacing(4),
    },
}));

function filterUsers(users) {
    var result = [];
    if (users && users.length !== 0) {
        for (var i = 0; i < users.length; i++) {
            if (users[i].orderPost.length !== 0) {
                result.push(users[i])
            }
        }
    }
    return result;
}

const OrderContent = props => {
    const classes = useStyles();
    var users = filterUsers(props.users);
    return (
            <div className={classes.root}>
            <DashHeader toggleDrawer={props.toggleDrawer} drawerStatus={props.drawerStatus} title="Online Order" />
            <main className={classes.content} onClick={() => props.toggleDrawer(true)}>
            <div className={classes.appBarSpacer} />
                <Container maxWidth="lg" className={classes.container}>
                    <Grid container spacing={10}>

                            <Grid item xs={12} md={8} lg={12}>        
                                <Table 
                                    data={users} 
                                    transferUser={props.processOrder} 
                                    renderColumns={renderColumns} 
                                    detailPanel={detailPanel} 
                                    title="New User Order Details" 
                                    action={action} 
                                    actionButtonLabel="Process"
                                />       
                            </Grid>
                            <Grid item xs={12} md={8} lg={12}>              
                                <Table 
                                    data={props.returningUsers} 
                                    transferUser={props.processReturningUserOrder} 
                                    renderColumns={renderReturningUserColumns} 
                                    detailPanel={returningUserDetailPanel} 
                                    title="Returning User Order Details" 
                                    action={action} 
                                    actionButtonLabel="Process"
                                />       
                            </Grid>
                        </Grid>
                </Container>
            </main>
            </div>
        
    )
}

export default OrderContent;