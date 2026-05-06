import React, { useState } from "react"
import { useRole } from "../../hooks/useRole"
import UserManagement from "../features/user/UserManagement"
import SidebarLayout from "../../components/SidebarLayout"
import "./Dashboard.css"

import RouteScheduleDashboard from "../features/routes_schedule/RouteScheduleDashboard"

import { FaUserCog, FaChartBar, FaCog, FaFileAlt, FaClipboardCheck ,FaBus} from "react-icons/fa"
import { BiSolidBell, BiSolidBellRing } from "react-icons/bi"
import { Col, Row } from "react-bootstrap"
import ProgramsResources from "../features/programs_resources/ProgramsResources"
import ComplianceList from "../features/compliance_audits/complianceList"
import AuditsList from "../features/compliance_audits/AuditsList"

import { ROLES } from "../../config/roleConfig"


const iconMap = {
  users: <FaUserCog />,
  'programs-resources': <FaFileAlt />,
  routes: <FaBus />,
  compliance: <FaClipboardCheck />,
  
  audits: <FaClipboardCheck />,
  reports: <FaChartBar />,
  settings: <FaCog />
}

const UserDashboard = () => {
  const { user, role, canAccess } = useRole()
  const [activeKey, setActiveKey] = useState("users")

  const allMenuItems = [
    { key: "users", label: "User Management", requiredComponent: "UserManagement" },
    { key: "programs-resources", label: "Programs & Resources", requiredComponent: "ProgramsResources" },

    { key: "routes", label: "Routes & Schedules", requiredComponent: "Routes" },

    { key: "compliance", label: "Compliance", requiredComponent: "Compliance" },
    { key: "audits", label: "Audits", requiredComponent: "Audits" },

    { key: "reports", label: "Reports", requiredComponent: "Reports" },
    { key: "settings", label: "Settings", requiredComponent: "Settings" }
  ]


  const menuItems = allMenuItems//.filter(item => canAccess(item.requiredComponent) || item.requiredComponent === "UserManagement")



  const renderContent = () => {
    switch (activeKey) {
      case "users":
        return <UserManagement />
      case "programs-resources":
         return <ProgramsResources /> 
      case "routes":
        return <RouteScheduleDashboard />
        // return canAccess('ProgramsResources') ? <ProgramsResources /> : <div className="alert alert-danger">You do not have access to this section</div>

        return <ProgramsResources /> 
      case "compliance":
        return <ComplianceList />
      case "audits":
        return <AuditsList />

      case "reports":
        return <h4>Reports</h4>
      case "settings":
        return <h4>Settings</h4>
      default:
        return null
    }
  }

  return (
    <SidebarLayout
      menuItems={menuItems}
      activeKey={activeKey}
      onSelect={setActiveKey}
      iconMap={iconMap}
    >
      <Row className="mb-4 align-items-center justify-content-between">
        <Col>
          <h1>Welcome, {user?.name}!</h1>
          <p>{user?.role?.toUpperCase().replace(/_/g, ' ')} Dashboard</p>
        </Col>
        <Col xs="auto" className="d-flex gap-3">
          <BiSolidBell size={24} style={{ cursor: 'pointer' }} />
          <BiSolidBellRing size={24} style={{ cursor: 'pointer' }} />
        </Col>
      </Row>
      <hr />
      {renderContent()}
    </SidebarLayout>
  )
}

export default UserDashboard