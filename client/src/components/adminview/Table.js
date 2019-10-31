import React from 'react';
import { forwardRef } from 'react';
import MaterialTable, { MTableToolbar } from 'material-table';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Search from '@material-ui/icons/Search';
import SaveAlt from '@material-ui/icons/SaveAlt';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import Clear from '@material-ui/icons/Clear';
import { makeStyles, createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import '../../style.css';




const useStyles = makeStyles(theme => ({
    tableBorder: {
        outline: '10px double aliceblue'
    },
    actionButton: {
        padding: '10px',
        margin: 0,
        fontSize: '18px',
        backgroundImage: '-webkit-radial-gradient(left bottom,rgba(159,88,150,0) 0,rgba(159,88,150,0.6) 100%)',
        backgroundColor: '#3f51b5',
        color: 'white',
        borderRadius: '7%'
    },
    pending: {
        backgroundColor: 'red',
        color: 'white'
    },
    completed: {
        backgroundColor: 'green',
        color: 'white'
    },
    addition: {
        color: 'green',
        margin: 0,
        fontWeight: 'bold',
        fontSize: '18px'
    },
    subtraction: {
        color: 'red',
        margin: 0,
        fontWeight: 'bold',
        fontSize: '18px'
    }
}));

const theme = createMuiTheme({
    palette: {
        secondary: {
            main: '#6e48aa',
        },
    },
});

const iconsList = () => {
    return {
        FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
        LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
        NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
        PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
        Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
        Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
        SortArrow: forwardRef((props, ref) => <ArrowUpward {...props} ref={ref} />),
        ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
        DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
        
    }
}

const actionButton = (classes, props) => {
    return (
        <p className={classes.actionButton}>{props.actionButtonLabel}</p>
    );
}

const Table = (props) => {   
    const classes = useStyles();          
        return (
            <MuiThemeProvider theme={theme}>
            <MaterialTable
                title={props.title}
                columns={props.renderColumns(classes)}
                data={props.data}
                components={{
                    Toolbar: props => (
                        <div style={{backgroundColor: '#4b2e83', color: 'white'}}>
                            <MTableToolbar {...props}/>
                        </div>
                    )
                }}
                icons={iconsList()}
                options={{
                    exportButton: true,
                    selection: true,
                    headerStyle: {
                        fontWeight: 800,
                        color: '#4b2e83'
                        
                    },
                    searchFieldStyle: {
                        backgroundColor: 'white',
                        paddingLeft: '5px',
                        
                    }
                }}
                detailPanel={!props.detailPanel ? false : (rowData) => props.detailPanel(rowData)}
                actions={props.action(props, classes, actionButton)}
                />
                </MuiThemeProvider>
        )}
    


export default Table;