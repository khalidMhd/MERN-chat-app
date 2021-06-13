import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { followUser, getAllUser } from '../actions/user';
import { setConversation } from '../actions/conversion';
import Navbar from './Navbar';
import axios from 'axios';
const HomeScreen = ()=>{
    const dispatch = useDispatch()
    const [currentChat, setCurrentChat] = useState(null);

    const userSignin = useSelector(state=>state.userSignin)
    const {userInfo}= userSignin

    const allUser = useSelector(state=>state.allUser)
    const {listAllUser}= allUser

    console.log("currentChat", currentChat);

      useEffect(() => {
        
        if(userInfo){
            axios
              .get("http://localhost:8800/api/conversations")
              .then(res => setCurrentChat(res.data))
              .catch(err => console.error(err));
            dispatch(getAllUser(userInfo?.data?._id));
        }
      }, [userInfo])

      const addConversationHandler = (userId) => {
         dispatch(setConversation(userInfo?.data?._id, userId))
        //  window.location.reload()
    };
  
    return <>
    <Navbar />
       <div className='d-flex'>
          
                <div className='col-sm-2 ml-3 mb-3' >
                    <h5 className='text-center'>Users</h5>
                    <div className='overflow-auto' style={{ maxHeight: '500px'}}>
                        {listAllUser?.data?.map((user, index) =>
                            <div className="d-flex justify-content-between mb-3">
                                <h5>{user?.username} </h5>
                                {userInfo.data.followings.includes(user._id)? 
                                <button className="btn btn-info btn-sm" disabled>Friends</button>
                                :
                                <button className="btn btn-info btn-sm" onClick={() => addConversationHandler(user?._id)}>Add To Chat</button>

                                }
                            </div>
                        )}
                    </div>
                </div>
                </div>

    </>
}

export default HomeScreen
