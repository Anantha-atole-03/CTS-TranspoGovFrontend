import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import TicketList from './TicketList'
import BookTicket from './BookTicket'

const TicketsManagement = () => {
  const [showBookModal, setShowBookModal] = useState(false)
  const [refreshKey, setRefreshKey] = useState(0)

  const handleBookSuccess = () => {
    setRefreshKey(prev => prev + 1)
  }

  return (
    <div className="container py-4">
      <div className="mb-4 d-flex justify-content-between align-items-center">
        <div>
          <h1>My Tickets</h1>
          <p className="text-muted">Book and manage your travel tickets</p>
        </div>
        <Button
          variant="primary"
          size="lg"
          onClick={() => setShowBookModal(true)}
        >
          + Book New Ticket
        </Button>
      </div>

      <TicketList key={refreshKey} />

      <BookTicket
        show={showBookModal}
        onHide={() => setShowBookModal(false)}
        onSuccess={handleBookSuccess}
      />
    </div>
  )
}

export default TicketsManagement
