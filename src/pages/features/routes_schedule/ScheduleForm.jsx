import React, { useEffect, useState } from 'react'
import { getRouteId } from '../../../utils/routeUtils'
import { toast } from 'react-toastify'

const SCHEDULE_STATUS_OPTIONS = [
	{ value: 'SCHEDULED', label: 'Scheduled' },
	{ value: 'CANCELLED', label: 'Cancelled' },
	{ value: 'COMPLETED', label: 'Completed' }
]

const ScheduleForm = ({ route, onSave, scheduleToEdit, onCancel }) => {
	const [schedule, setSchedule] = useState({
		date: '',
		time: '',
		status: 'SCHEDULED'
	})
	const [errors, setErrors] = useState({})

	useEffect(() => {
		if (scheduleToEdit) {
			// Format date and time from response if needed
			const formattedSchedule = {
				scheduleId: scheduleToEdit.scheduleId,
				date: scheduleToEdit.date || '',
				time: scheduleToEdit.time || '',
				status: scheduleToEdit.status || 'SCHEDULED', // Ensure SCHEDULED is the default
				routeId: scheduleToEdit.routeId || getRouteId(route)
			}
			setSchedule(formattedSchedule)
		} else {
			setSchedule({
				date: '',
				time: '',
				status: 'SCHEDULED' // Default to SCHEDULED, not CANCELLED
			})
		}
		setErrors({})
	}, [scheduleToEdit, route])

	const validateForm = () => {
		const newErrors = {}

		if (!schedule.date) {
			newErrors.date = 'Date is required'
		}

		if (!schedule.time) {
			newErrors.time = 'Time is required'
		}

		if (!schedule.status) {
			newErrors.status = 'Status is required'
		}

		setErrors(newErrors)
		return Object.keys(newErrors).length === 0
	}

	const handleChange = (e) => {
		const { name, value } = e.target
		setSchedule(prev => ({ ...prev, [name]: value }))
		
		// Clear error for this field
		if (errors[name]) {
			setErrors(prev => ({
				...prev,
				[name]: ''
			}))
		}
	}

	const handleSubmit = (e) => {
		e.preventDefault()

		if (!route) {
			toast.error('Please select a route')
			return
		}

		if (!validateForm()) {
			return
		}

		const payloadToSend = scheduleToEdit 
			? {
				...schedule,
				scheduleId: scheduleToEdit.scheduleId,
				routeId: scheduleToEdit.routeId || getRouteId(route)
			}
			: {
				date: schedule.date,
				time: schedule.time,
				status: schedule.status,
				routeId: getRouteId(route)
			}

		onSave(payloadToSend)

		if (!scheduleToEdit) {
			setSchedule({
				date: '',
				time: '',
				status: 'SCHEDULED'
			})
		}
	}

	if (!route) {
		return (
			<div className="alert alert-info">
				Select a route from the list above to manage its schedules.
			</div>
		)
	}

	return (
		<div className="card mb-4 shadow-sm">
			<div className="card-header bg-light">
				<h5 className="mb-0">{scheduleToEdit ? 'Update Schedule' : 'Add Route Schedule'}</h5>
			</div>
			<div className="card-body">
				{Object.keys(errors).length > 0 && (
					<div className="alert alert-danger mb-3">
						<strong>Please fix the following errors:</strong>
						<ul className="mb-0 mt-2">
							{Object.values(errors).map((error, index) => (
								<li key={index}>{error}</li>
							))}
						</ul>
					</div>
				)}

				<form onSubmit={handleSubmit}>
					<div className="row g-3">
						<div className="col-md-4">
							<label className="form-label fw-bold">Route</label>
							<input 
								type="text" 
								className="form-control" 
								value={route.title} 
								disabled 
							/>
						</div>

						<div className="col-md-4">
							<label className="form-label fw-bold">Date *</label>
							<input
								type="date"
								name="date"
								value={schedule.date}
								onChange={handleChange}
								className={`form-control ${errors.date ? 'is-invalid' : ''}`}
								required
							/>
							{errors.date && <div className="invalid-feedback d-block">{errors.date}</div>}
						</div>

						<div className="col-md-4">
							<label className="form-label fw-bold">Time *</label>
							<input
								type="time"
								name="time"
								value={schedule.time}
								onChange={handleChange}
								className={`form-control ${errors.time ? 'is-invalid' : ''}`}
								required
							/>
							{errors.time && <div className="invalid-feedback d-block">{errors.time}</div>}
						</div>

						<div className="col-md-4">
							<label className="form-label fw-bold">Status *</label>
							<select
								name="status"
								value={schedule.status}
								onChange={handleChange}
								className={`form-select ${errors.status ? 'is-invalid' : ''}`}
								required
							>
								<option value="">Select Status</option>
								{SCHEDULE_STATUS_OPTIONS.map(option => (
									<option key={option.value} value={option.value}>
										{option.label}
									</option>
								))}
							</select>
							{errors.status && <div className="invalid-feedback d-block">{errors.status}</div>}
						</div>
					</div>

					<div className="mt-4 d-flex gap-2">
						<button type="submit" className="btn btn-success">
							{scheduleToEdit ? 'Save Changes' : 'Create Schedule'}
						</button>
						{scheduleToEdit && (
							<button 
								type="button" 
								className="btn btn-outline-secondary" 
								onClick={onCancel}
							>
								Cancel
							</button>
						)}
					</div>
				</form>
			</div>
		</div>
	)
}

export default ScheduleForm
