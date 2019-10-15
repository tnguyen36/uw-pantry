import React from 'react';
import clsx from 'clsx';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { green } from '@material-ui/core/colors';
import ErrorIcon from '@material-ui/icons/Error';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import Slide from '@material-ui/core/Slide';
import { makeStyles } from '@material-ui/core/styles';

const variantIcon = { 
  error: ErrorIcon,
  success: CheckCircleIcon
};

const useStyles1 = makeStyles(theme => ({
  error: {
    backgroundColor: theme.palette.error.dark,
  },
  success: {
    backgroundColor: green[600],
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing(1),
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
}));

function SlideTransition(props) {
    return <Slide {...props} direction="down" />;
  }

const MySnackbarContentWrapper = React.forwardRef((props, ref) => {
  const classes = useStyles1();
  const { className, message, onClose, variant, ...other } = props;
  const Icon = variantIcon[variant];

  return (
    <SnackbarContent
      ref={ref}
      className={clsx(classes[variant], className)}
      aria-describedby="client-snackbar"
      message={
        <span id="client-snackbar" className={classes.message}>
          <Icon className={clsx(classes.icon, classes.iconVariant)} />
          {message}
        </span>
      }
      {...other}
    />
  );
});


export default function CustomizedSnackbars(props) {
 
  const [open] = React.useState(true);

 

 
  return (
    <div>
      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        open={open}
        autoHideDuration={2000}
        TransitionComponent= {SlideTransition}
        onClose={() => { props.offSnackBar() }}
      >
        <MySnackbarContentWrapper
          variant={props.variant}
          message={props.variant === 'error' ? 'Student Id already in use' : 'Successfully Registered!'}
        />
      </Snackbar>
     
    </div>
  );
}