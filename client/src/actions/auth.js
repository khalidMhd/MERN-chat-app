import axios from 'axios';
import Axios from 'axios'
import Cookie from 'js-cookie';

import { USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS, USER_SIGNIN_FAIL, 
    USER_SIGNUP_REQUEST, USER_SIGNUP_SUCCESS, USER_SIGNUP_FAIL, 
    USER_LOGOUT, 
} from "../constants/auth";

const instance = Axios.create({
  baseURL: 'http://localhost:8800/api'
})

const userInfo = Cookie.getJSON("userInfo") || null
if (userInfo) {
  Axios.defaults.headers.common.Authorization = userInfo?.token
}

  const signin = (email, password)=> async (dispatch)=> {
        dispatch({type:  USER_SIGNIN_REQUEST, payload:{email,password}})
        try {
            const data = await instance.post("/auth/login",{email, password})
            Cookie.set('userInfo', JSON.stringify(data));
            dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
        } catch (error) {
            dispatch({ type: USER_SIGNIN_FAIL, payload: error.message });
        }
  }


  const signup = (username, email, password) => async (dispatch) => {
      dispatch({ type: USER_SIGNUP_REQUEST, payload: { username, email, password } });
      try {
        const  data = await instance.post("/auth/register", {username, email, password} );
        dispatch({ type: USER_SIGNUP_SUCCESS, payload: data });
      } catch (error) {
        dispatch({ type: USER_SIGNUP_FAIL, payload: error.message });
      }
  }

 
  const logout = () => (dispatch) => {
    Cookie.remove("userInfo");
    dispatch({ type: USER_LOGOUT })
  }

export {signin, signup, logout, }