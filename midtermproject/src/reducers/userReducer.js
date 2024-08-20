// import { REGISTER_USER_REQUEST, REGISTER_USER_SUCCESS, REGISTER_USER_FAILURE } from '../actions/types';

// const initialState = {
//   loading: false,
//   user: null,
//   error: null,
//   successMessage: null, // Add successMessage to initial state
// };

// const userReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case REGISTER_USER_REQUEST:
//       return {
//         ...state,
//         loading: true,
//         error: null,
//         successMessage: null,
//       };
//     case REGISTER_USER_SUCCESS:
//       return {
//         ...state,
//         loading: false,
//         user: action.payload,
//         successMessage: 'Registration successful!', // Set successMessage on success
//       };
//     case REGISTER_USER_FAILURE:
//       return {
//         ...state,
//         loading: false,
//         error: action.payload,
//         successMessage: null,
//       };
//     default:
//       return state;
//   }
// };

// export default userReducer;

import { REGISTER_USER_REQUEST, REGISTER_USER_SUCCESS, REGISTER_USER_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE } from '../actions/types';

const initialState = {
  loading: false,
  user: null,
  error: null,
  successMessage: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_USER_REQUEST:
    case LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        successMessage: null,
      };
    case REGISTER_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload,
        successMessage: 'Registration successful!',
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload,
        successMessage: 'Login successful!',
      };
    case REGISTER_USER_FAILURE:
    case LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        successMessage: null,
      };
    default:
      return state;
  }
};

export default userReducer;

