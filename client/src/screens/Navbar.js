import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../actions/auth';


const Navbar = (props) => {
  const userSignin = useSelector(state=>state.userSignin)
  const {userInfo}= userSignin
  
  const dispatch = useDispatch()
   const history = useHistory()
   
  const handleLogout = () => {
    if(true){
      dispatch(logout());
      history.push('/login')
    }
   
  }
  
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to="/">Chat App</Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item active">
            {/* <Link className="nav-link" to="/">Home <span className="sr-only">(current)</span></Link> */}
          </li>
      
            <li className="nav-item dropdown">
            <Link className="nav-link dropdown-toggle" to="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              { userInfo.data?.username}
            </Link>
            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
              <div className="dropdown-divider"></div>
              <button className="btn btn-info" onClick={()=>handleLogout()}>Logout</button>
            </div>
          </li>     
          
         
        </ul>
      </div>
    </nav>
  )
}

export default Navbar