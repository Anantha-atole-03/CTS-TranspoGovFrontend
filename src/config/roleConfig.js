export const ROLES = {
  CITIZEN_PASSENGER: 'CITIZEN_PASSENGER',
  ADMIN: 'ADMIN',
  COMPLIANCE_OFFICER: 'COMPLIANCE_OFFICER',
  TRANSPORT_OFFICER: 'TRANSPORT_OFFICER',
};

export const roleConfig = {
  [ROLES.CITIZEN_PASSENGER]: {
    name: 'CITIZEN_PASSENGER',
    canAccess: ['CitizenDashboard', 'Profile', 'Permits', 'ViewComplaints'],
    canPerform: ['viewOwnData', 'submitComplaint', 'viewPermits'],
  },
  [ROLES.ADMIN]: {
    name: 'ADMIN',
    canAccess: ['Dashboard', 'UserManagement', 'ProgramsResources', 'Reports', 'Settings', 'Compliance', 'Transport'],
    canPerform: ['viewAllData', 'manageUsers', 'generateReports', 'manageRoles'],
  },
  [ROLES.COMPLIANCE_OFFICER]: {
    name: 'COMPLIANCE_OFFICER',
    canAccess: ['Dashboard', 'Complaints', 'Inspections', 'Reports', 'ViewTransport'],
    canPerform: ['viewComplaints', 'createInspection', 'generateReports', 'viewTransportData'],
  },
  [ROLES.TRANSPORT_OFFICER]: {
    name: 'TRANSPORT_OFFICER',
    canAccess: ['Dashboard', 'Permits', 'Vehicles', 'Routes', 'ViewComplaints'],
    canPerform: ['issuePermit', 'manageVehicles', 'manageRoutes', 'viewComplaints'],
  },
};

export const componentPermissions = {
  Dashboard: [ROLES.ADMIN, ROLES.COMPLIANCE_OFFICER, ROLES.TRANSPORT_OFFICER],
  CitizenDashboard: [ROLES.CITIZEN_PASSENGER],
  UserManagement: [ROLES.ADMIN],
  ProgramsResources: [ROLES.ADMIN],
  Reports: [ROLES.ADMIN, ROLES.COMPLIANCE_OFFICER],
  Settings: [ROLES.ADMIN],
  Compliance: [ROLES.ADMIN, ROLES.COMPLIANCE_OFFICER],
  Transport: [ROLES.ADMIN, ROLES.TRANSPORT_OFFICER],
  Profile: [ROLES.CITIZEN_PASSENGER, ROLES.ADMIN],
  Permits: [ROLES.CITIZEN_PASSENGER, ROLES.TRANSPORT_OFFICER],
  ViewComplaints: [ROLES.CITIZEN_PASSENGER, ROLES.COMPLIANCE_OFFICER, ROLES.TRANSPORT_OFFICER],
  Complaints: [ROLES.COMPLIANCE_OFFICER, ROLES.ADMIN],
  Inspections: [ROLES.COMPLIANCE_OFFICER, ROLES.ADMIN],
  Vehicles: [ROLES.TRANSPORT_OFFICER, ROLES.ADMIN],
  Routes: [ROLES.TRANSPORT_OFFICER, ROLES.ADMIN],
  ViewTransport: [ROLES.COMPLIANCE_OFFICER],
};