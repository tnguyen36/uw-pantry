import React from 'react';
import { Field, reduxForm } from 'redux-form';
import Paper from '@material-ui/core/Paper';
import renderField from '../renderField';
import '../../style.css';

const StudentLoginForm = () => {
    return (
        <div>
            <Paper>
                <form>
                    <h4 className="form-title">Student Login</h4>
                    <Field name="firstName" component={renderField} type="text" label="First Name" />
                    <Field name="id" component={renderField} type="text" label="Student ID" />
                    <button>Sign In</button>
                </form>

            </Paper>
        </div>
    );
}

export default reduxForm({
    form: 'loginForm'
}) (StudentLoginForm);