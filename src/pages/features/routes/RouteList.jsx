import React from 'react'
import { STATUS_COLORS, STATUS_LABELS } from '../../../utils/statusConstants'
import { getRouteId } from '../../../utils/routeUtils'

const statusBadge = (status) => {
  return STATUS_COLORS[status] || 'secondary'
}

const RouteList = ({ routes, selectedRouteID, onEdit, onDelete, onSelect, onAdd, onView }) => {
  return (
    <div className="card mb-4">
      <div className="card-header d-flex justify-content-between align-items-center">
        <h5 className="mb-0">Routes</h5>
        <button className="btn btn-primary btn-sm" onClick={onAdd}>
          Add New Route
        </button>
      </div>
      <div className="card-body table-responsive">
        <table className="table table-hover align-middle">
          <thead className="table-light">
            <tr>
              <th>Route ID</th>
              <th>Title</th>
              <th>Type</th>
              <th>From</th>
              <th>To</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {routes.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center text-muted py-4">
                  No routes defined yet.
                </td>
              </tr>
            ) : (
              routes.map(route => {
                const routeKey = getRouteId(route)
                return (
                  <tr
                    key={routeKey}
                    className={routeKey === selectedRouteID ? 'table-primary' : ''}
                  >
                    <td>{routeKey}</td>
                    <td>{route.title}</td>
                    <td>{route.type}</td>
                    <td>{route.startPoint}</td>
                    <td>{route.endPoint}</td>
                    <td>
                      <span className={`badge bg-${statusBadge(route.status)}`}>
                        {STATUS_LABELS[route.status] || route.status}
                      </span>
                    </td>
                    <td>
                      <button className="btn btn-sm btn-outline-info me-2" onClick={() => onView && onView(route)}>
                        View
                      </button>
                      <button className="btn btn-sm btn-outline-primary me-2" onClick={() => onSelect(routeKey)}>
                        Select
                      </button>
                      <button className="btn btn-sm btn-outline-warning me-2" onClick={() => onEdit(route)}>
                        Edit
                      </button>
                      <button className="btn btn-sm btn-outline-danger" onClick={() => onDelete(routeKey)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                )
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default RouteList
