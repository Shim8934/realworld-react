import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from 'react-redux'
import { store } from './store/store'

import Home from "./layouts/Home";
import Header from "./components/Header"
import Footer from "./components/Footer"

import Login from "./layouts/Login";
import Register from "./layouts/Register";



ReactDOM.createRoot(document.querySelector('#root'))
    .render(
      <StrictMode>
        <Provider store={store}>
          <Router>
            <Header />

            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
               <Route path="/register" element={<Register />} />
            </Routes>

            <Footer />
          </Router>
        </Provider>
      </StrictMode>
);