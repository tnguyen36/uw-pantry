import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import DashHeader from '../DashHeader';

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
      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(4),
    },
    paper: {
      padding: theme.spacing(2),
      display: 'flex',
      overflow: 'auto',
      flexDirection: 'column',
    },
  }));

const InventoryContent = (props) => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <DashHeader toggleDrawer={props.toggleDrawer} drawerStatus={props.drawerStatus} title={"Inventory"} />
            <main className={classes.content} onClick={() => props.toggleDrawer(true)}>
                <div className={classes.appBarSpacer} />
                    <Container maxWidth="lg" className={classes.container}>
                        hi
                    </Container>
            </main>
        </div>
    );
}

export default InventoryContent;