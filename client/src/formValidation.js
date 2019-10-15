const validate = formValues => {
    const errors={};
    if (!formValues.classStanding) {
        errors.classStanding = 'Required';
    }
    if(!formValues.ethnicity) {
        errors.ethnicity = "Required";
    }
    if (!formValues.military) {
        errors.military = "Required";
    }
    if (!formValues.race) {
        errors.race = "Required";
    }
    if (formValues.members) {
        if (parseInt(formValues.householdNumber, 10) !== formValues.members.length) {
            errors.householdNumber = "Please add members according to this number";
        }
    }
    return errors;
    
   
}

export default validate;