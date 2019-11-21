import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import DashHeader from '../DashHeader';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import {MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { Button } from '@material-ui/core';
import moment from 'moment';
import PieChart from '../PieChart';
import _ from 'lodash';

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
    statLabel: {
      float: 'right',
      marginRight: '0.5rem'
    },
    statDescription: {
      marginLeft: '0.5rem'
    },
    statTitle: {
      margin: 0,
      color: '#4b2e83'
    },
    submit: {
      backgroundColor: '#3f51b5',
      backgroundImage: '-webkit-radial-gradient(left bottom,rgba(159,88,150,0) 0,rgba(159,88,150,0.6) 100%)',
      color: 'white',
      marginTop: '1.5rem',
      marginLeft: '1rem'
    }
  }));

function onSubmit(startDate, endDate, props) {
  startDate = startDate.startOf('day');
  endDate = endDate.endOf('day');
  props.getClassStandings(startDate, endDate)
}

function getTotalUsers(props) {
  var total = 0;
  if (typeof props !== 'undefined') {

      for (var i = 0; i < props.length; i++) {
          total += props[i];
      }
  }
  return total;
}

function getHouseHoldStats(users) {
  var avg = 0;
  if (users && users.length !== 0) {   
     avg = (users.reduce((a, b) => a + b) / users.length).toFixed(2);        
     return avg;
  }
  return avg;
}

function getAddressStats(users) {
  var result = {offCampus: 0, onCampus: 0};
  var court17 = '1717 Market St';
  if (users && users.length !== 0) {
    for (var i = 0; i < users.length; i++) {
      users[i].address.toUpperCase().includes(court17.toUpperCase()) ? result.onCampus += 1 : result.offCampus += 1;              
    }
  }
  return result;

}


function getInventoryStats(posts) {
  var max = 0;
  var maxDate = 'N/A';
  var minDate = 'N/A';
  var min = Number.POSITIVE_INFINITY;
  if (posts && posts.length !== 0) {
    for (var i = 0; i < posts.length; i++) {
      if (posts[i].sum > max) {
        max = posts[i].sum;
        maxDate = posts[i].date;
      }
      if (posts[i].sum < min) {
        min = posts[i].sum;
        minDate = posts[i].date
      }
     
    }
    return {max, min, maxDate, minDate}
  }
  min = 0;
  return {max, min, maxDate, minDate}
}

function filterUsers(users, startDate, endDate) {
  var result = [];
  if (users && users.length !== 0) {
    for (var i = 0; i < users.length; i++) {
      const registerDate = moment(users[i].registerDate)
      if (registerDate >= startDate && registerDate <= endDate) {
        result.push(users[i]);
      }
    }
    return result;
  }
  return result;
}

const ReportContent = props => {
    const classes = useStyles();   
    const [startDate, setStartDate] = React.useState(moment());
    const [endDate, setEndDate] = React.useState(moment());
    const [initialData, toggleInitialData] = React.useState(true);
    const users = filterUsers(props.users, startDate, endDate);
    const result = getHouseHoldStats(_.map(users, 'householdNumber'));
    const positiveInventoryResult = getInventoryStats(props.positiveDaily);
    const negativeInventoryResult = getInventoryStats(props.negativeDaily);
    const addressResult = getAddressStats(users);
    return (
        <div className={classes.root}>
            <DashHeader toggleDrawer={props.toggleDrawer} drawerStatus={props.drawerStatus} title={"Summary Report"} />
            <main className={classes.content} onClick={() => props.toggleDrawer(true)}>
                <div className={classes.appBarSpacer} />
                <Container maxWidth="lg" className={classes.container}> 
                   
                    
                     <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <KeyboardDatePicker
                        disableToolbar
                        variant="inline"
                        format="MM/dd/yyyy"
                        margin="normal"               
                        label="Start Date"
                        value={startDate}
                        onChange={(date) => setStartDate(moment(date))}
                      />
                      <KeyboardDatePicker
                        disableToolbar
                        variant="inline"
                        format="MM/dd/yyyy"
                        margin="normal"                   
                        label="End Date"
                        value={endDate}
                        onChange={(date) => setEndDate(moment(date))}
                      />
                      </MuiPickersUtilsProvider>
                      <Button className={classes.submit} onClick={() => {onSubmit(startDate, endDate, props); toggleInitialData(false)}}>Submit</Button>
                      <h1>Summary Report</h1>
                      <Paper>
                      <Grid container direction="row">                     
                       <Grid item sm={6} lg={6}>
                                                       
                               <PieChart labels={initialData ? ['N/A'] : props.classStandingsLabels} values={initialData ? [0] : props.classStandingsValues} text="Class Standings" /> 
                           <PieChart labels={initialData ? ['N/A'] : props.ethnicitiesLabels} values={initialData ? [0] : props.ethnicitiesValues} text="Ethnicities" /> 
                            
                                                 
                       </Grid>
                       <Grid item sm={6} lg={6}>
                         
                            <h2 className={classes.statTitle} >User Stats</h2>
                          <p className={classes.statDescription}>Total New Users <span className={classes.statLabel}>{initialData ? 0 : getTotalUsers(props.classStandingsValues)} users</span></p>
                          <hr></hr>
                          <h2 className={classes.statTitle}>Household Stats</h2>
                          <p className={classes.statDescription}>Average Household Count <span className={classes.statLabel}>{initialData ? 0 : result} people</span></p>
                          <p className={classes.statDescription}>On Campus Resident <span className={classes.statLabel}>{initialData ? 0 : addressResult.onCampus} students</span></p>
                          <p className={classes.statDescription}>Off Campus Resident <span className={classes.statLabel}>{initialData ? 0 : addressResult.offCampus} students</span></p>
                          <hr></hr>
                          <h2 className={classes.statTitle}>Inventory Stats</h2>
                          <p className={classes.statDescription}>Highest donation occured on <strong>{positiveInventoryResult.maxDate}</strong><span className={classes.statLabel}>{initialData ? 0 : positiveInventoryResult.max} lb</span></p>
                          <p className={classes.statDescription}>Lowest donation occured on <strong>{positiveInventoryResult.minDate}</strong><span className={classes.statLabel}>{initialData ? 0 : positiveInventoryResult.min} lb</span></p>
                          <p className={classes.statDescription}>Highest inventory loss occured on <strong>{negativeInventoryResult.maxDate}</strong><span className={classes.statLabel}>{initialData ? 0 : negativeInventoryResult.max} lb</span></p>
                          <p className={classes.statDescription}>Lowest inventory loss occured on <strong>{negativeInventoryResult.minDate}</strong><span className={classes.statLabel}>{initialData ? 0 : negativeInventoryResult.min} lb</span></p>
                                                                                    
                       </Grid>
                   </Grid>
                   </Paper>
                </Container>

            </main>
        </div>
    )
}

export default ReportContent;