import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Field, reduxForm} from 'redux-form';
import {TextField} from 'redux-form-material-ui';
import RaisedButton from 'material-ui/RaisedButton';
import axios from 'axios';

// validation functions
const required = value => (value == null ? 'Required' : undefined);
const email = value =>
  (value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Invalid email'
    : undefined);

class Form extends Component {
  componentDidMount() {
    this.refs.name // the Field
      .getRenderedComponent() // on Field, returns ReduxFormMaterialUITextField
      .getRenderedComponent() // on ReduxFormMaterialUITextField, returns TextField
      .focus(); // on TextField
  }
  
  
  render() {
    const {handleSubmit, pristine, reset, submitting, handleClose, fetchUser} = this.props;
    return (
      <form onSubmit={handleSubmit((values)=>{
        axios.post('/api/users', values)
        .then(function (response) {
          console.log(response);
          handleClose();
          fetchUser();
        })
        .catch(function (error) {
          handleClose();
        });
      })}>
        <div>
          <Field
            name="name"
            component={TextField}
            hintText="Name"
            floatingLabelText="Name"
            validate={required}
            ref="name"
            withRef
          />
        </div>
        <div>
          <Field
            name="email"
            component={TextField}
            hintText="Email"
            floatingLabelText="Email"
            validate={[required, email]}
          />
        </div>
        <div>
          <RaisedButton type="submit" disabled={submitting}>Submit</RaisedButton>
          <RaisedButton
            type="button"
            disabled={pristine || submitting}
            onTouchTap={reset}
          >
            Clear
          </RaisedButton>
        </div>
      </form>
    );
  }
}

Form = connect(state => ({
}))(Form);

Form = reduxForm({
  form: 'example',
  initialValues: {
  },
})(Form);

export default Form;