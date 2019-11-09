import React from 'react';
import DashHeader from '../DashHeader';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Table from '../Table';
import Grid from '@material-ui/core/Grid';
import {renderColumns, detailPanel, action} from '../../columns/userColumn';

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

const CustomerContent = (props) => {
    const classes = useStyles(); 
    return (
        <div className={classes.root}>
            <DashHeader toggleDrawer={props.toggleDrawer} drawerStatus={props.drawerStatus} title={"Customers"} />
            <main className={classes.content} onClick={() => props.toggleDrawer(true)}>
            <div className={classes.appBarSpacer} />
                <Container maxWidth="lg" className={classes.container}>
                    <Grid container>
						<Grid item xs={12} md={8} lg={12}>              
							<Table 
								data={props.users} 
								transferUser={props.transferUser} 
								renderColumns={renderColumns} 
								detailPanel={detailPanel} 
								title="New User Details" 
								action={action} 
								actionButtonLabel="Transfer"
							/>       
						</Grid>
                    </Grid>
                </Container>
            </main>            
        </div>
    )
}

export default CustomerContent