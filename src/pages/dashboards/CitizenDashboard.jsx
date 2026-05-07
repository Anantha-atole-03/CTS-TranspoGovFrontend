import React, { useState } from 'react'
import { useRole } from '../../hooks/useRole'
import { Container, Row, Col, Nav, Tab, Button } from 'react-bootstrap'
import './Dashboard.css'
import BookTicketForm from '../features/tickets/BookTicketForm'
import TicketList from '../features/tickets/TicketList'
import BookTicketModal from '../features/tickets/BookTicketModal'

const CitizenDashboard = () => {
  const { user } = useRole()
  const [showBookTicketModal, setShowBookTicketModal] = useState(false)
  const [refreshTicketList, setRefreshTicketList] = useState(0)
 
  const handleBookTicketSuccess = () => {
    setRefreshTicketList(prev => prev + 1)
    setShowBookTicketModal(false)
  }

  return (
    <Container fluid className="dashboard-container">
      <Row className="mb-4">
        <Col>
          <h1>Welcome, {user?.name}!</h1>
          <p>Citizen Dashboard</p>
        </Col>
      </Row>
 
      <Tab.Container id="citizen-tabs" defaultActiveKey="ticket-list">
        <Row className="mb-3">
          <Col sm={12}>
            <Nav variant="tabs">
              <Nav.Item>
                <Nav.Link eventKey="book-ticket">Book Ticket</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="ticket-list">My Tickets</Nav.Link>
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
              <Tab.Pane eventKey="book-ticket">
                <div className="p-4">
                  <h5 className="mb-4">Book a New Ticket</h5>
                  <BookTicketForm 
                    onSuccess={handleBookTicketSuccess}
                  />
                </div>
              </Tab.Pane>
              <Tab.Pane eventKey="ticket-list">
                <div className="p-4">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <h5>My Tickets</h5>
                    <Button 
                      variant="primary" 
                      size="sm"
                      onClick={() => setShowBookTicketModal(true)}
                    >
                      + Book New Ticket
                    </Button>
                  </div>
                  <TicketList key={refreshTicketList} />
                </div>
              </Tab.Pane>
              <Tab.Pane eventKey="profile">
                <div className="p-4">
                  <h5>My Profile</h5>
                  <p className="text-muted">Profile details coming soon...</p>
                </div>
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>

      {/* Book Ticket Modal */}
      <BookTicketModal 
        show={showBookTicketModal}
        onHide={() => setShowBookTicketModal(false)}
        onSuccess={handleBookTicketSuccess}
      />
    </Container>
  )
}
 
export default CitizenDashboard
