export const ROLES = {
  CITIZEN_PASSENGER: 'CITIZEN_PASSENGER',
  TRANSPORT_OFFICER: 'TRANSPORT_OFFICER',
  PROGRAM_MANAGER: 'PROGRAM_MANAGER',
  ADMINISTRATOR: 'ADMINISTRATOR',
  COMPLIANCE_OFFICER: 'COMPLIANCE_OFFICER',
  GOVERNMENT_AUDITOR: 'GOVERNMENT_AUDITOR',
};
 
export const roleConfig = {
  [ROLES.CITIZEN_PASSENGER]: {
    name: 'CITIZEN_PASSENGER',
    canAccess: ['CitizenDashboard', 'Profile', 'Permits', 'ViewComplaints'],
    canPerform: ['viewOwnData', 'submitComplaint', 'viewPermits'],
  },
  [ROLES.TRANSPORT_OFFICER]: {
    name: 'Transport Officer',
    canAccess: ['Dashboard', 'Permits', 'Vehicles', 'Routes', 'ViewComplaints', 'ProgramsResources'],
    canPerform: ['issuePermit', 'manageVehicles', 'manageRoutes', 'viewComplaints', 'allocateResources', 'viewAnalytics'],
  },
  [ROLES.PROGRAM_MANAGER]: {
    name: 'Program Manager',
    canAccess: ['Dashboard', 'ProgramsResources', 'Reports', 'Compliance', 'ViewTransport'],
    canPerform: ['managePrograms', 'manageResources', 'generateReports', 'allocateResources', 'viewAnalytics', 'approveResources'],
  },
  [ROLES.ADMINISTRATOR]: {
    name: 'Administrator',
    canAccess: ['Dashboard', 'UserManagement', 'ProgramsResources', 'Reports', 'Settings', 'Compliance', 'Transport', 'Audits'],
    canPerform: ['viewAllData', 'manageUsers', 'generateReports', 'manageRoles', 'manageVehicles', 'allocateResources', 'analyzeResources', 'managePrograms', 'createAudit', 'viewAuditData', 'editAudit'],
  },
  [ROLES.COMPLIANCE_OFFICER]: {
    name: 'Compliance Officer',
    canAccess: ['Dashboard', 'Complaints', 'Inspections', 'Reports', 'ViewTransport', 'Audits'],
    canPerform: ['viewComplaints', 'createInspection', 'generateReports', 'viewTransportData', 'viewAnalytics', 'createAudit', 'viewAuditData'],
  },
  [ROLES.GOVERNMENT_AUDITOR]: {
    name: 'Government Auditor',
    canAccess: ['Dashboard', 'Reports', 'Audits', 'Compliance', 'ViewTransport'],
    canPerform: ['generateReports', 'viewAnalytics', 'createAudit', 'viewAuditData', 'viewComplianceData'],
  },
};
 
export const componentPermissions = {
  Dashboard: [ROLES.ADMINISTRATOR, ROLES.COMPLIANCE_OFFICER, ROLES.TRANSPORT_OFFICER, ROLES.PROGRAM_MANAGER, ROLES.GOVERNMENT_AUDITOR],
  CitizenDashboard: [ROLES.CITIZEN_PASSENGER],
  UserManagement: [ROLES.ADMINISTRATOR],
  ProgramsResources: [ROLES.ADMINISTRATOR, ROLES.PROGRAM_MANAGER, ROLES.TRANSPORT_OFFICER],
  Reports: [ROLES.ADMINISTRATOR, ROLES.COMPLIANCE_OFFICER, ROLES.PROGRAM_MANAGER, ROLES.GOVERNMENT_AUDITOR],
  Settings: [ROLES.ADMINISTRATOR],
  Compliance: [ROLES.ADMINISTRATOR, ROLES.COMPLIANCE_OFFICER, ROLES.GOVERNMENT_AUDITOR],
  Transport: [ROLES.ADMINISTRATOR, ROLES.TRANSPORT_OFFICER],
  Audits: [ROLES.ADMINISTRATOR, ROLES.COMPLIANCE_OFFICER, ROLES.GOVERNMENT_AUDITOR],
  Profile: [ROLES.CITIZEN_PASSENGER, ROLES.ADMINISTRATOR],
  Permits: [ROLES.CITIZEN_PASSENGER, ROLES.TRANSPORT_OFFICER],
  ViewComplaints: [ROLES.CITIZEN_PASSENGER, ROLES.COMPLIANCE_OFFICER, ROLES.TRANSPORT_OFFICER],
  Complaints: [ROLES.COMPLIANCE_OFFICER, ROLES.ADMINISTRATOR],
  Inspections: [ROLES.COMPLIANCE_OFFICER, ROLES.ADMINISTRATOR],
  Vehicles: [ROLES.TRANSPORT_OFFICER, ROLES.ADMINISTRATOR],
  Routes: [ROLES.TRANSPORT_OFFICER, ROLES.ADMINISTRATOR],
  ViewTransport: [ROLES.COMPLIANCE_OFFICER, ROLES.GOVERNMENT_AUDITOR],
  ResourceManagement: [ROLES.ADMINISTRATOR, ROLES.TRANSPORT_OFFICER, ROLES.PROGRAM_MANAGER],
};
 
















