import React, { useState} from "react";
import { axiosWithAuth } from "../utils/axiosWithAith";

const Login = (props) => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const [enter, setEnter] = useState({ username:'', password:'' })

  const changeIt = e => {
    e.preventDefault();
    setEnter({
      ...enter, [e.target.name]: e.target.value
    })
  }

  const login = e => {
    e.preventDefault();
    axiosWithAuth()
      .post ('/login', enter)
      .then(sentMe => {
        localStorage.setItem('token', sentMe.data.payload);
        props.history.push('/protected')
      })
      .catch(err => console.log(err));
  }

  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      <p>Build a login page here</p>

        <form onSubmit={login}>

          <input 
            type='text'
            name='username'
            placeholder='Username'
            value={enter.username}
            onChange={changeIt}
          />
          <input 
            type='password'
            name='password'
            placeholder='Password'
            value={enter.password}
            onChange={changeIt}
          />
        <button className='reg-button'>Login</button>
        </form>
    </>
  );
};

export default Login;
