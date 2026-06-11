import React from 'react'
import { FaSignOutAlt } from 'react-icons/fa'

const Logout = () => {

  const handleLogout = () => {
    localStorage.removeItem('authToken')
    localStorage.removeItem('userData')

    window.dispatchEvent(new Event('authStateChanged'))
    /*
    dispathcEEvent is needed to communicate betweeen unrelated componenets without passing props.
    Componenets can't automatically know when localStorage changes.You need to tell them explicity
    window.dispatchEvent() Broadcasts an event on the window object
    All listeners in the app catch it
    new Even() 
    Creates a custom event named 'auth'
    it does nothing by itself
    */
  }

  return (
    <div className='flex flex-col items-center justify-center h-full'>
      <button
      onClick={handleLogout} 
      className='flex items-center px-4 py-2 bg-red-600 text-white rounded-lg'>
        <FaSignOutAlt className='mr-2'/>
        Logout
      </button>
      <p className='mt-4 text-gray-600'>
        You are already signed in. Click above to Logout
      </p>
    </div>
  )
}

export default Logout
