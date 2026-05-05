//  it is model that open in popup when user click on view button in program list page
// has close button to close the modal
import { toast } from "react-toastify"
import { getProgramById,changeProgramStatus } from "../../../axios/program_resource_api"
import { useState, useEffect } from "react"
import { Modal } from "react-bootstrap"

function ViewProgram({ programId, onClose, show }) {
  const [program, setProgram] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A'
    try {
      const date = new Date(dateString)
      return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      })
    } catch (e) {
      return dateString
    }
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

  const fetchProgramDetails = async () => {
    try {
      setLoading(true)
      const response = await getProgramById(programId)
      setProgram(response.data.data || response.data)
      setError(null)
    } catch (err) {
      if (err.status === 401 || err.status === 403) {
        setError('Unauthorized access. Please log in again.')
        toast.error('Unauthorized access')
      } else {
        setError('Failed to fetch program details. Please try again later.')
        toast.error('Failed to fetch program details')
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (show && programId) {
      fetchProgramDetails()
    }
  }, [programId, show])

  //change status
    const handleChangeStatus = async (newStatus) => {
    try {
        setLoading(true);
        await changeProgramStatus(programId, newStatus);
        setProgram(prev => ({ ...prev, status: newStatus }));
        toast.success('Program status updated successfully');
    } catch (err) {
        
        if (err.status === 401 || err.status === 403) {
            setError('Unauthorized access. Please log in again.');
            toast.error('Unauthorized access');
        } else {
            console.error('Error updating program status:', err);
            setError('Failed to update program status. Please try again later.');
            toast.error('Failed to update program status');
        }
    } finally {
        setLoading(false);
    }
}


  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Program Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {loading ? (
          <p className="text-center">Loading...</p>
        ) : error ? (
          <p className="text-danger text-center">{error}</p>
        ) : program ? (
          <div>
            <h6 className="mb-3">{program.title}</h6>
            <p className="mb-2"><strong>Description:</strong> {program.description}</p>
            <p className="mb-2"><strong>Start Date:</strong> {formatDate(program.startDate)}</p>
            <p className="mb-2"><strong>End Date:</strong> {formatDate(program.endDate)}</p>
            <p className="mb-2"><strong>Budget:</strong> ${parseFloat(program.budget).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
            <p className="mb-2">
              <strong>Status:</strong> 
              <span className={`badge bg-${getStatusColor(program.status)} ms-2`}>
                {getStatusLabel(program.status)}
              </span>

              {/* change resource status dropdown and confirm Button */}
                <div className="mt-3">
                <label htmlFor="statusSelect" className="form-label">Change Status:</label>
                <select 
                    id="statusSelect"
                    className="form-select"
                    value={program.status}
                    onChange={(e) => handleChangeStatus(e.target.value)}
                >
                    <option value="DRAFT">Draft</option>
                    <option value="SUBMITTED">Submitted</option>
                    <option value="APPROVED">Approved</option>
                    <option value="IN_PROGRESS">In Progress</option>
                    <option value="COMPLETED">Completed</option>
                    <option value="ON_HOLD">On Hold</option>
                    <option value="CANCELLED">Cancelled</option>
                </select>
            </div>
            </p>
          </div>
        ) : (
          <p className="text-center">Program not found.</p>
        )}
      </Modal.Body>
    </Modal>
  )
}

export default ViewProgram