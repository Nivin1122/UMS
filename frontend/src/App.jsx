import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import AdminHome from './pages/AdminHome';
// import Ad_Login from './pages/Ad_Login';
import Ad_Login from './pages/Ad_Login';


function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Signup />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/home' element={<Home />}/>
        <Route path='/admin-login' element={<Ad_Login />}/>
        <Route path='/admin-home' element={<AdminHome />}/>
      </Routes>
    </Router>
  )
}

export default App;
