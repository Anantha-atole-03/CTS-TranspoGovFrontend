import React from 'react'
import { useRole } from '../hooks/useRole'
import { ROLES } from '../config/roleConfig'
import CitizenDashboard from './dashboards/CitizenDashboard'
import UserDashboard from './dashboards/UserDashboard'

const Dashboard = () => {
  const { role, isAuthenticated } = useRole()
  console.log("User role in Dashboard:", role)

  if (!isAuthenticated) {
    return <div className="alert alert-warning">Please log in</div>
  }

  // Route based on role
  if (role === ROLES.CITIZEN_PASSENGER) {
    return <CitizenDashboard />
  } else {
    return <UserDashboard />
  }
}

export default Dashboard