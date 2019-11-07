import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import DashHeader from '../DashHeader';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import {MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

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
    input: {
      marginLeft: theme.spacing(1),
      flex: 1,
    },
    iconButton: {
      padding: 5,
    },
    divider: {
      height: 45,
      margin: 4,
      marginLeft: 10
    },
    add: {
      color: 'white',
      fontSize: '30px',
      backgroundColor: 'green',
      marginLeft: '5px'
    },
    subtract: {
      color: 'white',
      fontSize: '30px',
      backgroundColor: 'red',
      marginLeft: '5px'
    },
    submit: {
      backgroundColor: '#3f51b5',
      backgroundImage: '-webkit-radial-gradient(left bottom,rgba(159,88,150,0) 0,rgba(159,88,150,0.6) 100%)',
      color: 'white'
    }
  }));

const ReportContent = props => {
    const classes = useStyles();
    const [startDate, setStartDate] = React.useState(new Date().now);
    const [endDate, setEndDate] = React.useState(new Date().now);
    return (
        <div className={classes.root}>
            <DashHeader toggleDrawer={props.toggleDrawer} drawerStatus={props.drawerStatus} title={"Summary Report"} />
            <main className={classes.content} onClick={() => props.toggleDrawer(true)}>
                <div className={classes.appBarSpacer} />
                <Container maxWidth="lg" className={classes.container}> 
                   <Grid container spacing={3} direction="row">
                     <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <KeyboardDatePicker
                        disableToolbar
                        variant="inline"
                        format="MM/dd/yyyy"
                        margin="normal"               
                        label="Start Date"
                        value={startDate}
                        onChange={(date) => setStartDate(date)}
                      />
                      <KeyboardDatePicker
                        disableToolbar
                        variant="inline"
                        format="MM/dd/yyyy"
                        margin="normal"                   
                        label="End Date"
                        value={endDate}
                        onChange={(date) => setEndDate(date)}
                      />
                      </MuiPickersUtilsProvider>
                       <Grid item xs={12}>
                           <Paper>
                               <h1>Summary Report</h1>
                           </Paper>
                       </Grid>
                   </Grid>
                </Container>

            </main>
        </div>
    )
}

export default ReportContent;