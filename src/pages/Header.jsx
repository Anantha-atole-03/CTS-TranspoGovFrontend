import React from 'react'
import { Link } from 'react-router-dom'

function Header() {
  return (
    <div>
      <Link to="/">Home</Link> |
       <Link to="/dashboard"> Dashboard</Link> |
        <Link to="/login"> Login</Link> |
        <Link to="/contact"> Contact</Link> |
        <Link to="/about"> About</Link> |
    </div>
  )
}

export default Header

