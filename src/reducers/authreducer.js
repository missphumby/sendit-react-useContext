
const user = JSON.parse(localStorage.getItem("user"));
const token = JSON.parse(localStorage.getItem('token'))

export const initialAuthState = user
  ? { isLoggedIn: true, user, token }
  : { isLoggedIn: false, user: null, token: null };

// export const initialAuthState = {
//   isAuthenticated: false,
//   user: null,
//   token: null
// };
export const authreducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
            return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
        token: action.payload,
        error: ''
        
      };
      case 'LOGIN_FAIL':
			return {
        ...state,
				isAuthenticated: false,
				user: null,
				error: action.payload
			};
    case "LOGOUT":
      localStorage.clear();
      return {
        ...state,
        isAuthenticated: false,
        user: null
      };
    default:
      return state;
  }
};

// import {
//   REGISTER_SUCCESS,
//   REGISTER_FAIL,
//   LOGIN_SUCCESS,
//   LOGIN_FAIL,
//   LOGOUT,
// } from "../actions/types";

// const user = JSON.parse(localStorage.getItem("user"));

// export const initialAuthState = user
//   ? { isLoggedIn: true, user }
//   : { isLoggedIn: false, user: null };

// export const authreducer = (state = initialAuthState, action) =>{
//   const { type, payload } = action;

//   switch (type) {
//     case REGISTER_SUCCESS
//       return {
//         ...state,
//         isLoggedIn: false,
//       };
//     case REGISTER_FAIL:
//       return {
//         ...state,
//         isLoggedIn: false,
//       };
//     case LOGIN_SUCCESS:
//       return {
//         ...state,
//         isLoggedIn: true,
//         user: payload.user,
//       };
//     case LOGIN_FAIL:
//       return {
//         ...state,
//         isLoggedIn: false,
//         user: null,
//       };
//     case LOGOUT:
//       return {
//         ...state,
//         isLoggedIn: false,
//         user: null,
//       };
//     default:
//       return state;
//   }
// }