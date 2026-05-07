import React, { useState } from "react"
import { useRole } from "../../hooks/useRole"
import SidebarLayout from "../../components/SidebarLayout"
import "./Dashboard.css"
import { FaTicketAlt, FaCog, FaHistory, FaUser } from "react-icons/fa"
import { BiSolidBell, BiSolidBellRing } from "react-icons/bi"
import { Col, Row } from "react-bootstrap"
import TicketsManagement from "../features/tickets/TicketsManagement"

const iconMap = {
  tickets: <FaTicketAlt />,
  'my-bookings': <FaHistory />,
  profile: <FaUser />,
  settings: <FaCog />
}

const CitizenDashboard = () => {
  const { user, role } = useRole()
  const [activeKey, setActiveKey] = useState("tickets")

  const menuItems = [
    { key: "tickets", label: "My Tickets", requiredComponent: "Tickets" },
    { key: "my-bookings", label: "My Bookings", requiredComponent: "Bookings" },
    { key: "profile", label: "My Profile", requiredComponent: "Profile" },
    { key: "settings", label: "Settings", requiredComponent: "Settings" }
  ]

  const renderContent = () => {
    switch (activeKey) {
      case "tickets":
        return <TicketsManagement />
      case "my-bookings":
        return <h4>My Bookings</h4>
      case "profile":
        return <h4>My Profile</h4>
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
          <p>Citizen Passenger Dashboard</p>
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

export default CitizenDashboard