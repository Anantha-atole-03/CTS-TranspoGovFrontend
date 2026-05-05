import React from 'react';
import { Navigate } from 'react-router-dom';
import { useRole } from '../hooks/useRole';

export const RoleBasedRoute = ({ 
  children, 
  requiredRoles, 
  componentName,
  fallback = null,
}) => {
  const { hasRole, hasPermission, isAuthenticated } = useRole();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  const hasAccess = componentName 
    ? hasPermission(componentName)
    : hasRole(requiredRoles);

  if (!hasAccess) {
    return fallback || <div className="alert alert-danger">You do not have permission to access this page.</div>;
  }

  return children;
};

export default RoleBasedRoute;