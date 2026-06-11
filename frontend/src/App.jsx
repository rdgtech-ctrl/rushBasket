import React, { useEffect, useState } from 'react'
import { Routes, Route, useLocation, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import { CartProvider } from './CartContext'
import Contact from './pages/Contact'
import Items from './pages/Items'
import Login from './components/Login'
import Signup from './components/Signup'
import Logout from './components/Logout'
import Navbar from './components/Navbar'
import Cart from './pages/Cart'

const ScrollToTop = () => {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}
const App = () => {

  const [isAuthenticated, setIsAuthenticated] = useState(
    Boolean(localStorage.getItem('authToken'))
  )

  useEffect(() => {
    const handler = () => {
      setIsAuthenticated(Boolean(localStorage.getItem('authToken')))
    }
    window.addEventListener('authStateChanged', handler)
    return () => window.removeEventListener('authStateChanged', handler)
  }, [])
  // useEffect(()) Runs once when component mounts
  //  [] = only runs once
  // const handler() Function that runs when auth state changes
  // setisAuth checks if authToken exists in localStorage ]
  //window.addEvenListener() Listens for authStateChanged event anywhere in app 
  // when triggered -> handler runs
  // updates isAuthenticated true
  // return() => window.remove Removes listener when component unmounts
  //Prevents memeory leaks


  return (
    <CartProvider>
      <ScrollToTop />
      <Navbar isAuthenticated={isAuthenticated} />
      {/* If isAuthenticated = true
          ↓
        Navbar shows: Logout button
        If isAuthenticated = false
            ↓
        Navbar shows: Login button */}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/items' element={<Items />} />

        <Route path='/cart' element={isAuthenticated ? <Cart /> : <Navigate replace to='/login' />} />
        {/* protects the cart route - only logged-in users can access it.
        element = what to render
        */}
        {/* React component names must start with an uppercase letter. <cart/> react treat this as HTML element not component */}

        {/* AUTH ROUTES */}
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/logout' element={<Logout />} />

        {/* FALLBACK TO HOME */}
        <Route path='*' element={<Navigate replace to='/' />} />
        {/* when no route found direct to home page */}
        <Route />
      </Routes>
    </CartProvider>
  )
}

export default App
