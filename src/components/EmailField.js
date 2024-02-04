import React from 'react';
import PropTypes from 'prop-types';

import FormField from './FormField';

const EmailField = (props) => {
  // Prevent passing type and validator props from this component to the rendered form field component
  const { type, validator, ...restProps } = props;

  // Custom email validation function using a regular expression
  const validateEmail = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      throw new Error('Email is invalid');
    }
  };

  // Pass the validateEmail to the validator prop
  return <FormField type="text" validator={validateEmail} {...restProps} />;
};

EmailField.propTypes = {
  label: PropTypes.string.isRequired,
  fieldId: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  required: PropTypes.bool,
  children: PropTypes.node,
  onStateChanged: PropTypes.func,
};

export default EmailField;
