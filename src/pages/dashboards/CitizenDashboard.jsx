import React, { useState } from 'react'
import { useRole } from '../../hooks/useRole'
import { Container, Row, Col, Nav, Tab } from 'react-bootstrap'
import './Dashboard.css'

const CitizenDashboard = () => {
  const { user } = useRole()

  return (
    <Container fluid className="dashboard-container">
      <Row className="mb-4">
        <Col>
          <h1>Welcome, {user?.name}!</h1>
          <p>Citizen Dashboard</p>
        </Col>
      </Row>

      <Tab.Container id="citizen-tabs" defaultActiveKey="book-ticket">
        <Row className="mb-3">
          <Col sm={12}>
            <Nav variant="tabs">
              <Nav.Item>
                <Nav.Link eventKey="book-ticket">Book Ticket</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="ticket-info">Ticket Info</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="ticket-list">Ticket List</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="profile">Profile</Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
        </Row>

        <Row>
          <Col sm={12}>
            <Tab.Content>
              <Tab.Pane eventKey="profile">
                {/* <ProfileDetails /> */}
                Profile
              </Tab.Pane>
              <Tab.Pane eventKey="book-ticket">
                {/* <BookTicketForm /> */}
                Book Ticket
              </Tab.Pane>
              <Tab.Pane eventKey="ticket-info">
                {/* <TicketInfo /> */}
                Ticket Info
              </Tab.Pane>
              <Tab.Pane eventKey="ticket-list">
                {/* <TicketList /> */}
                Ticket List
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </Container>
  )
}

export default CitizenDashboard