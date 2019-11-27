const validate = formValues => {
    const errors={};
    if (/[^a-zA-Z]/i.test(formValues.firstName)) {
        errors.firstName = "Invalid Name";
    }
    if (/[^a-zA-Z]/i.test(formValues.lastName)) {
        errors.lastName = "Invalid Name";
    }
    if (/[^a-zA-Z0-9 ]/i.test(formValues.address)) {
        errors.address = "Invalid Address"
    }
    if (/[^a-zA-Z ]/i.test(formValues.city)) {
        errors.city = "Invalid City"
    }
    if (!formValues.classStanding) {
        errors.classStanding = 'Required';
    }
    if(!formValues.ethnicity) {
        errors.ethnicity = "Required";
    }
    if (!formValues.military) {
        errors.military = "Required";
    }
     
    return errors;
    
   
}

export default validate;