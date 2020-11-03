import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { authreducer, initialAuthState } from '../reducers/authreducer';
import {useReducer} from 'react'
import jwtDecode from 'jwt-decode'
import authContext from "../store";
import sendLogo from '../assets/send-logo.png'


const UserHeader = () => {
  // const [state, dispatch] = React.useReducer(authreducer, initialAuthState);

const {state, dispatch} = React.useContext(authContext)
// dispatch({
//   type: "LOGIN_SUCCESS",
//   payload: state.user
// })

  const logout = () => {
    
    dispatch({
      type: "LOGOUT"
    })
    // localStorage.clear()
    window.location = '/'
  }
  return (
    <nav className="navbar navbar-expand-lg sticky-top navbar-dark bg-dark ">
      <Link className="navbar-brand" to="/">
        <img
          src={sendLogo}
          className="img-fluid"
          width="180"
          height="60"
          alt="Header logo"
        />
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div className="navbar-nav">
        <NavLink className="nav-item nav-link" to="/profile">
              {state.user.firstname.toUpperCase()}
              {/* name */}
            </NavLink>
            <NavLink className="nav-item nav-link btn btn-secondary mr-1 ml-1 text-white" to="/createOrder">
              Create Order
            </NavLink>
            <NavLink
              className="nav-item nav-link btn btn-danger"
              onClick={logout}
              to="/"
            >
              Logout
            </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default UserHeader;
          
// export const initialAuthState = {
//   isAuthenticated: false,
//   user: JSON.parse(localStorage.getItem("user")) || {},
//   token: null
// };
// export const authreducer = (state=initialAuthState, action) => {
//   switch (action.type) {
//     case "LOGIN_SUCCESS":
//      localStorage.setItem("user", JSON.stringify(action.payload.user));
//      const token = localStorage.getItem("token");
//       return {
//         ...state,
//         isAuthenticated: true,
//         user: action.payload.user,
//         token,
//         error: ''
//       };
//       case 'LOGIN_FAIL':
// 			return {
//         ...state,
// 				isAuthenticated: false,
// 				user: null,
// 				error: action.payload.error
// 			};
//     case "LOGOUT":
//       localStorage.clear();
//       return {
//         ...state,
//         isAuthenticated: false,
//         user: null
//       };
//     default:
//       return state;
//   }
// };
