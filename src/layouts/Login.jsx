import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Link } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";

const Login = () => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');
  const inputEl = useRef(null);

  const setters = {
    email: setEmail,
    password: setPassword
  };

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setters[name](value);
  }, []);

  const SignInFunc = (e) => {
    e.preventDefault();

    if (!email) {
      return alert("ID를 입력하세요.");
    }
    else if (!password) {
      return alert("Password를 입력하세요.");
    }
    else {
      let user = {
        user: {
          email,
          password
        }
      }

      axios.post(`${process.env.REACT_APP_BACKEND_URL}`, user)
          .then((res) => {
            console.log(res.data);


          });
    }
  }

  useEffect(() => {

  }, [msg]);

  return (
      <>
        <div className="auth-page">
          <div className="container page">
            <div className="row">
              <div className="col-md-6 offset-md-3 col-xs-12">
                <h1 className="text-xs-center">Sign in</h1>
                <p className="text-xs-center">
                  <Link to="/register">Need an account?</Link>
                </p>

                <ul className="error-messages">
                  <li>That email is already taken</li>
                </ul>

                <form onSubmit = { SignInFunc }>
                  <fieldset className="form-group">
                    <input
                        className="form-control form-control-lg"
                        type="email"
                        ref={inputEl}
                        placeholder="Email"
                        value={email}
                        name="email" // name 속성 추가
                        onChange={handleChange}
                    />
                  </fieldset>
                  <fieldset className="form-group">
                    <input
                        className="form-control form-control-lg"
                        type="password"
                        placeholder="Password"
                        value={password}
                        name="password" // name 속성 추가
                        onChange={handleChange}/>
                  </fieldset>
                  <button className="btn btn-lg btn-primary pull-xs-right">Sign in</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </>
  )
}

export default Login;