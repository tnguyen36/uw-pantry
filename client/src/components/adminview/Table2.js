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
import { connect } from 'react-redux';
import { fetchUsers } from '../../actions';


class Table2 extends React.Component {

    componentDidMount() {
        this.props.fetchUsers();
    }

    iconsList() {
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

    
    render() {
        if (!this.props.users) {
            return <div>Loading</div>
        } else {

        
        return (
            <MaterialTable
                title="User Table"
                columns={[
                    {title: 'First Name', field: 'firstName'},
                    {title: 'Last Name', field: 'lastName'},
                    {title: 'Student ID', field: 'id'},
                    {title: 'Birthdate', field: 'birthDate', render: rowData => moment(rowData.birthDate).format("MM/DD/YY")},
                    {title: 'Address', field: 'address'},
                    {title: 'Ethnicity', field: 'ethnicity'},
                    {title: 'Class Standing', field: 'classStanding'},
                    {title: 'Military', field: 'military'}
                ]}
                data={this.props.users[0]}
                icons={this.iconsList()}
                options={{
                    exportButton: true
                }}
                detailPanel={rowData => {
                    
                    return rowData.members.map(link => {
                        return (
                            
                                <Breadcrumbs separator=">" aria-label="breadcrumb">
                              <h4>{link.firstName}</h4>
                              <h4>{link.race}</h4>
                              <h4>{link.birthDay}</h4>
                                </Breadcrumbs>
                           
                        );
                            
                    
                   
                   
                })}}
                />
        )}
    }
}

const mapStateToProps = state => {
    return ({
        users: state.users
    });
}

export default connect(mapStateToProps, {fetchUsers}) (Table2);