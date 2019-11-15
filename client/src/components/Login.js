import React from "react";
import { axiosWithAuth } from "../utils/axiosWithAith";

const Login = () => {
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
        localStorage.setItem('token', res.data.payload);
        props.history.push('/protected')
      })
      .catch(err => console.log(err));
  }

  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      <p>Build a login page here</p>
    </>
  );
};

export default Login;
