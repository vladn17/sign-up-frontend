const endpoint = process.env.REACT_APP_ENDPOINT;

const authHeader = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user && user.token) {
    return { Authorization: 'Bearer ' + user.token };
  } else {
    return {};
  }
};

const handleResponse = (response) => {
  if(!response.ok) {
    if (response.status === 401) {
      localStorage.removeItem('user');
      window.location.reload();
    }
    return response.json().then(error => {
      throw error;
    })
  }
  return response.json();
};

const login = (username, password) => {
  const data = {
    username,
    password,
  };
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  };
  return fetch(`${endpoint}account/auth`, requestOptions)
    .then(response => handleResponse(response))
    .then(response => {
      localStorage.setItem('user', JSON.stringify(response));
      return response;
    });
};

const signUp = (data) => {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  };
  return fetch(`${endpoint}account/registration`, requestOptions)
    .then(response => handleResponse(response))
    .then(response => {
      return response;
    });
};

const getProfile = () => {
  const requestOptions = {
    method: 'GET',
    headers: authHeader(),
  };
  return fetch(`${endpoint}account/`, requestOptions)
    .then(response => handleResponse(response))
    .then(response => {
      return response;
    });
};

const logOut = () => {
  localStorage.removeItem('user');
  window.location.reload();
};

export default { login, signUp, getProfile, logOut }