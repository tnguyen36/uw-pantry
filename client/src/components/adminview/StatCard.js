import React from 'react';
import PeopleIcon from '@material-ui/icons/People';
import { makeStyles } from '@material-ui/core/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWeightHanging } from '@fortawesome/free-solid-svg-icons';

const useStyles = makeStyles({
  icon: {      
      color: 'white',
      height: '50px',
      width: '50px',
      float: 'right',
  },
  textLabel: {
      marginTop: '5px',
      marginBottom: '5px',
      color: 'white',
      textShadow: '2px 2px 4px #000000'
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
            <h3 className={classes.textLabel}>{props.label}{props.type === 'user' ? <PeopleIcon className={classes.icon} /> : <FontAwesomeIcon style={{fontSize: '1.8rem'}} className={classes.icon} icon={faWeightHanging} />}</h3>
            <h1 className={classes.textLabel}>{total.toString()}</h1>
           
        </div>
    );
};

export default StatCard;