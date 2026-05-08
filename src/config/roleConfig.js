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