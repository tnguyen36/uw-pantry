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
      margin: 0
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
  console.log(startDate);
  console.log(endDate);
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
  var result = {avg: 0, min: 0, max: 0};
  if (users && users.length !== 0) {
    var max = users.reduce((a, b) => Math.max(a, b));
    var min= users.reduce((a, b) => Math.min(a, b));
    var avg = (users.reduce((a, b) => a + b) / users.length).toFixed(2);    
    result.avg = avg;  
    result.min = min;
    result.max = max;
    return result;
  }
  return result;
}

function getInventoryStats(posts) {
  var maxPositive = 0;
  var maxNegative = 0;
  var minPositive = Number.POSITIVE_INFINITY;
  var minNegative = Number.POSITIVE_INFINITY;
  if (posts && posts.length !== 0) {
    for (var i = 0; i < posts.length; i++) {
      if (posts[i].operator === '+' && posts[i].weight > maxPositive) {
        maxPositive = posts[i].weight;
      } else if (posts[i].operator === '+' && posts[i].weight < minPositive) {
        minPositive = posts[i].weight;
      } else if (posts[i].operator === '-' && posts[i].weight > maxNegative) {
        maxNegative = posts[i].weight;
      } else {
        minNegative = posts[i].weight;
      }
    }
    if (minPositive === Number.POSITIVE_INFINITY) {
      minPositive = 0
    }  
    if (minNegative === Number.POSITIVE_INFINITY) {
      minNegative = 0;
    }
    return {maxPositive, minPositive, maxNegative, minNegative}
    
  }
  minPositive = 0;
  minNegative = 0;
  return {maxPositive, minPositive, maxNegative, minNegative}
}

const ReportContent = props => {
    const classes = useStyles();
    const [startDate, setStartDate] = React.useState(moment());
    const [endDate, setEndDate] = React.useState(moment());
    const [initialData, toggleInitialData] = React.useState(true);
    const result = getHouseHoldStats(props.user);
    const inventoryResult = getInventoryStats(props.inventoryPosts);
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
                                                       
                               <PieChart labels={props.classStandingsLabels} values={props.classStandingsValues} text="Class Standings" /> 
                           <PieChart labels={props.ethnicitiesLabels} values={props.ethnicitiesValues} text="Ethnicities" /> 
                            
                                                 
                       </Grid>
                       <Grid item sm={6} lg={6}>
                         
                            <h2 className={classes.statTitle} >User Stats</h2>
                          <p className={classes.statDescription}>Total New Users <span className={classes.statLabel}>{getTotalUsers(props.classStandingsValues)}</span></p>
                          <hr></hr>
                          <h2 className={classes.statTitle}>Household Stats</h2>
                          <p className={classes.statDescription}>Average Household Count <span className={classes.statLabel}>{initialData ? 0 : result.avg}</span></p>
                          <p className={classes.statDescription}>Lowest Household Count <span className={classes.statLabel}>{initialData ? 0 : result.min}</span></p>
                          <p className={classes.statDescription}>Highest Household Count <span className={classes.statLabel}>{initialData ? 0 : result.max}</span></p>
                          <hr></hr>
                          <h2 className={classes.statTitle}>Inventory Stats</h2>
                          <p className={classes.statDescription}>Lowest Donation <span className={classes.statLabel}>{inventoryResult.minPositive}</span></p>
                          <p className={classes.statDescription}>Highest Donation <span className={classes.statLabel}>{inventoryResult.maxPositive}</span></p>
                          <p className={classes.statDescription}>Lowest Outgoing Loss<span className={classes.statLabel}>{inventoryResult.minNegative}</span></p>
                          <p className={classes.statDescription}>Highest Outgoing Loss <span className={classes.statLabel}>{inventoryResult.maxNegative}</span></p>                                                             
                       </Grid>
                   </Grid>
                   </Paper>
                </Container>

            </main>
        </div>
    )
}

export default ReportContent;