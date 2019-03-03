import React from 'react';

const FormField = ({type, placeholder, name, error, value, onChange}) => (
  <div className="form-field">
    <input
      type={type}
      placeholder={placeholder}
      name={name}
      className={`text-input ${error && 'input-error'}`}
      value={value}
      onChange={onChange}
    />
    {error && <span className="error-message">{error}</span>}
  </div>
);

export default FormField;
