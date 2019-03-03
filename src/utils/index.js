const emailPattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const loginPattern = /^(?=.{1,25}$)(?!.*__.*)(?!.*\.\..*)[a-zA-Z0-9_.]+$/;
const namePattern = /^[a-zA-Z0-9. ]+$/;

export const validateFields = (form, type="signUp") => {
  const errors = {};
  Object.keys(form).forEach(field => {
    switch (field) {
      case 'username':
        if (!form[field].length) {
          errors.username = 'Username is required';
          break;
        }
        if (form[field].match(loginPattern) === null) {
          errors.username = `Username may only contain alphanumeric characters, single dots and hyphens. It must be at most 25 characters`;
          break;
        }
        break;
      case 'password':
        if (!form[field].length) {
          errors.password = 'Password is required';
          break;
        }
        if (type === 'signUp' && form[field].length < 6) {
          errors.password = 'Password must be at least 6 characters';
          break;
        }
        break;
      case 'email':
        if (!form[field].length) {
          errors.email = 'Email is required';
          break;
        }
        if (form[field].match(emailPattern) === null) {
          errors.email = 'Please enter a valid email address';
          break;
        }
        break;
      case 'firstName':
        if (!form[field].length) {
          errors.firstName = 'First name is required';
          break;
        }
        if (form[field].length > 25) {
          errors.firstName = 'First name must be at most 25 characters';
          break;
        }
        if (form[field].match(namePattern) === null) {
          errors.firstName = `First name may only contain alphanumeric characters, dots and spaces`;
          break;
        }
        break;
      case 'lastName':
        if (!form[field].length) {
          errors.lastName = 'Last name is required';
          break;
        }
        if (form[field].length > 25) {
          errors.lastName = 'Last name must be at most 25 characters';
          break;
        }
        if (form[field].match(namePattern) === null) {
          errors.lastName = `Last name may only contain alphanumeric characters, dots and spaces`;
          break;
        }
        break;
      default:
        break;
    }
  });
  return errors;
};

export const validateForm = (errors) => {
  let formValid = true;
  Object.values(errors).forEach(value => {
    if (value) formValid = false;
  });
  return formValid;
};
