import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import zxcvbn from 'zxcvbn';

import FormField from './FormField';

class PasswordField extends Component {

  constructor(props) {

    super(props);
    const { minStrength = 3, thresholdLength = 7 } = props;

    // set default minStrength to 3 if not a number or not specified
    // minStrength must be a a number between 0 - 4

    this.minStrength = typeof minStrength === 'number'
      ? Math.max( Math.min(minStrength, 4), 0 )
      : 3;

    // set default thresholdLength to 7 if not a number or not specified
    // thresholdLength must be a minimum value of 7

    this.thresholdLength = typeof thresholdLength === 'number'
      ? Math.max(thresholdLength, 7)
      : 7;

    // initialize internal component state
    this.state = { password: '', strength: 0 };
  };

  stateChanged = state => {

    // update the internal state using the updated state from the form field

    this.setState({
      password: state.value,
      strength: zxcvbn(state.value).score
    }, () => this.props.onStateChanged(state));

  };

  validatePasswordStrong = value => {
    // ensure password is long enough
    if (value.length <= this.thresholdLength) throw new Error("Password is short");

    // ensure password is strong enough using the zxcvbn library
    if (zxcvbn(value).score < this.minStrength) throw new Error("Password is weak");
  };

  render() {
  const { type, validator, onStateChanged, children, ...restProps } = this.props;
  const { password, strength } = this.state;
  const passwordLength = password.length;

  // password strength meter is only visible when password is not empty
  const strengthClass = ['strength-meter mt-2', passwordLength > 0 ? 'visible' : 'invisible'].join(' ').trim();

  return (
    <Fragment>
      <div className="position-relative">
        {/** Pass the validation and stateChanged functions as props to the form field **/}
        <FormField type="password" validator={this.validatePasswordStrong} onStateChanged={this.stateChanged} {...restProps}>
          <span className="d-block form-hint mb-2">Password must be more than 7 characters.</span>
          {children}
        </FormField>
        {/** Render the password strength meter below the input field **/}
        <div className={strengthClass}>
          <div className="strength-meter-fill" data-strength={strength}></div>
        </div>
      </div>
    </Fragment>
  );
}


}

PasswordField.propTypes = {
  label: PropTypes.string.isRequired,
  fieldId: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  required: PropTypes.bool,
  children: PropTypes.node,
  onStateChanged: PropTypes.func,
  minStrength: PropTypes.number,
  thresholdLength: PropTypes.number
};

export default PasswordField;

