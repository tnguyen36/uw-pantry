import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import DashHeader from '../DashHeader';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import Table from '../Table';
import AddIcon from '@material-ui/icons/Add';
import InputAdornment from '@material-ui/core/InputAdornment';
import RemoveIcon from '@material-ui/icons/Remove';
import {renderColumns, action} from '../../columns/inventoryColumn';
import Button from '@material-ui/core/Button';
import LineGraph from '../LineGraph';
import { getDataSet, getTotalDataSet } from '../../columns/inventoryLineGraph';


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

function validWeight(props, weight, setWeight, operator, name, setName, overallBalance) {
    const weightString = weight.toString();
    const currentWeight = (operator === '+' ? Number(overallBalance) + Number(weight) : Number(overallBalance) - Number(weight));
    if (weightString !== "" && weightString !== "." && weightString.indexOf('.') === weightString.lastIndexOf('.')) {
        props.submitInventoryPost(weight, operator, name, currentWeight); 
        setWeight("");
        setName("");
    } else {
        setWeight("");
        setName("");
    }
}

function getOverallBalance(props) {
    var positive = 0;
    var negative = 0;
    for (var i = 0; i < props.inventoryPosts.length; i++) {
        if (props.inventoryPosts[i].operator === '+') {
            positive += props.inventoryPosts[i].weight;
        } else {
            negative += props.inventoryPosts[i].weight
        }
    }
    return (positive - negative).toFixed(2);
}

const InventoryContent = (props) => {
    const classes = useStyles();
    const overallBalance= getOverallBalance(props);
    const [operator, setOperator] = React.useState("+");
    const [weight, setWeight] = React.useState("");
    const [name, setName] = React.useState("");
    return (
        <div className={classes.root}>
            <DashHeader toggleDrawer={props.toggleDrawer} drawerStatus={props.drawerStatus} title={"Inventory"} />
            <main className={classes.content} onClick={() => props.toggleDrawer(true)}>
                <div className={classes.appBarSpacer} />
                    <Container maxWidth="lg" className={classes.container}>
                      <Grid container spacing={3} direction="row">
                      
                        <Grid item md={7} lg={6}>                      
                    <Paper className={classes.root}>
                      <IconButton className={classes.iconButton} onClick={() => operator === '+' ? setOperator("-") : setOperator("+")}>
                        {operator === '+' ? <AddIcon className={classes.add} /> : <RemoveIcon className={classes.subtract} />}
                      </IconButton>
                      <InputBase
                        className={classes.input}
                        placeholder="Enter Weight"
                        inputProps={{ 'aria-label': 'search google maps' }}
                        type="number"
                        endAdornment={<InputAdornment position="end">lb</InputAdornment>}
                        onChange={(event) => setWeight(event.target.value)}
                        value={weight}
                      />
                      <Divider className={classes.divider} orientation="vertical" />
                      <InputBase
                        className={classes.input}
                        placeholder="Enter Name (Optional)"
                        inputProps={{ 'aria-label': 'search google maps' }}
                        type="text"
                        onChange={(event) => setName(event.target.value)}
                        value={name}
                      />
                        <div style={{padding: '10px'}}>
                          <Button className={classes.submit} variant="contained" onClick={() => validWeight(props, weight, setWeight, operator, name, setName, overallBalance)}>Submit</Button>
                        </div>
                    </Paper> 
                    </Grid>
                    <Grid item lg={4}>
                        <h1 style={{margin: '10px', color: '#4b2e83'}}>Current Weight: {overallBalance} lb</h1>
                        </Grid>
                   
                    <Grid item xs={12}>
                      <LineGraph dateGroups={props.inventoryPosts} getDataSet={getTotalDataSet} title="Overall Weight Trend" tooltipLabel="M/d, h:mm tt" yaxisLabel="Pound (lb)" dataSetLabel="Current Weight" lineColor="#4b2e83" />
                    </Grid>
                    <Grid item xs={6}>
                      <LineGraph dateGroups={props.positiveDaily} getDataSet={getDataSet} title={"Incoming Donation - " + (new Date().getMonth() + 1) + '/' + new Date().getFullYear()} tooltipLabel="MMMM d yyyy" yaxisLabel="Pound (lb)" dataSetLabel="Total Weight Gain" lineColor="#32CD32" />
                    </Grid>
                    <Grid item xs={6}>
                      <LineGraph dateGroups={props.negativeDaily} getDataSet={getDataSet} title={"Outgoing Inventory - " + (new Date().getMonth() + 1) + '/' + new Date().getFullYear()} tooltipLabel="MMMM d yyyy" yaxisLabel="Pound (lb)" dataSetLabel="Total Weight Loss" lineColor="#ff0000" />
                    </Grid>                   
                    <Grid item lg={12}>
                      <Table data={props.inventoryPosts} renderColumns={renderColumns} title="History Log" action={action} actionButtonLabel="Delete" deletePosts={props.deletePosts} />
                    </Grid>
                    </Grid>
                    
                   
                    </Container>
            </main>
        </div>
    );
}

export default InventoryContent;