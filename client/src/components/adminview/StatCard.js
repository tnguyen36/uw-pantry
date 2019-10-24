import React from 'react';
import PeopleIcon from '@material-ui/icons/People';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  icon: {      
      color: 'white',
      height: '50px',
      width: '50px',
      float: 'right',
      opacity: 0.5
  },
  textLabel: {
      marginTop: '5px',
      marginBottom: '5px'
  }
});

function getTotal(props) {
    var total = 0;
    if (typeof props !== 'undefined') {

        for (var i = 0; i < props.length; i++) {
            total += props[i];
        }
    }
    return total;
}

const StatCard = (props) => {
    const classes = useStyles();
    const total = getTotal(props.values);

    return (
        <div>
            <h3 className={classes.textLabel}>{props.label}<PeopleIcon className={classes.icon} /></h3>
            <h1 className={classes.textLabel}>{total.toString()}</h1>
           
        </div>
    );
};

export default StatCard;