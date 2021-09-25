import "./scss/App.scss";
import React, { useEffect, useState } from "react";

import { BrowserRouter, Route } from "react-router-dom";
import axios from "axios";

import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import PostList from "./pages/PostList";
import ReduxTest from "./pages/ReduxTest";
import Park from "./pages/Park";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import PostDetail from "./pages/PostDetail";
import PostWrite from "./pages/PostWrite";
import Connect from "./shared/Connect";
import UserInfo from "./pages/UserInfo";
import MyPlogging from "./pages/MyPlogging";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar></Navbar>
        <Route path="/" exact component={Home} />
        <Route path="/login" exact component={Login} />
        <Route path="/signup" exact component={SignUp} />
        <Route path="/userinfo" exact component={UserInfo} />
        <Route path="/postlist" exact component={PostList} />
        <Route path="/park" exact component={Park} />
        <Route path="/postdetail/:id" component={PostDetail} />
        <Route path="/redux" exact component={ReduxTest} />
        <Route path="/postwrite" exact component={PostWrite} />
        <Route path="/myplogging" exact component={MyPlogging} />
      </BrowserRouter>
      <Footer></Footer>
    </div>
  );
}

export default App;
