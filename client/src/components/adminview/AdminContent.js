import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import LineGraph from './LineGraph';
import StatCard from './StatCard';
import Paper from '@material-ui/core/Paper';
import DashHeader from './DashHeader';
import PieChart from './PieChart';
import { getDataSet} from '../columns/userLineGraph';


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
  fixedHeightChart: {
    height: 350,
  },
  fixedHeightStat: {
    height: 120,
    boxShadow: '1px 2px 4px rgba(0, 0, 0, .5)',
    borderRadius: '5%'
    
  },
  fixedHeightLine: {
    height: 620
  },
  quarterTitle: {
    display: 'inline-block',
    color: '#4b2e83',
    marginRight: '1rem',
    marginTop: 0
  }
}));

function getDailyWeight(props, day) {
  const result = props.filter(post => (post.day === day));
 
  if (result.length === 0) {
    return [0];
  } else {
    return [result[0].sum];
  }
}

const AdminContent = (props) => {
    const classes = useStyles();
    const day = new Date().getDate();
    const weightGain = getDailyWeight(props.positiveDaily, day);
    const weightLoss = getDailyWeight(props.negativeDaily, day);
    const fixedHeightStat = clsx(classes.paper, classes.fixedHeightStat);
    return (
      <div className={classes.root}>
      <DashHeader toggleDrawer={props.toggleDrawer} drawerStatus={props.drawerStatus} title={"Dashboard"} />
      <main className={classes.content} onClick={() => props.toggleDrawer(true)}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3} direction="row">
          <Grid className={classes.background} item xs={6} md={4} lg={3}>
            <Paper style={{backgroundImage: 'linear-gradient(230deg, #759bff, #843cf6)'}} className={fixedHeightStat}>
            <StatCard values={props.classStandingsValues} label="Total New Users" type="user" />
            </Paper>
            </Grid>
            <Grid className={classes.background} item xs={6} md={4} lg={3}>
              <Paper style={{backgroundImage: 'linear-gradient(230deg, #fc5286, #fbaaa2)'}} className={fixedHeightStat}>
            <StatCard label="Daily New Users" values={props.dailyUsers} type="user" />
              </Paper>
            </Grid>
            <Grid className={classes.background} item xs={6} md={4} lg={3}>
              <Paper style={{backgroundImage: 'linear-gradient(230deg, #ffc480, #ff763b)'}} className={fixedHeightStat}>
            <StatCard label="Daily Weight Gain" values={weightGain} type="weight"/>
              </Paper>
            </Grid>
            <Grid className={classes.background} item xs={6} md={4} lg={3}>
              <Paper style={{backgroundImage: 'linear-gradient(230deg, #0e4cfd, #6a8eff)'}} className={fixedHeightStat}>
            <StatCard label="Daily Weight Loss" values={weightLoss} type="weight" />
              </Paper>
            </Grid>

            <Grid className={classes.background} item xs={12} md={5} lg={6}>
              {/* <Paper className={fixedHeightPaper}> */}
            <PieChart labels={props.classStandingsLabels} values={props.classStandingsValues} text="Class Standings" />
              {/* </Paper> */}
            </Grid>
            
            <Grid className={classes.background} item xs={12} md={5} lg={6}>
              
            <PieChart labels={props.ethnicitiesLabels} values={props.ethnicitiesValues} text="Ethnicities"/>
              
            </Grid>
            <Grid className={classes.background} item xs={12} md={5} lg={12}>
              {/* <Paper className={fixedHeightLine}> */}
              <LineGraph dateGroups={props.dateGroups} getDataSet={getDataSet} title={"Number of New Users by Month - " + new Date().getFullYear()} tooltipLabel="MMMM yyyy" yaxisLabel="# of Students" lineColor="#4b2e83" />
              {/* </Paper> */}
            </Grid>
            
            
           
            </Grid>
        </Container>
    </main>
       
      </div>  
    )
}

export default AdminContent;