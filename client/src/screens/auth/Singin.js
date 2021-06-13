import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { signin } from '../../actions/auth'
import {Link} from 'react-router-dom'
import Navbar from '../Navbar'

const SigninScreen = (props) => {
    const dispatch = useDispatch()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const userSignin = useSelector(state => state.userSignin);
    const { loading, userInfo, error } = userSignin;

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(signin(email, password));
      }

    return <> 
     <form onSubmit={submitHandler} className='card' style={{width:'500px', margin:'20px auto'}}>
      <h4 style={{textAlign:'center'}}>Login</h4>
        <div className="form-group">
        {loading && <div>Loading...</div>}
          {error && <div>Invaled Email or Password</div>}
            <label for="email">Email:</label>
            <input type="email" className="form-control" id="email" placeholder="Enter email" name="email" onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="form-group">
            <label for="pwd">Password:</label>
            <input type="password" className="form-control" id="pwd" placeholder="Enter password" name="pswd"  onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
        <p>Create an account <Link to="/register"> Sign-up here</Link> </p>
    </form>
      </>
}

export default SigninScreen


