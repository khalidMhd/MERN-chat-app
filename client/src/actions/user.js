import axios from 'axios';
import Axios from 'axios'
import Cookie from 'js-cookie';
import {ALL_USER_FAIL, ALL_USER_REQUEST, ALL_USER_SUCCESS, USER_LIST_FAIL, USER_LIST_REQUEST, USER_LIST_SUCCESS,
    } from '../constants/user';


const instance = Axios.create({
  baseURL: 'https://chat-app-dem0.herokuapp.com/api'
})

const userInfo = Cookie.getJSON("userInfo") || null
if (userInfo) {
  Axios.defaults.headers.common.Authorization = userInfo?.token
}

  const getAllUser = (id)=> async (dispatch)=> {
    dispatch({type:  ALL_USER_REQUEST, payload:{id}})
    try {
        const data = await instance.get("/users/alluser/"+id)
        dispatch({ type: ALL_USER_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: ALL_USER_FAIL, payload: error.message });
    }
  }

  const getUser = (friendId)=> async (dispatch)=> {
    dispatch({type:  USER_LIST_REQUEST, payload:{friendId}})
    try {
        const {data} = await instance.get("users?userId=" + friendId)
        dispatch({ type: USER_LIST_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: USER_LIST_FAIL, payload: error.message });
    }
  }
  

export { getAllUser, getUser}