import React from 'react';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
 

const renderSelectField = ({input, label, type, meta: {touched, error}, selectValues}) => {
  
    return(
    <div>
        <TextField
            label={label}
            select
            error={touched && error}
            placeholder="Select One"
            margin="dense"
            variant="outlined"
            fullWidth
            InputLabelProps={{
                shrink: true,
              }}
            {...input}
        >
        {selectValues.map(option => (
            <MenuItem key={option.value} value={option.value}>
                {option.label}
            </MenuItem>))}
        </TextField>
    </div>
    );
}

export default renderSelectField;