import React, { useCallback, useState } from 'react';
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";

const Register = () => {
  const dispatch = useDispatch();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const setters = {
    username: setUsername,
    email: setEmail,
    password: setPassword
  };

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setters[name](value);
  }, []);

  const SignUpFunc = (e) => {
    e.preventDefault();

    if (!username) {
      return alert("Username을 입력하세요.");
    }
    else if (!email) {
      return alert("ID를 입력하세요.");
    }
    else if (!password) {
      return alert("Password를 입력하세요.");
    }
    else {
      let user = {
        user: {
          username,
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

  return (
      <>
        <div className="auth-page">
          <div className="container page">
            <div className="row">
              <div className="col-md-6 offset-md-3 col-xs-12">
                <h1 className="text-xs-center">Sign up</h1>
                <p className="text-xs-center">
                  <Link to="/login">Have an account?</Link>
                </p>

                <ul className="error-messages">
                  <li>That email is already taken</li>
                </ul>

                <form onSubmit = { SignUpFunc }>
                  <fieldset className="form-group">
                    <input className="form-control form-control-lg"
                           type="text"
                           placeholder="Username"
                           value={username}
                           name="username"
                           onChange={handleChange}
                    />
                  </fieldset>
                  <fieldset className="form-group">
                    <input
                        className="form-control form-control-lg"
                        type="email"
                        placeholder="Email"
                        value={email}
                        name="email"
                        onChange={handleChange}
                    />
                  </fieldset>
                  <fieldset className="form-group">
                    <input
                        className="form-control form-control-lg"
                        type="password"
                        placeholder="Password"
                        value={password}
                        name="password"
                        onChange={handleChange}/>
                  </fieldset>
                  <button className="btn btn-lg btn-primary pull-xs-right">Sign up</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </>
  )
}

export default Register;