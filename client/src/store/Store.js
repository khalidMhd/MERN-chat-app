import {createStore, combineReducers, compose, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import Cookie from 'js-cookie'
import { signinReducer, signupReducer, } from '../reducers/auth'
import{allUserReducer, getUserReducer,} from '../reducers/user'
import { getConversationReducer, setConversationReducer } from '../reducers/conversion'

const userInfo = Cookie.getJSON("userInfo") || null

const initialState = { userSignin:{userInfo},  }
const reducer = combineReducers({
    userSignin:signinReducer,
    userSignup: signupReducer,
    allUser: allUserReducer,
    getUserList: getUserReducer,
    getConversationList: getConversationReducer,
    setConversationList: setConversationReducer,
})

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)))

export default store