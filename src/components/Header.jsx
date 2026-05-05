import React from "react"
import { Navbar, Nav, Container, Button, Badge } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import { useRole } from "../hooks/useRole"
import { useDispatch } from "react-redux"
import { logout } from "../redux/slices/authSlice"

const Header = () => {
  const { isAuthenticated, user, role } = useRole()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch(logout())
    navigate("/login")
  }

  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
      <Container fluid>
        <Navbar.Brand as={Link} to="/">
          Govt Transport System
        </Navbar.Brand>

        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/">About</Nav.Link>
            <Nav.Link as={Link} to="/">Contact</Nav.Link>
            {isAuthenticated && (
              <Nav.Link as={Link} to="/dashboard">Dashboard</Nav.Link>
            )}
          </Nav>

          <Nav>
            {!isAuthenticated ? (
              <Button as={Link} to="/login" variant="outline-light">
                Login
              </Button>
            ) : (
              <>
                <span className="text-light me-2">{user?.name}</span>
                <Badge bg="info" className="me-3">{role}</Badge>
                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header