// export const ROLES = {
//   CITIZEN_PASSENGER: 'CITIZEN_PASSENGER',
//   ADMIN: 'ADMIN',
//   COMPLIANCE_OFFICER: 'COMPLIANCE_OFFICER',
//   TRANSPORT_OFFICER: 'TRANSPORT_OFFICER',
// };

// export const roleConfig = {
//   [ROLES.CITIZEN_PASSENGER]: {
//     name: 'CITIZEN_PASSENGER',
//     canAccess: ['CitizenDashboard', 'Profile', 'Permits', 'ViewComplaints'],
//     canPerform: ['viewOwnData', 'submitComplaint', 'viewPermits'],
//   },
//   [ROLES.ADMIN]: {
//     name: 'ADMIN',
//     canAccess: ['Dashboard', 'UserManagement', 'ProgramsResources', 'Reports', 'Settings', 'Compliance', 'Transport'],
//     canPerform: ['viewAllData', 'manageUsers', 'generateReports', 'manageRoles'],
//   },
//   [ROLES.COMPLIANCE_OFFICER]: {
//     name: 'COMPLIANCE_OFFICER',
//     canAccess: ['Dashboard', 'Complaints', 'Inspections', 'Reports', 'ViewTransport'],
//     canPerform: ['viewComplaints', 'createInspection', 'generateReports', 'viewTransportData'],
//   },
//   [ROLES.TRANSPORT_OFFICER]: {
//     name: 'TRANSPORT_OFFICER',
//     canAccess: ['Dashboard', 'Permits', 'Vehicles', 'Routes', 'ViewComplaints'],
//     canPerform: ['issuePermit', 'manageVehicles', 'manageRoutes', 'viewComplaints'],
//   },
// };

// export const componentPermissions = {
//   Dashboard: [ROLES.ADMIN, ROLES.COMPLIANCE_OFFICER, ROLES.TRANSPORT_OFFICER],
//   CitizenDashboard: [ROLES.CITIZEN_PASSENGER],
//   UserManagement: [ROLES.ADMIN],
//   ProgramsResources: [ROLES.ADMIN],
//   Reports: [ROLES.ADMIN, ROLES.COMPLIANCE_OFFICER],
//   Settings: [ROLES.ADMIN],
//   Compliance: [ROLES.ADMIN, ROLES.COMPLIANCE_OFFICER],
//   Transport: [ROLES.ADMIN, ROLES.TRANSPORT_OFFICER],
//   Profile: [ROLES.CITIZEN_PASSENGER, ROLES.ADMIN],
//   Permits: [ROLES.CITIZEN_PASSENGER, ROLES.TRANSPORT_OFFICER],
//   ViewComplaints: [ROLES.CITIZEN_PASSENGER, ROLES.COMPLIANCE_OFFICER, ROLES.TRANSPORT_OFFICER],
//   Complaints: [ROLES.COMPLIANCE_OFFICER, ROLES.ADMIN],
//   Inspections: [ROLES.COMPLIANCE_OFFICER, ROLES.ADMIN],
//   Vehicles: [ROLES.TRANSPORT_OFFICER, ROLES.ADMIN],
//   Routes: [ROLES.TRANSPORT_OFFICER, ROLES.ADMIN],
//   ViewTransport: [ROLES.COMPLIANCE_OFFICER],
// };