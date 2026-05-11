import React from 'react'
import { Table, Button, Card, Alert } from 'react-bootstrap'

const UserManagement = () => {
  const users = []

  return (
    <div>
      <h3 className="mb-4">User Management</h3>
      <Button variant="success" className="mb-3">Add User</Button>
      <Card>
        <Card.Body>
          {users.length === 0 ? (
            <Alert variant="info">No users found</Alert>
          ) : (
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {/* Map users here */}
              </tbody>
            </Table>
          )}
        </Card.Body>
      </Card>
    </div>
  )
}

export default UserManagement