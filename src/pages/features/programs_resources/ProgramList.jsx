import React, { useEffect, useState } from 'react'
import { getPrograms } from '../../../axios/program_resource_api'
import { toast } from "react-toastify"
import { logout } from "../../../utils/authUtil"
import { useDispatch } from 'react-redux'
import ViewProgram from './ViewProgram'
import UpdateProgram from './UpdateProgram'

function ProgramList() {
  const [programs, setPrograms] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const dispatch = useDispatch()
  const [showViewModal, setShowViewModal] = useState(false)
  const [showUpdateModal, setShowUpdateModal] = useState(false)
  const [selectedProgramId, setSelectedProgramId] = useState(null)

  const fetchPrograms = async () => {
    try {
      const response = await getPrograms()
      setPrograms(response.data.data || response.data)
      setError(null)
      console.log(response)
    } catch (err) {
      if (err.status === 401 || err.status === 403) {
        setError('Unauthorized access. Please log in again.')
        toast.error('Unauthorized access. Please log in again.')
        logout()
      } else {
        setError('Failed to fetch programs. Please try again later.')
        toast.error('Failed to fetch programs')
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPrograms()
  }, [])

  // Open view modal
  const handleView = (programId) => {
    setSelectedProgramId(programId)
    setShowViewModal(true)
  }

  // Close view modal
  const handleClose = () => {
    setShowViewModal(false)
    setSelectedProgramId(null)
  }

  // Open update modal
  const handleUpdate = (programId) => {
    setSelectedProgramId(programId)
    setShowUpdateModal(true)
  }

  // Close update modal
  const handleUpdateClose = () => {
    setShowUpdateModal(false)
    setSelectedProgramId(null)
  }

  // Handle successful update
  const handleUpdateSuccess = () => {
    fetchPrograms()
  }

  const handleDelete = (programId) => {
    toast.info('Delete functionality coming soon')
  }

  const getStatusColor = (status) => {
    const statusColors = {
      DRAFT: 'secondary',
      SUBMITTED: 'info',
      APPROVED: 'success',
      IN_PROGRESS: 'primary',
      COMPLETED: 'success',
      ON_HOLD: 'warning',
      CANCELLED: 'danger'
    }
    return statusColors[status] || 'secondary'
  }

  const getStatusLabel = (status) => {
    const statusLabels = {
      DRAFT: 'Draft',
      SUBMITTED: 'Submitted',
      APPROVED: 'Approved',
      IN_PROGRESS: 'In Progress',
      COMPLETED: 'Completed',
      ON_HOLD: 'On Hold',
      CANCELLED: 'Cancelled'
    }
    return statusLabels[status] || status
  }

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Program List</h2>
      {loading ? (
        <p>Loading programs...</p>
      ) : error ? (
        <p className="text-danger">{error}</p>
      ) : programs.length === 0 ? (
        <p className="text-muted">No programs found.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead className="table-dark">
              <tr>
                <th>Id</th>
                <th>Title</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {programs.map((program) => (
                <tr key={program.programId}>
                  <td>{program.programId}</td>
                  <td>{program.title}</td>
                  <td>
                    {new Date(program.startDate).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'short', 
                      day: 'numeric' 
                    })}
                  </td>
                  <td>
                    {new Date(program.endDate).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'short', 
                      day: 'numeric' 
                    })}
                  </td>
                  <td>
                    <span className={`badge bg-${getStatusColor(program.status)}`}>
                      {getStatusLabel(program.status)}
                    </span>
                  </td>
                  <td>
                    <button
                      className="btn btn-sm btn-primary me-2"
                      onClick={() => handleView(program.programId)}
                    >
                      View
                    </button>
                    <button
                      className="btn btn-sm btn-warning me-2"
                      onClick={() => handleUpdate(program.programId)}
                    >
                      Update
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(program.programId)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* View Program Modal */}
      <ViewProgram
        programId={selectedProgramId}
        onClose={handleClose}
        show={showViewModal}
      />

      {/* Update Program Modal */}
      <UpdateProgram
        programId={selectedProgramId}
        onClose={handleUpdateClose}
        show={showUpdateModal}
        onUpdate={handleUpdateSuccess}
      />
    </div>
  )
}

export default ProgramList
