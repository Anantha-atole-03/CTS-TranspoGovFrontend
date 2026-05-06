import React from 'react'
import { getRouteId, normalizeId } from '../../../utils/routeUtils'

const scheduleBadge = (status) => {
  const colors = {
    Scheduled: 'primary',
    Delayed: 'warning',
    Cancelled: 'danger',
    Completed: 'success'
  }
  return colors[status] || 'secondary'
}

const ScheduleList = ({ route, schedules, onEdit, onDelete }) => {
  const routeKey = getRouteId(route)
  const routeSchedules = schedules.filter(schedule => normalizeId(schedule.routeID ?? schedule.routeId) === routeKey)

  return (
    <div className="card mb-4">
      <div className="card-header">
        <h5 className="mb-0">Schedules for {route ? route.title : 'selected route'}</h5>
      </div>
      <div className="card-body table-responsive">
        {route ? (
          <table className="table table-striped table-hover align-middle mb-0">
            <thead className="table-light">
              <tr>
                <th>Schedule ID</th>
                <th>Date</th>
                <th>Time</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {routeSchedules.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center text-muted py-4">
                    No schedules have been created for this route yet.
                  </td>
                </tr>
              ) : (
                routeSchedules.map(schedule => (
                  <tr key={schedule.scheduleID ?? schedule.id}>
                    <td>{schedule.scheduleID ?? schedule.id}</td>
                    <td>{schedule.date}</td>
                    <td>{schedule.time}</td>
                    <td>
                      <span className={`badge bg-${scheduleBadge(schedule.status)}`}>
                        {schedule.status}
                      </span>
                    </td>
                    <td>
                      <button className="btn btn-sm btn-outline-warning me-2" onClick={() => onEdit(schedule)}>
                        Edit
                      </button>
                      <button className="btn btn-sm btn-outline-danger" onClick={() => onDelete(schedule.scheduleID ?? schedule.id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        ) : (
          <div className="alert alert-info mb-0">Select a route to see and manage its schedules.</div>
        )}
      </div>
    </div>
  )
}

export default ScheduleList
