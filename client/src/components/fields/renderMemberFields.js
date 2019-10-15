import React from 'react';
import renderField from './renderField';
import renderSelectField from './renderSelectField';
import Button from '@material-ui/core/Button';
import { Field } from 'redux-form';
import PersonAddSharpIcon from '@material-ui/icons/PersonAddSharp';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import { races } from '../selectvalues/raceSelectorValues';
import Grid from '@material-ui/core/Grid';
import '../../style.css';

const renderMemberFields = ({ fields, meta: { error, submitFailed }}) => (
      <div>
      {fields.map((member, index) => (
        <div className="member-group" key={index}>
          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="center"
          >
          <h4>Member #{index + 1}</h4>
           <IconButton
            variant="contained"           
            title="Remove Member"
            color="secondary"
            onClick={() => fields.remove(index)}
          >{<DeleteIcon />}
          </IconButton>

          </Grid>
          <Field
            name={`${member}.firstName`}
            type="text"
            component={renderField}
            label="First Name"
          />
          <Field
            name={`${member}.birthDay`}
            type="date"
            component={renderField}
            label="Birthday"
          />
           <Field
            name={`${member}.race`}
            component={renderSelectField}
            label="Race"
            selectValues={races}
          />
        </div>
      ))}
       <Button style={{marginTop: '1rem'}} variant="contained" color="primary" size="small" startIcon={<PersonAddSharpIcon />} onClick={() => fields.push({})}>
          Add Member
        </Button>
      </div>
      
  );

  export default renderMemberFields;