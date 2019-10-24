import React from 'react';
import { forwardRef } from 'react';
import MaterialTable from 'material-table';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Search from '@material-ui/icons/Search';
import SaveAlt from '@material-ui/icons/SaveAlt';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import Clear from '@material-ui/icons/Clear';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import moment from 'moment';
import { makeStyles, createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import AddIcon from '@material-ui/icons/Add';


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

const actionButton = (classes) => {
    return (
        <p className={classes.actionButton}>Transfer</p>
    );
}

const Table = (props) => {   
    const classes = useStyles();          
        return (
            <MuiThemeProvider theme={theme}>
            <MaterialTable
                title="User Table"
                columns={[
                    {title: 'Status', field: 'status', render: rowData => <Chip label={rowData.status} className={rowData.status === 'Pending' ? classes.pending : classes.completed} size="small" />},
                    {title: 'First Name', field: 'firstName'},
                    {title: 'Last Name', field: 'lastName'},
                    {title: 'Student ID', field: 'id'},
                    {title: 'Birthdate', field: 'birthDate', render: rowData => moment(rowData.birthDate).format("MM/DD/YY")},
                    {title: 'Address', field: 'address', render: rowData => rowData.address + ' ' + rowData.city + ' ' + rowData.zipCode},
                    {title: 'Ethnicity', field: 'ethnicity'},
                    {title: 'Class Standing', field: 'classStanding'},
                    {title: 'Military', field: 'military'}
                ]}
                data={props.users}
                icons={iconsList()}
                options={{
                    exportButton: true,
                    selection: true,
                    headerStyle: {
                        fontWeight: 'bold',

                    }
                }}
                detailPanel={rowData => {
                    
                    return rowData.members.map((link, index) => {
                        return (
                            
                            <div key={index}>
                              <h4>{`${index + 1}. ${link.firstName} ${link.race} ${moment(link.birthDate).format("MM/DD/YY")}`}</h4>
                            </div>                          
                        );                  
                })}}
                actions={[
                    {
                        tooltip: 'Transfer User',
                        icon: () => actionButton(classes),
                        onClick: (evt, data) => props.transferUser(data)
                    }
                ]}
                />
                </MuiThemeProvider>
        )}
    


export default Table;