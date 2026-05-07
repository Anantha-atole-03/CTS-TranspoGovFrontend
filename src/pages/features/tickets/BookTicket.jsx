import React, { useState, useEffect } from 'react'
import { Modal, Button, Form, Spinner, Alert } from 'react-bootstrap'
import { toast } from 'react-toastify'
import { bookTicket } from '../../../axios/ticket_api'
import { getRoutes } from '../../../axios/route_schedule_api'
import { decodeJwt } from '../../../services/AuthService'   

const BookTicket = ({ show, onHide, onSuccess }) => {
  const [formData, setFormData] = useState({
    routeId: '',
    date: '',
    fareAmount: ''
  })
  const [routes, setRoutes] = useState([])
  const [loading, setLoading] = useState(false)
  const [fetchLoading, setFetchLoading] = useState(false)
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (show) {
      fetchRoutes()
    }
  }, [show])

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

      await bookTicket(payload)
      toast.success('Ticket booked successfully!')
      setFormData({
        routeId: '',
        date: '',
        fareAmount: ''
      })
      onSuccess()
      onHide()
    } catch (err) {
      console.error('Error booking ticket:', err)
      toast.error(err.response?.data?.message || 'Failed to book ticket')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Modal show={show} onHide={onHide} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Book New Ticket</Modal.Title>
      </Modal.Header>
      <Modal.Body>
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
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide} disabled={loading || fetchLoading}>
          Cancel
        </Button>
        <Button
          variant="primary"
          onClick={handleSubmit}
          disabled={loading || fetchLoading}
        >
          {loading ? (
            <>
              <Spinner animation="border" size="sm" className="me-2" />
              Booking...
            </>
          ) : (
            'Book Ticket'
          )}
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default BookTicket
