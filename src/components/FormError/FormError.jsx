import React from 'react';
import errorIcon from './error.svg';

const FormError = ({error}) => (
  <div className="server-response-block">
    <div className="server-response-error">
      <img src={errorIcon} className="error-icon" alt="Error"/>
      <span className="error-message">{error}</span>
    </div>
  </div>
);

export default FormError;
