import React, {useContext, useState} from "react";
import authContext from '../store'
import {Link, useHistory, Redirect} from 'react-router-dom'
import {toast} from 'react-toastify'

const Login = (props) => {
    const  {state, dispatch}  = useContext(authContext);


// const history = useHistory();
    
  const initialState = {
      email: "",
      password: "",
    isSubmitting: false,
    errorMessage: null
  };
const [data, setData] = useState(initialState);

const handleChange = event => {
    setData({
      ...data,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = event => {
    const url ="https://send-it-app.herokuapp.com"
  event.preventDefault();
  setData({
    ...data,
    isSubmitting: true,
    errorMessage: null,
    // isAuthenticated: true
  });
  fetch(`${url}/login`, {
    method: "post",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      email: data.email,
      password: data.password
    })
  })
  .then(res => res.json())
  .then(res => {
    
    console.log("resss", res);
      if (res.message === "Authorization failed" && res.password !== "" ){
        toast.info('Unauthorized User, please enter a valid email address')
       }
       else if(res.error ){
        toast.error('Incorrect password, please enter a valid password') 
       }
       else if (res.token) {
              const { _id } = res.user;
           localStorage.setItem("token", JSON.stringify(res.token));
    
            fetch(`${url}/login/me/${_id}`, {
              method: "GET",
              headers: {
                Authorization: res.token,
              },
            })
              .then((res) => res.json())
              .then((res) => {
                console.log("res", res);
    
                 if (res.success) {
                  console.log("res2", res.success);
                  localStorage.setItem("userId", res.data._id);
                  localStorage.setItem('user', JSON.stringify(res.data))
                  console.log("got here", res.data.roles[0])
                  dispatch({
                    type: "LOGIN_SUCCESS",
                    payload: res.data
                  })
                  if (res.data.roles[0].name == "user") {
                    props.history.push("/profile");
                    toast.success("Login successful")
                    
                  } else if (res.data.roles[0].name == "admin") {
                       props.history.push("/admin");
                    toast.success("Login successful")
                  }
                }
                else if (res.error) {
                  console.log("error", res.err);
                  
                }
              })
        
              .catch((err) => {console.log("error occurred", err);
      setData({
        ...data,
        isSubmitting: false,
        errorMessage: err.message || err.statusText,
        // isAutheticated: false
      });
    })
  }
    });
    }
    
return (
    <div className="loginForm">
        <div className="container">
        <form onSubmit={handleSubmit} className="registrationForm">
        <h1>Login</h1>
        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input
            value={data.email}
            onChange={handleChange}
            name="email"
            type="email"
            className="form-control"
            id="email"
            aria-describedby="emailHelp"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            value={data.password}
            onChange={handleChange}
            name="password"
            type="password"
            className="form-control"
            id="password"
            required
          />
        </div>
        {data.errorMessage && (
              <span className="form-error">{data.errorMessage}</span>
            )}

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
        <p className="mt-4 text-right">
          Don't have an account?{" "}
          <Link className="btn btn-primary" to="/register">
            Register
          </Link>
        </p>
      </form>
      
        </div>
      </div>
  );
};
export default Login;