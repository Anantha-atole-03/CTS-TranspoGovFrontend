import React, { useState, useEffect } from 'react'
import { Form, Button, Alert, Card, Spinner } from 'react-bootstrap'
import { toast } from 'react-toastify'
import { bookTicket } from '../../../axios/ticket_api'
import { getRoutes } from '../../../axios/route_schedule_api'
import PaymentProcess from './PaymentProcess'

const BookTicketForm = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    routeId: '',
    date: '',
    fareAmount: ''
  })
  const [routes, setRoutes] = useState([])
  const [loading, setLoading] = useState(false)
  const [fetchLoading, setFetchLoading] = useState(false)
  const [errors, setErrors] = useState({})
  const [bookedTicketId, setBookedTicketId] = useState(null)
  const [showPayment, setShowPayment] = useState(false)

  useEffect(() => {
    fetchRoutes()
  }, [])

  const fetchRoutes = async () => {
    try {
      setFetchLoading(true)
      const response = await getRoutes()
      const routesData = response.data.data || response.data || []
      setRoutes(Array.isArray(routesData) ? routesData : [])
    } catch (err) {
      console.error('Failed to fetch routes:', err)
      toast.error('Failed to load routes')
      setRoutes([])
    } finally {
      setFetchLoading(false)
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.routeId) {
      newErrors.routeId = 'Please select a route'
    }

    if (!formData.date) {
      newErrors.date = 'Date and time are required'
    } else if (new Date(formData.date) <= new Date()) {
      newErrors.date = 'Please select a future date and time'
    }

    if (!formData.fareAmount) {
      newErrors.fareAmount = 'Fare amount is required'
    } else if (isNaN(formData.fareAmount) || parseFloat(formData.fareAmount) <= 0) {
      newErrors.fareAmount = 'Fare amount must be positive'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))

    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    try {
      setLoading(true)
      const payload = {
        routeId: parseInt(formData.routeId),
        date: formData.date,
        fareAmount: parseFloat(formData.fareAmount)
      }

      const response = await bookTicket(payload)
      const ticketData = response.data.data || response.data
      
      toast.success('Ticket booked successfully! Proceeding to payment...')
      setBookedTicketId(ticketData.ticketId)
      setShowPayment(true)
    } catch (err) {
      console.error('Error booking ticket:', err)
      toast.error(err.response?.data?.message || 'Failed to book ticket')
    } finally {
      setLoading(false)
    }
  }

  const handlePaymentSuccess = () => {
    setFormData({
      routeId: '',
      date: '',
      fareAmount: ''
    })
    setErrors({})
    setBookedTicketId(null)
    setShowPayment(false)
    if (onSuccess) onSuccess()
  }

  const handlePaymentCancel = () => {
    setShowPayment(false)
    setBookedTicketId(null)
  }

  if (showPayment && bookedTicketId) {
    return (
      <PaymentProcess 
        ticketId={bookedTicketId}
        fareAmount={formData.fareAmount}
        onSuccess={handlePaymentSuccess}
        onCancel={handlePaymentCancel}
      />
    )
  }

  return (
    <Card className="shadow-sm">
      <Card.Body>
        {Object.keys(errors).length > 0 && (
          <Alert variant="danger" className="mb-3">
            <strong>Please fix the following errors:</strong>
            <ul className="mb-0 mt-2">
              {Object.values(errors).map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </Alert>
        )}

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Select Route *</Form.Label>
            {fetchLoading ? (
              <Form.Control disabled placeholder="Loading routes..." />
            ) : (
              <Form.Select
                name="routeId"
                value={formData.routeId}
                onChange={handleChange}
                isInvalid={!!errors.routeId}
                required
              >
                <option value="">Choose a route...</option>
                {routes.map(route => (
                  <option key={route.routeId} value={route.routeId}>
                    {route.title} ({route.type}) - {route.startPoint} to {route.endPoint}
                  </option>
                ))}
              </Form.Select>
            )}
            <Form.Control.Feedback type="invalid">
              {errors.routeId}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Date & Time *</Form.Label>
            <Form.Control
              type="datetime-local"
              name="date"
              value={formData.date}
              onChange={handleChange}
              isInvalid={!!errors.date}
              required
            />
            <Form.Control.Feedback type="invalid">
              {errors.date}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Fare Amount (₹) *</Form.Label>
            <Form.Control
              type="number"
              name="fareAmount"
              value={formData.fareAmount}
              onChange={handleChange}
              placeholder="Enter fare amount"
              step="0.01"
              min="0"
              isInvalid={!!errors.fareAmount}
              required
            />
            <Form.Control.Feedback type="invalid">
              {errors.fareAmount}
            </Form.Control.Feedback>
          </Form.Group>

          <Button
            variant="primary"
            type="submit"
            disabled={loading || fetchLoading}
            size="lg"
            className="w-100"
          >
            {loading ? (
              <>
                <Spinner animation="border" size="sm" className="me-2" />
                Booking...
              </>
            ) : (
              'Proceed to Booking'
            )}
          </Button>
        </Form>
      </Card.Body>
    </Card>
  )
}

export default BookTicketForm
