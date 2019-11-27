import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import HouseIcon from '@material-ui/icons/House';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import StepConnector from '@material-ui/core/StepConnector';
import clsx from 'clsx';


const FormStepper = props => {
  const ColorlibConnector = withStyles({
    alternativeLabel: {
      top: 22,
    },
    active: {
      '& $line': {
        backgroundImage:
          'linear-gradient(to right, #834d9b, #d04ed6)',
      },
    },
    completed: {
      '& $line': {
        backgroundImage:
          'linear-gradient(to right, #834d9b, #d04ed6)',
      },
    },
    line: {
      height: 3,
      border: 0,
      backgroundColor: '#eaeaf0',
      borderRadius: 1,
    },
  })(StepConnector);

  const useColorlibStepIconStyles = makeStyles({
    root: {
      backgroundColor: '#ccc',
      zIndex: 1,
      color: '#fff',
      width: 45,
      height: 45,
      display: 'flex',
      borderRadius: '50%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    active: {
      backgroundImage:
        'linear-gradient(to right, #4b2e83, #6e48aa)',
      boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
    },
    completed: {
      backgroundImage:
        'linear-gradient(to right, #4b2e83, #6e48aa)',
    },
  });

  function ColorlibStepIcon(props) {
    const classes = useColorlibStepIconStyles();
    const { active, completed } = props;
  
    const icons = {
      1: <AccountCircleIcon />,
      2: <HouseIcon />,
      3: <GroupAddIcon />,
      4: <FastfoodIcon />,
    };
  
    return (
      <div
        className={clsx(classes.root, {
          [classes.active]: active,
          [classes.completed]: completed,
        })}
      >
        {icons[String(props.icon)]}
      </div>
    );
  }

  const useStyles = makeStyles(theme => ({
    root: {
      width: '100%',
    },
    button: {
      marginRight: theme.spacing(1),
    },
    instructions: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
  }));

  function getSteps() {
    if (window.location.pathname === '/order/new') {
      return ['ACCOUNT', 'PERSONAL', 'HOUSEHOLD', 'ORDER'];
    } else if (window.location.pathname === '/order/returning') {
      return ['ORDER'];
    } else {
      return ['ACCOUNT', 'PERSONAL', 'HOUSEHOLD'];
    }
   
  }
  const classes = useStyles();
  const steps = getSteps();

  return (   
    <div className={classes.root}>
      <Stepper alternativeLabel activeStep={props.activeStep} connector={<ColorlibConnector />}>
        {steps.map(label => (
          <Step key={label}>
            <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

    </div>
  );


}

export default FormStepper;