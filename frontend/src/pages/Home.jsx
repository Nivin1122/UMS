import React from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { logoutUser } from '../redux/AuthSlice';


function Home() {
    const token = useSelector((state) => state.auth.token);
    const dispatch = useDispatch();

    const handleLogout = ()=>{
      const refreshToken = localStorage.getItem('refresh');
      console.log("Refresh token before logout:", refreshToken);
      dispatch(logoutUser());
    }

  return (
    <div>
        <p>welcome user!!!</p>
        {token ? (
          <>
            <p>User is authenticated. Token: {token}</p>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
            <p>User is not authenticated. Please log in.</p>
        )}
    </div>
  )
}

export default Home