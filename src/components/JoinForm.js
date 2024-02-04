import React, { Component } from 'react';
import FormField from './FormField';
import EmailField from './EmailField';
import PasswordField from './PasswordField';

class JoinForm extends Component {
  // initialize state to hold the validity of form fields
  state = { fullname: '', email: '', password: '', errors: {} };

  // higher-order function that returns a state change watch function
  // sets the corresponding state property to true if the form field has no errors
  fieldStateChanged = (field) => (state) => this.setState((prevState) => ({
    [field]: state.value,
    errors: { ...prevState.errors, [field]: state.errors },
  }));

  // state change watch functions for each field
  emailChanged = this.fieldStateChanged('email');
  fullnameChanged = this.fieldStateChanged('fullname');
  passwordChanged = this.fieldStateChanged('password');

  // validation function for the fullname
  // ensures that the fullname contains at least two names separated with a space
  validateFullname = (value) => {
    const regex = /^[a-z]{2,}(\s[a-z]{2,})+$/i;
    if (!regex.test(value)) throw new Error('Fullname is invalid');
  };

   // Handle form submission
   handleSubmit = (event) => {
    event.preventDefault();

    const { fullname, email, password, errors } = this.state;

    // Check if there are any validation errors
    if (Object.values(errors).some((fieldErrors) => fieldErrors.length > 0)) {
      console.log('Form has errors. Please correct them.');
      return;
    }

    // Perform further actions, such as making an API call, updating state, etc.
    console.log('Form submitted successfully!');
    console.log('Full Name:', fullname);
    console.log('Email:', email);
    console.log('Password:', password);

    // You can navigate to another page or update the state accordingly
  };

  render() {
    const { errors, fullname, email, password } = this.state;
    const formValidated =
      Object.values(errors).every((fieldErrors) => fieldErrors.length === 0) &&
      (fullname.trim() !== '' && email.trim() !== '' && password.trim() !== '');
  
    return (
      <div className="container mt-50">
        <div className="card">
          <div className="card-header bg-primary text-white text-center">
            <h2 style={{ fontFamily: 'Open Sans', fontWeight: 300 }} className="m-1">
              Sign Up
            </h2>
          </div>
  
          <div className="card-body">
            <form onSubmit={this.handleSubmit}>
              {/* Render the fullname form field passing the name validation fn */}
              <FormField
                type="text"
                fieldId="fullname"
                label="Full Name"
                placeholder="Enter Full Name"
                validator={this.validateFullname}
                onStateChanged={this.fullnameChanged}
                required
              />
  
              {/* Render the email field component */}
              <EmailField
                fieldId="email"
                label="Email"
                placeholder="Enter Email Address"
                onStateChanged={this.emailChanged}
                required
              />
  
              {/* Render the password field component using the thresholdLength of 7 and minStrength of 3 */}
              <PasswordField
                fieldId="password"
                label="Password"
                placeholder="Enter Password"
                onStateChanged={this.passwordChanged}
                thresholdLength={7}
                minStrength={3}
                required
              />
  
              {/* Show the form button only if all fields are valid and at least one field is not empty */}
              {formValidated && (
                <button type="submit" className="btn btn-primary mt-2">
                  Join
                </button>
              )}
            </form>
          </div>
  
          <div className="card-footer text-center">
            <p className="mt-2">
              Already have an account? <a href="/">Login here</a>
            </p>
          </div>
        </div>
      </div>
    );
  }
  
}

export default JoinForm;
