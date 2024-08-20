import axios from 'axios';
import { REGISTER_USER_REQUEST, REGISTER_USER_SUCCESS, REGISTER_USER_FAILURE } from './types';
import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE } from './types';

export const addUser = (userData) => async (dispatch) => {
  dispatch({ type: REGISTER_USER_REQUEST });

  try {
    const response = await axios.post('http://localhost:3000/api/v1/users', userData);
    dispatch({
      type: REGISTER_USER_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: REGISTER_USER_FAILURE,
      payload: error.response ? error.response.data : { message: 'An error occurred' },
    });
  }
};


// import axios from 'axios';





export const loginUser = (credentials) => async (dispatch) => {
  dispatch({ type: LOGIN_REQUEST });

  try {
    const response = await axios.post('http://localhost:3000/api/v1/auth/login', credentials);
    const { token, user } = response.data;

    // Store token in local storage
    localStorage.setItem('token', token);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: user,
    });

    // Return user object for further use (e.g., in LoginPage for navigation)
    return user;
  } catch (error) {
    dispatch({
      type: LOGIN_FAILURE,
      payload: error.response ? error.response.data : { message: 'An error occurred' },
    });
    throw error; // Rethrow error to handle it in LoginPage
  }
};
