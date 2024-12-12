import React from 'react'
import { useSelector } from 'react-redux'

function Home() {
    const token = useSelector((state) => state.auth.token);
  return (
    <div>
        <p>welcome user!!!</p>
        {token ? (
            <p>User is authenticated. Token: {token}</p>
        ) : (
            <p>User is not authenticated. Please log in.</p>
        )}
    </div>
  )
}

export default Home