// report-analytics.api.js
import api from '../config/axios.config';

/* ================= REPORT APIs ================= */

/**
 * Fetches the operational dashboard metrics
 * @returns {Promise} Dashboard details with active routes, tickets, compliance alerts, program efficiency
 */
export const getOperationalDashboard = async () => {
  try {
    console.log('Fetching dashboard from: /report/operations');
    return await api.get('/report/operations');
  } catch (error) {
    console.error('Dashboard API error:', error);
    throw error;
  }
};

/**
 * Runs a custom report based on scope
 * @param {string} scope - Report scope (ROUTE, TICKET, PROGRAM, COMPLIANCE)
 * @returns {Promise} Report response with reportId, metrics, status, generatedDate
 */
export const runCustomReport = async (scope) => {
  try {
    console.log('Running report with scope:', scope);
    return await api.post('/report/custom/run', { scope });
  } catch (error) {
    console.error('Run report API error:', error);
    throw error;
  }
};

/**
 * Fetches the status and result of a generated report
 * @param {number} jobId - The report job identifier
 * @returns {Promise} Report details with metrics and completion status
 */
export const getJobStatus = async (jobId) => {
  try {
    console.log('Fetching job status for:', jobId);
    return await api.get(`/report/custom/jobs/${jobId}`);
  } catch (error) {
    console.error('Job status API error:', error);
    throw error;
  }
};
