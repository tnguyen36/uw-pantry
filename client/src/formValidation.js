const validate = formValues => {
    const errors={}
    if (!formValues.firstName) {
        errors.firstName = 'Required'
    }
    if (!formValues.lastName) {
        errors.lastName = "Required"
    }
    if (!formValues.classStanding) {
        errors.lastName = "Required"
    }
    return errors;
}

export default validate;