import { useSelector } from 'react-redux';
import { roleConfig, componentPermissions } from '../config/roleConfig';
 
export const useRole = () => {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const role = user?.role || localStorage.getItem('user')?.role || null;
 
 
 
  const hasRole = (requiredRole) => {
    if (!isAuthenticated) return false;
    if (Array.isArray(requiredRole)) {
      return requiredRole.includes(role);
    }
    return role === requiredRole;
  };
 
  const hasPermission = (component) => {
    if (!isAuthenticated) return false;
    const allowedRoles = componentPermissions[component];
    return allowedRoles ? allowedRoles.includes(role) : false;
  };
 
  const canPerform = (action) => {
    if (!isAuthenticated) return false;
    const userConfig = roleConfig[role];
    return userConfig ? userConfig.canPerform.includes(action) : false;
  };
 
  const canAccess = (component) => {
    if (!isAuthenticated) return false;
    const userConfig = roleConfig[role];
    return userConfig ? userConfig.canAccess.includes(component) : false;
  };
 
  return {
    role,
    user,
    isAuthenticated,
    hasRole,
    hasPermission,
    canPerform,
    canAccess,
    roleConfig: roleConfig[role],
  };
};
 