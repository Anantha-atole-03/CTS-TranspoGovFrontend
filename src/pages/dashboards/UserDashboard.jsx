import React, { useState } from "react"
import { useRole } from "../../hooks/useRole"
import UserManagement from "../features/user/UserManagement"
import SidebarLayout from "../../components/SidebarLayout"
import "./Dashboard.css"
import { FaUserCog, FaChartBar, FaCog, FaFileAlt, FaClipboardCheck, FaChartLine } from "react-icons/fa"
import { BiSolidBell, BiSolidBellRing } from "react-icons/bi"
import { Col, Row } from "react-bootstrap"
import ProgramsResources from "../features/programs_resources/ProgramsResources"
import ComplianceList from "../features/compliance_audits/complianceList"
import AuditsList from "../features/compliance_audits/AuditsList"
import { ROLES } from "../../config/roleConfig"

const iconMap = {
  users: <FaUserCog />,
  'programs-resources': <FaFileAlt />,
  compliance: <FaClipboardCheck />,
  audits: <FaClipboardCheck />,
  reports: <FaChartBar />,
  analytics: <FaChartLine />,
  settings: <FaCog />
}

const UserDashboard = () => {
  const { user, role, canAccess } = useRole()
  const [activeKey, setActiveKey] = useState("programs-resources")

  const baseMenuItems = [
    { key: "programs-resources", label: "Programs & Resources", requiredComponent: "ProgramsResources" },
    { key: "reports", label: "Reports", requiredComponent: "Reports" },
  ]

  const adminMenuItems = [
    { key: "users", label: "User Management", requiredComponent: "UserManagement" },
    { key: "settings", label: "Settings", requiredComponent: "Settings" },
  ]

  const complianceMenuItems = [
    { key: "compliance", label: "Compliance", requiredComponent: "Compliance" },
    { key: "audits", label: "Audits", requiredComponent: "Audits" },
  ]

  let menuItems = [...baseMenuItems]

  // Add role-specific menu items
  if (role === ROLES.ADMINISTRATOR) {
    menuItems = [...adminMenuItems, ...baseMenuItems, ...complianceMenuItems]
  } else if (role === ROLES.PROGRAM_MANAGER) {
    menuItems = [...baseMenuItems, ...complianceMenuItems]
  } else if (role === ROLES.COMPLIANCE_OFFICER || role === ROLES.GOVERNMENT_AUDITOR) {
    menuItems = [...complianceMenuItems, { key: "reports", label: "Reports", requiredComponent: "Reports" }]
  } else if (role === ROLES.TRANSPORT_OFFICER) {
    menuItems = [...baseMenuItems]
  }

  const renderContent = () => {
    switch (activeKey) {
      case "users":
        return canAccess('UserManagement') ? <UserManagement /> : <div className="alert alert-danger">Access Denied</div>
      case "programs-resources":
        return canAccess('ProgramsResources') ? <ProgramsResources /> : <div className="alert alert-danger">Access Denied</div>
      case "compliance":
        return canAccess('Compliance') ? <ComplianceList /> : <div className="alert alert-danger">Access Denied</div>
      case "audits":
        return canAccess('Audits') ? <AuditsList /> : <div className="alert alert-danger">Access Denied</div>
      case "reports":
        return canAccess('Reports') ? <h4>Reports & Analytics</h4> : <div className="alert alert-danger">Access Denied</div>
      case "settings":
        return canAccess('Settings') ? <h4>System Settings</h4> : <div className="alert alert-danger">Access Denied</div>
      default:
        return null
    }
  }

  const getRoleName = () => {
    const roleNames = {
      [ROLES.ADMINISTRATOR]: 'Administrator',
      [ROLES.PROGRAM_MANAGER]: 'Program Manager',
      [ROLES.TRANSPORT_OFFICER]: 'Transport Officer',
      [ROLES.COMPLIANCE_OFFICER]: 'Compliance Officer',
      [ROLES.GOVERNMENT_AUDITOR]: 'Government Auditor',
    }
    return roleNames[role] || role
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
          <p>{getRoleName()} Dashboard</p>
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