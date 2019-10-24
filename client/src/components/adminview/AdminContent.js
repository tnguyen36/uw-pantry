import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import PieChart from './PieChart';
import LineGraph from './LineGraph';
import StatCard from './StatCard';
import Paper from '@material-ui/core/Paper';
import DashHeader from './DashHeader';



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
    outline: '1px ridge black',
    boxShadow: '6px 11px 41px -28px #a99de7',
    
  },
  fixedHeightLine: {
    height: 620
  },
}));

const AdminContent = (props) => {
    const classes = useStyles();
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeightChart);
    const fixedHeightStat = clsx(classes.paper, classes.fixedHeightStat);
    const fixedHeightLine = clsx(classes.paper, classes.fixedHeightLine);
   
    return (
      <div className={classes.root}>
      <DashHeader toggleDrawer={props.toggleDrawer} drawerStatus={props.drawerStatus} title={"Dashboard"} />
      <main className={classes.content} onClick={() => props.toggleDrawer(true)}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3} direction="row">
          <Grid className={classes.background} item xs={6} md={4} lg={3}>
            <Paper style={{backgroundImage: 'linear-gradient(230deg, #759bff, #843cf6)'}} className={fixedHeightStat}>
            <StatCard values={props.classStandingsValues} label={"Total Users"} />
            </Paper>
            </Grid>
            <Grid className={classes.background} item xs={6} md={4} lg={3}>
              <Paper style={{backgroundImage: 'linear-gradient(230deg, #fc5286, #fbaaa2)'}} className={fixedHeightStat}>
            <StatCard label={"Daily Users"} values={props.dailyUsers} />
              </Paper>
            </Grid>
            <Grid className={classes.background} item xs={6} md={4} lg={3}>
              <Paper style={{backgroundImage: 'linear-gradient(230deg, #ffc480, #ff763b)'}} className={fixedHeightStat}>
            <StatCard label={"Daily Weight Gain"} />
              </Paper>
            </Grid>
            <Grid className={classes.background} item xs={6} md={4} lg={3}>
              <Paper style={{backgroundImage: 'linear-gradient(230deg, #0e4cfd, #6a8eff)'}} className={fixedHeightStat}>
            <StatCard label={"Daily Weight Loss"} />
              </Paper>
            </Grid>

            <Grid className={classes.background} item xs={12} md={5} lg={6}>
              <Paper className={fixedHeightPaper}>
            <PieChart labels={props.classStandingsLabels} values={props.classStandingsValues} text="Class Standings" />
              </Paper>
            </Grid>
            
            <Grid className={classes.background} item xs={12} md={5} lg={6}>
              <Paper className={fixedHeightPaper}>
            <PieChart labels={props.ethnicitiesLabels} values={props.ethnicitiesValues} text="Ethnicities"/>
              </Paper>
            </Grid>
            <Grid className={classes.background} item xs={12} md={5} lg={12}>
              <Paper className={fixedHeightLine}>
              <LineGraph dateGroups={props.dateGroups} />
              </Paper>
            </Grid>
            
            
           
            </Grid>
        </Container>
    </main>
       
      </div>  
    )
}

export default AdminContent;