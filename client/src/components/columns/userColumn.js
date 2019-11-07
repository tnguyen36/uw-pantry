import React from 'react';
import Chip from '@material-ui/core/Chip';
import moment from 'moment';

export function renderColumns(classes) {
    return [
        {title: 'Status', field: 'status', export: false, defaultSort: 'desc', render: rowData => <Chip label={rowData.status} className={rowData.status === 'Pending' ? classes.pending : classes.completed} size="small" />},
        {title: 'First Name', field: 'firstName'},
        {title: 'Last Name', field: 'lastName'},
        {title: 'Student ID', field: 'id'},
        {title: 'Birthdate', field: 'birthDate', render: rowData => moment(rowData.birthDate).format("MM/DD/YY")},
        {title: 'Address', field: 'address', render: rowData => rowData.address + ' ' + rowData.city + ' ' + rowData.zipCode},
        {title: 'Ethnicity', field: 'ethnicity'},
        {title: 'Class Standing', field: 'classStanding'},
        {title: 'Military', field: 'military'},
    ]
}
export const detailPanel = (rowData) => {
    return rowData.members.map((link, index) => {
        return (
            
            <div key={index}>
                <h4 style={{display: 'inline', marginRight: '1.5rem', marginLeft: '1rem'}}>{`Household Member ${index + 1}`}</h4>
                <h5 style={{display: 'inline', marginRight: '2.5rem'}}>First Name: <span style={{fontWeight: 'normal'}}>{link.firstName}</span></h5>
                <h5 style={{display: 'inline', marginRight: '2.5rem'}}>Race: <span style={{fontWeight: 'normal'}}>{link.race}</span></h5>
                <h5 style={{display: 'inline'}}>Birthdate: <span style={{fontWeight: 'normal'}}>{moment(link.birthDate).format("MM/DD/YY")}</span></h5>
              
            </div>                          
        );                  
})};

export function action(props, classes, actionButton) {
    return [
        {
            tooltip: 'Transfer User',
            icon: () => actionButton(classes, props),
            onClick: (evt, data) => props.transferUser(data)
        }
    ]
}
