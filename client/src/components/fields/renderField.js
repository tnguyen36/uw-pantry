import React from 'react';
import TextField from '@material-ui/core/TextField';

const renderField = ({input, label, type, meta: {touched, error}}) => {
  
    return(
    <div>
        <TextField
            label={label}
            error={touched && error}
            type={type}
            margin="dense"
            variant="outlined"
            fullWidth
            InputLabelProps={{
                shrink: true,
              }}
            required
            
            {...input}
        />
        <p style={{color: 'red', fontSize: '13px', margin: '0'}}>{error}</p>
    </div>
    );
}

export default renderField;