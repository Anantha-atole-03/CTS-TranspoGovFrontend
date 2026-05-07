import React, { useState } from 'react'
import { ROUTE_STATUS, STATUS_LABELS, STATUS_OPTIONS } from '../../../utils/statusConstants'

const ROUTE_TYPES = ['Bus', 'Metro', 'Train']

const CreateRouteForm = ({ onSave, onCancel }) => {
    const initialState = {
        title: '',
        type: 'Bus',
        startPoint: '',
        endPoint: '',
        status: ROUTE_STATUS.DRAFT // Default status
    }

    const [route, setRoute] = useState(initialState)

    const handleChange = (e) => {
        const { name, value } = e.target
        setRoute(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!route.title || !route.startPoint || !route.endPoint) return // Ensure required fields are filled

        // Send the route object without routeId
        onSave(route)

        setRoute(initialState) // Reset form after successful creation
    }

    return (
        <div className="card mb-4 shadow-sm">
            <div className="card-header bg-light">
                <h5 className="mb-0">Create New Route</h5>
            </div>
            <div className="card-body">
                <form onSubmit={handleSubmit}>
                    <div className="row g-3">
                        <div className="col-md-6">
                            <label className="form-label fw-bold">Route Title</label>
                            <input
                                type="text"
                                name="title"
                                value={route.title}
                                onChange={handleChange}
                                className="form-control"
                                placeholder="e.g. Downtown Circular"
                                required
                            />
                        </div>

                        <div className="col-md-6">
                            <label className="form-label fw-bold">Transport Type</label>
                            <select
                                name="type"
                                value={route.type}
                                onChange={handleChange}
                                className="form-select"
                            >
                                {ROUTE_TYPES.map(type => (
                                    <option key={type} value={type}>{type}</option>
                                ))}
                            </select>
                        </div>

                        <div className="col-md-6">
                            <label className="form-label fw-bold">Start Point</label>
                            <input
                                type="text"
                                name="startPoint"
                                value={route.startPoint}
                                onChange={handleChange}
                                className="form-control"
                                required
                            />
                        </div>

                        <div className="col-md-6">
                            <label className="form-label fw-bold">End Point</label>
                            <input
                                type="text"
                                name="endPoint"
                                value={route.endPoint}
                                onChange={handleChange}
                                className="form-control"
                                required
                            />
                        </div>

                        <div className="col-md-6">
                            <label className="form-label fw-bold">Status</label>
                            <select
                                name="status"
                                value={route.status}
                                onChange={handleChange}
                                className="form-select"
                            >
                                {STATUS_OPTIONS.map(option => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="mt-4 d-flex gap-2">
                        <button type="submit" className="btn btn-primary">
                            Create Route
                        </button>
                        <button
                            type="button"
                            className="btn btn-outline-secondary"
                            onClick={onCancel}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CreateRouteForm