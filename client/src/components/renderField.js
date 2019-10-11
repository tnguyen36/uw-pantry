import React from 'react';
import TextField from '@material-ui/core/TextField';

const renderField = ({input, label, type, meta: {touched, error}}) => {
  
    return(
    <div>
        <TextField
            label={label}
            type={type}
            margin="dense"
            variant="outlined"
            fullWidth
            InputLabelProps={{
                shrink: true,
              }}
            // required
            {...input}
        />
        
    </div>
    );
}

export default renderField;