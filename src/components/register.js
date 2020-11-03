import React from "react";
import authContext from '../store'
import {Link, useHistory} from 'react-router-dom'
import {toast, ToastContainer} from 'react-toastify'


 const Register = (props) => {
    const  {state, dispatch}  = React.useContext(authContext);

// const history = useHistory()

  const initialState = {
    firstname: "",
      lastname: "",
      email: "",
      mobile: "",
    password: "",
    isSubmitting: false,
    errorMessage: null
  };
const [data, setData] = React.useState(initialState);

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
      errorMessage: null
    });
    fetch(`${url}/signup`, {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
          firstname: data.firstname,
          lastname:data.lastname,
        email: data.email,
        password: data.password,
        mobile: data.mobile
      })
    })
    .then(res=> res.json())
      .then(res => {
        console.log(res)
        if(res.message === "mail exists"){
          toast.error('Mail exists')
         return false
        }
       else if (res.token) {
          const { _id } = res.user;
          localStorage.setItem("token", res.token);
  
        fetch(`${url}/login/me/${_id}`, {
          method: "GET",
          headers: {
            Authorization: res.token,
          }
        })
          .then((res) => res.json())
          .then((res) => {
            console.log(res);
            if (res.success) {
              const user = res.data
              // localStorage.setItem('user', JSON.stringify(res.data))
              localStorage.setItem("userId", res.data._id);
              localStorage.setItem('user', res.data)
              dispatch({
                type: "LOGIN_SUCCESS",
                payload: user     
            });
              props.history.push('/profile')
              // window.location.reload()
            toast.success('user created successfully')
            } else if (res.error) {
              console.log("error", res.err);
              toast.error(res.err)
            }
          })
      .catch(error => {
        console.log(error)
        dispatch({
          type: "LOGIN_FAIL",
          payload: error
        });
      })
    }
  })
}
return (
    <div className="registerationForm">
        <div className="container">
        <form onSubmit={handleSubmit} className="registrationForm">
        <h1>Register</h1>
        <div className="form-group">
          <label htmlFor="firstname">Firstname</label>
          <input
            autoFocus
            value={data.firstname}
            onChange={handleChange}
            name="firstname"
            type="text"
            className="form-control"
            id="firstname"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastname">Lastname</label>
          <input
            value={data.lastname}
            onChange={handleChange}
            name="lastname"
            type="text"
            className="form-control"
            id="lastname"
            required
          />
        </div>
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
          <label htmlFor="mobile">Mobile Number</label>
          <input
            value={data.mobile}
            onChange={handleChange}
            name="mobile"
            type="tel"
            className="form-control"
            id="mobile"
            pattern="\+(9[976]\d|8[987530]\d|6[987]\d|5[90]\d|42\d|3[875]\d|2[98654321]\d|9[8543210]|8[6421]|6[6543210]|5[87654321]|4[987654310]|3[9643210]|2[70]|7|1)\d{1,14}$"
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
          Already have an account?{" "}
          <Link className="btn btn-primary" to="/login">
            Login
          </Link>
        </p>
      </form>
      <ToastContainer
        position="top-right"
        hideProgressBar={false}
        autoClose={false}
        newestOnTop={true}
        closeOnClick={false}
        draggable={false}
        rtl={false}
      />
        </div>

    </div>
  );
}



export default Register
  