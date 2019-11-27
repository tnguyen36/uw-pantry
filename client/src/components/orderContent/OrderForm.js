import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import validate from '../../formValidation';
import { Field, reduxForm} from 'redux-form';
import renderSelectField from '../fields/renderSelectField';
import renderField from '../fields/renderField';
import Button from '@material-ui/core/Button';
import 'react-widgets/dist/css/react-widgets.css';
import Multiselect from 'react-widgets/lib/Multiselect';
import {cannedCorn, protein, rice, macCheese, peanutButter, cannedTomato, peas, tomatoSoup, cannedPears, mixedFruit, cereal, oatmeal, greens, cornFlake, cannedHam, chickenSoup, kidneyBean, driedBean, hygieneItems} from '../selectvalues/orderSelectorValues';
import '../../style.css';

const styles = makeStyles(theme => ({
    button: {
       
        marginTop: theme.spacing(3),
        marginLeft: theme.spacing(1),
        

    },
    buttons: {
        display: 'flex',
        justifyContent: 'flex-end'
    },

}));


const renderMultiselect = ({ input, data, valueField, textField }) =>
  <Multiselect {...input}
    onBlur={() => input.onBlur()}
    value={input.value || []} 
    data={data}
    valueField={valueField}
    textField={textField}
  />

const OrderForm = (props) => {
    const { handleSubmit, previousPage } = props;
    
    const classes = styles();
    return (
        <div>
            <Container maxWidth="md">
                <h4 className="form-step-title">Order Information</h4>
                <h4 className="step-label">{`Step ${window.location.pathname === '/order/returning' ? '1' : '4'} / ${window.location.pathname === '/order/returning' ? '1' : '4'}`}</h4>
                <p>Please note: The items available below are the items we consistently have in the Pantry and do not reflect all donated food/hygiene items available. For maximum selection, 
                    please visit the Pantry during drop-in shopping hours reflected below or email the Pantry at pantry@uw.edu or call 253-692-4765. Orders will be fulfilled based on items 
                    available.
                </p>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={3} direction="row">
                        <Grid item xs={4}>
                            <Field name="orderPost.cannedCorn" component={renderSelectField} label="Canned Corn" selectValues={cannedCorn}/>
                        </Grid>
                        <Grid item xs={4}>
                        <Field name="orderPost.protein" component={renderSelectField} label="Protein" selectValues={protein}/>

                        </Grid>
                        <Grid item xs={4}>
                        <Field name="orderPost.rice" component={renderSelectField} label="Rice" selectValues={rice}/>

                        </Grid>
                        <Grid item xs={4}>
                        <Field name="orderPost.macCheese" component={renderSelectField} label="Mac N' Cheese" selectValues={macCheese}/>

                        </Grid>
                        <Grid item xs={4}>
                        <Field name="orderPost.peanutButter" component={renderSelectField} label="Peanut Butter" selectValues={peanutButter}/>

                        </Grid>
                        <Grid item xs={4}>
                        <Field name="orderPost.cannedTomato" component={renderSelectField} label="Canned Tomato Sauce/Diced" selectValues={cannedTomato}/>

                        </Grid>
                        <Grid item xs={4}>
                        <Field name="orderPost.peas" component={renderSelectField} label="Peas" selectValues={peas}/>

                        </Grid>
                        <Grid item xs={4}>
                        <Field name="orderPost.tomatoSoup" component={renderSelectField} label="Tomato Soup" selectValues={tomatoSoup}/>

                        </Grid>
                        <Grid item xs={4}>
                        <Field name="orderPost.cannedPears" component={renderSelectField} label="Canned Pears" selectValues={cannedPears}/>

                        </Grid>
                        <Grid item xs={4}>
                        <Field name="orderPost.mixedFruit" component={renderSelectField} label="Mixed Fruit" selectValues={mixedFruit}/>

                        </Grid>
                        <Grid item xs={4}>
                        <Field name="orderPost.cereal" component={renderSelectField} label="Cereal" selectValues={cereal}/>

                        </Grid>
                        <Grid item xs={4}>
                        <Field name="orderPost.greens" component={renderSelectField} label="Greens" selectValues={greens}/>
  
                        </Grid>
                        <Grid item xs={4}>
                            <Field name="orderPost.oatmeal" component={renderSelectField} label="Quick Oats (Oatmeal)" selectValues={oatmeal}/>

                        </Grid>
                        <Grid item xs={4}>
                            <Field name="orderPost.cornFlake" component={renderSelectField} label="Corn Flakes" selectValues={cornFlake}/>

                        </Grid>
                        <Grid item xs={4}>
                            <Field name="orderPost.cannedHam" component={renderSelectField} label="Canned Smoked Ham" selectValues={cannedHam}/>

                        </Grid>
                        <Grid item xs={4}>
                            <Field name="orderPost.chickenSoup" component={renderSelectField} label="Chicken Noodle Soup" selectValues={chickenSoup}/>

                        </Grid>
                        <Grid item xs={4}>
                            <Field name="orderPost.kidneyBean" component={renderSelectField} label="Kidney Beans" selectValues={kidneyBean}/>

                        </Grid>
                        <Grid item xs={4}>
                            <Field name="orderPost.driedBeans" component={renderSelectField} label="Dried Pinto Beans" selectValues={driedBean}/>

                        </Grid>
                        <Grid item xs={12}>
                            <h4 className="form-step-title">Hygiene</h4>
                            <p>Hygiene items do not count toward 10 food items. Select 1 or more</p>
                            <Field name="orderPost.hygieneItems"  component={renderMultiselect} data={hygieneItems}  />
                           
                        </Grid>
                        <Grid item xs={12}>
                            <h4 className="form-step-title">Pick-Up Details</h4>
                            <p>You can choose a time between 9:00am-5:00pm from Monday - Friday to pick up your order.</p>          
                            <p>Please allow 2-3 business days to process your order and to receive email confirmation of your pick-up date and time. Food will be available for 
                                pick up in Dougan 104. You are REQUIRED to bring your UWT student ID or any information reflecting current enrollment at UWT at food pick-up.
                            </p>                       
                            <p>For emergency food pick up, please contact Nedralani Mailo at mailon@uw.edu or 253.692.4325</p>
                        </Grid>
                        <Grid item xs={6}>
                            <h4 className="form-step-title">Pantry Drop-in Hours</h4>
                            <p>Monday - Friday 9:00am-5:00pm</p>
                        </Grid>
                        <Grid item xs={6}>
                            <h4 className="form-step-title">Contact Us</h4>
                            <p>Please direct any questions, concerns or suggestions to Nedralain Mailo at mailon@uw.edu</p>
                        </Grid>
                       {window.location.pathname === '/order/returning' && <Grid item xs={6}>
                            <Field name="orderPost.firstName" component={renderField} type="text" label="First Name" />
                        </Grid>}
                       {window.location.pathname === '/order/returning' && <Grid item xs={6}>
                            <Field name="orderPost.lastName" component={renderField} type="text" label="Last Name"  />
                        </Grid>}
                        <Grid item xs={6}>
                            <Field name="orderPost.pickupDate" component={renderField} type="datetime-local" value="2017-05-24T10:30" />
                        </Grid>
                        <Grid item xs={6}>
                            <Field name="orderPost.email" component={renderField} type="email" label="UW Email" />
                        </Grid>

                    </Grid>
                        <div className={classes.buttons}>
                            {window.location.pathname === '/order/new' && <Button className={classes.button} variant="contained"  onClick={previousPage}>Back</Button>}                      
                            <Button style={{backgroundImage: '-webkit-radial-gradient(left bottom,rgba(159,88,150,0) 0,rgba(159,88,150,0.6) 100%)'}} className={classes.button} variant="contained" color="primary" type="submit">Submit</Button>
                        </div>

                </form>  

            </Container>
        </div>
    )
}

export default reduxForm({
    destroyOnUnmount: false,
    validate
}) (OrderForm);