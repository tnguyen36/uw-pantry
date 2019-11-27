import React from 'react';
import Chip from '@material-ui/core/Chip';
import moment from 'moment';


export function renderColumns(classes) {
    return [
        {title: 'Status', field: 'orderPost[0].orderStatus', export: false, defaultSort: 'desc', render: rowData => <Chip label={rowData.orderPost[0].orderStatus} className={rowData.orderPost[0].orderStatus === 'Pending' ? classes.pending : classes.completed} size="small" />},
        {title: 'First Name', field: 'firstName'},
        {title: 'Last Name', field: 'lastName'},
        {title: 'Email', field: 'orderPost[0].email'},
        {title: 'PickUp Date', field: 'orderPost[0].pickupDate', render: rowData => moment(rowData.orderPost[0].pickupDate).format('MMMM Do YYYY, h:mm a')},
        
    ]
}

export function renderReturningUserColumns(classes) {
    return [
        {title: 'Status', field: 'orderPost[0].orderStatus', export: false, defaultSort: 'desc', render: rowData => <Chip label={rowData.orderPost[0].orderStatus} className={rowData.orderPost[0].orderStatus === 'Pending' ? classes.pending : classes.completed} size="small" />},
        {title: 'First Name', field: 'orderPost[0].firstName'},
        {title: 'Last Name', field: 'orderPost[0].lastName'},
        {title: 'Email', field: 'orderPost[0].email'},
        {title: 'PickUp Date', field: 'orderPost[0].pickupDate', render: rowData => moment(rowData.orderPost[0].pickupDate).format('MMMM Do YYYY, h:mm a')},
        
    ]
}


function renderDetailPanel(rowData) {
    return Object.keys(rowData.orderPost[0]).map(function(key, index) {
        
        if (key !== 'orderStatus' && key !== '_id' && key !== 'pickupDate' && key !== 'email') {
            return <div key={index}><h3>{`${key} : ${rowData.orderPost[0][key]}`}</h3></div>
        }
        return null;
    })
}

export const detailPanel = (rowData) => {
   return (
       <div>
           {renderDetailPanel(rowData)}
       </div>
   )         
}

function renderReturningUserDetailPanel(rowData) {
    return Object.keys(rowData.orderPost[0]).map(function(key, index) {
        
        if (key !== 'orderStatus' && key !== '_id' && key !== 'pickupDate' && key !== 'email' && key !== 'firstName' && key !== 'lastName') {
            return <div key={index}><h3>{`${key} : ${rowData.orderPost[0][key]}`}</h3></div>
        }
        return null;
    })
}

export const returningUserDetailPanel = (rowData) => {
    return (
        <div>
            {renderReturningUserDetailPanel(rowData)}
        </div>
    )
}

export function action(props, classes, actionButton) {
    return [
        {
            tooltip: 'Process Order',
            icon: () => actionButton(classes, props),
            onClick: (evt, data) => props.transferUser(data)
        }
    ]
}