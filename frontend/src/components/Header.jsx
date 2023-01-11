import React from 'react'
import { FaSignInAlt } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import './style.css'

function Header({type}) {
  return (
    <>
        {{type}===1?(
            <Link to='/register'>
                <FaSignInAlt/> Register
            </Link> 
        ):(
            <Link to='/login'>
                <FaSignInAlt/> Login
            </Link>
        )}
    </>
  )
}

export default Header