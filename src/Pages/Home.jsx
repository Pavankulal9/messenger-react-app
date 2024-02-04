import React, { useContext,useEffect, useState} from 'react'
import { AuthContext } from '../Hooks/auth';
import { useDispatch, useSelector} from 'react-redux';
import { getAllUsersDetails, getCurrentUserDetails, getUserFriendList } from '../apiCalls';
import AuthUserComp from '../Compontes/AuthUserComp';
import UnAuthUserComp from '../Compontes/UnAuthUserComp';
import IntroScreen from '../Compontes/IntroScreen';

const Home = () => {
  const {user}= useContext(AuthContext);
  const {currentUserDetails,intialScreenRender} = useSelector((state) => state.userDetails);
  const dispatch = useDispatch();
   
  const [userFriendList,setUserFriendList] = useState([]);
 

  useEffect(()=>{
      if(user){
          getCurrentUserDetails(user.uid,dispatch);
          getAllUsersDetails(user.uid,dispatch);
          getUserFriendList(user.uid,setUserFriendList);
          setTimeout(()=>{
             dispatch({
              type: 'intialScreenRender'
          });
          },3000);
      }
  },[user,dispatch]);

    
     if(intialScreenRender){
       return(
        <IntroScreen/>
       )
     }else if(userFriendList&&currentUserDetails){
       return (
         <AuthUserComp userFriendList={userFriendList} currentUserDetails={currentUserDetails}/>
       )
     }else{
       return (
        <UnAuthUserComp/>
     )}
  }
     

export default Home