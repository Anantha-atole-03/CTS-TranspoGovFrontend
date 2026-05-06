import React, { useEffect, useState } from 'react'
import { getRouteId } from '../../../utils/routeUtils'

const SCHEDULE_STATUS = ['Scheduled', 'Delayed', 'Cancelled', 'Completed']

const ScheduleForm = ({ route, onSave, scheduleToEdit, onCancel }) => {
	const [schedule, setSchedule] = useState({
		date: '',
		time: '',
		status: 'Scheduled'
	})

	useEffect(() => {
		if (scheduleToEdit) {
			setSchedule(scheduleToEdit)
		} else {
			setSchedule({
				date: '',
				time: '',
				status: 'Scheduled'
			})
		}
	}, [scheduleToEdit])

	const handleChange = (e) => {
		const { name, value } = e.target
		setSchedule(prev => ({ ...prev, [name]: value }))
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		if (!route) return
		if (!schedule.date || !schedule.time) return
		onSave({
			...schedule,
			routeID: getRouteId(route)
		})
		if (!scheduleToEdit) {
			setSchedule({
				date: '',
				time: '',
				status: 'Scheduled'
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
		<div className="card mb-4">
			<div className="card-header">
				<h5 className="mb-0">{scheduleToEdit ? 'Update Schedule' : 'Add Route Schedule'}</h5>
			</div>
			<div className="card-body">
				<form onSubmit={handleSubmit}>
					<div className="row g-3">
						<div className="col-md-4">
							<label className="form-label">Route</label>
							<input type="text" className="form-control" value={route.title} disabled />
						</div>
						<div className="col-md-4">
							<label className="form-label">Date</label>
							<input
								type="date"
								name="date"
								value={schedule.date}
								onChange={handleChange}
								className="form-control"
								required
							/>
						</div>
						<div className="col-md-4">
							<label className="form-label">Time</label>
							<input
								type="time"
								name="time"
								value={schedule.time}
								onChange={handleChange}
								className="form-control"
								required
							/>
						</div>
						<div className="col-md-4">
							<label className="form-label">Status</label>
							<select
								name="status"
								value={schedule.status}
								onChange={handleChange}
								className="form-select"
							>
								{SCHEDULE_STATUS.map(status => (
									<option key={status} value={status}>{status}</option>
								))}
							</select>
						</div>
					</div>
					<div className="mt-3 d-flex gap-2">
						<button type="submit" className="btn btn-success">
							{scheduleToEdit ? 'Save Schedule' : 'Create Schedule'}
						</button>
						{scheduleToEdit && (
							<button type="button" className="btn btn-secondary" onClick={onCancel}>
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
