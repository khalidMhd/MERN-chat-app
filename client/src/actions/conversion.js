import axios from 'axios';
import Axios from 'axios'
import Cookie from 'js-cookie';
import { CONVERSATION_SET_FAIL, CONVERSATION_SET_REQUEST, CONVERSATION_SET_SUCCESS, CONVERSION_LIST_FAIL, CONVERSION_LIST_REQUEST, CONVERSION_LIST_SUCCESS } from '../constants/conversion';


const instance = Axios.create({
  baseURL: 'http://localhost:8800/api'
})

const userInfo = Cookie.getJSON("userInfo") || null
if (userInfo) {
  Axios.defaults.headers.common.Authorization = userInfo?.token
}

  const getConversion = (userId)=> async (dispatch)=> {
    dispatch({type:  CONVERSION_LIST_REQUEST, payload:{userId}})
    try {
        const data = await instance.get("/conversations/"+userId)
        dispatch({ type: CONVERSION_LIST_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: CONVERSION_LIST_FAIL, payload: error.message });
    }
  }

  const setConversation = (senderId, receiverId)=> async (dispatch)=> {
    dispatch({type:  CONVERSATION_SET_REQUEST, payload:{senderId, receiverId}})
    try {
        const data = await instance.post("/conversations", {receiverId , senderId})
        dispatch({ type: CONVERSATION_SET_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: CONVERSATION_SET_FAIL, payload: error.message });
    } 
}

export {getConversion, setConversation }