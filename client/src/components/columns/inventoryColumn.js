import React from 'react';
import moment from 'moment';

export function renderColumns(classes) {
    return [
        {title: 'Weight', field: 'weight', render: rowData => <p className={rowData.operator === '+' ? classes.addition : classes.subtraction}>{rowData.operator + " " + rowData.weight}</p>},
        {title: 'Name', field: 'name'},
        {title: 'Posted Date', field: 'postedDate', defaultSort: 'desc', render: rowData => moment(rowData.postedDate).format('MMMM Do YYYY, h:mm:ss a')}
    ]
}

export function action(props, classes, actionButton) {
    return [
        {
            tooltip: 'Delete',
            icon: () => actionButton(classes, props),
            onClick: (evt, data) => props.deletePosts(data)
        }
    ]
}