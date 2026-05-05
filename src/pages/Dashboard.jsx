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
if(ROLES.CITIZEN_PASSENGER===role){
  return <CitizenDashboard />
}else{
  return <UserDashboard />
}
  switch (role) {
    case ROLES.CITIZEN_PASSENGER:
      return <CitizenDashboard />
    case ROLES.ADMIN:
      return <UserDashboard />
    case ROLES.COMPLIANCE_OFFICER:
      return <UserDashboard />
    case ROLES.TRANSPORT_OFFICER:
      return <UserDashboard />
    default:
      return <div className="alert alert-danger">Unknown role. Please contact administrator.</div>
  }
}

export default Dashboard