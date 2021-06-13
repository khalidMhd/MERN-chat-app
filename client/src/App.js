import React, { useEffect, createContext, useReducer, useContext, useState } from 'react';
import './App.css';
import { Route,   BrowserRouter as Router, Switch, useHistory, Redirect } from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.css"
import Home from './screens/Home';
import HomeScreen from './screens/Home';
import SignupScreen from './screens/auth/Signup';
import SigninScreen from './screens/auth/Singin';
import { useSelector } from 'react-redux';
import Messenger from './screens/messenger/Messenger';


export const UserContext = createContext()
 

function App() {

  const userSignin = useSelector(state => state.userSignin);
  const { loading, userInfo, error } = userSignin;

  return (
    <Router>
      <Switch>
        <Route exact path="/">{userInfo ? <Messenger /> : <SignupScreen />}</Route>
        <Route exact path="/home">{userInfo ? <HomeScreen /> : <SignupScreen />}</Route>
        <Route path="/login">{userInfo ? <Redirect to="/" /> : <SigninScreen />}</Route>
        <Route path="/register"> {userInfo ? <Redirect to="/" /> : <SignupScreen />}
        </Route>
      </Switch>
    </Router>
  );
}
 
export default App;
