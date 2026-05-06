import React, { useState } from 'react';
import { runCustomReport, getJobStatus } from '../../../axios/report_analytics_api';
import './CustomReportGenerator.css';

const CustomReportGenerator = () => {
  const [scope, setScope] = useState('ROUTE');
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [jobId, setJobId] = useState(null);

  const reportScopes = ['ROUTE', 'TICKET', 'PROGRAM', 'COMPLIANCE'];

  const handleGenerateReport = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('Generating report for scope:', scope);
      const response = await runCustomReport(scope);
      console.log('Report generated:', response);
      setReport(response.data);
      setJobId(response.data.reportId);
    } catch (err) {
      console.error('Error generating report:', err);
      const errorMessage = err.response?.data?.message || 
                          err.message || 
                          'Failed to generate report. Check backend is running.';
      setError(errorMessage);
      setReport(null);
    } finally {
      setLoading(false);
    }
  };

  const handleCheckStatus = async () => {
    if (!jobId) {
      setError('No report generated yet');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      console.log('Checking status for jobId:', jobId);
      const response = await getJobStatus(jobId);
      console.log('Status response:', response);
      setReport(response.data);
    } catch (err) {
      console.error('Error fetching report status:', err);
      const errorMessage = err.response?.data?.message || 
                          err.message || 
                          'Failed to fetch report status';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="custom-report-generator">
      <div className="form-section">
        <h3>Generate Custom Report</h3>

        <div className="form-group">
          <label>Select Report Scope:</label>
          <select 
            value={scope} 
            onChange={(e) => setScope(e.target.value)}
            disabled={loading}
          >
            {reportScopes.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        <div className="button-group">
          <button 
            onClick={handleGenerateReport} 
            disabled={loading}
            className="btn-generate"
          >
            {loading ? 'Generating...' : 'Generate Report'}
          </button>

          <button 
            onClick={handleCheckStatus} 
            disabled={loading || !jobId}
            className="btn-check"
          >
            Check Status
          </button>
        </div>
      </div>

      {error && (
        <div className="error-section">
          <div className="error-message">{error}</div>
          <p className="debug-info">
            <small>Debug: Check browser console (F12). Backend endpoint: /report/custom/run</small>
          </p>
        </div>
      )}

      {report && (
        <div className="report-result">
          <h4>Report Details</h4>
          <div className="result-grid">
            <div className="result-item">
              <span className="label">Report ID:</span>
              <span className="value">{report.reportId}</span>
            </div>
            <div className="result-item">
              <span className="label">Scope:</span>
              <span className="value">{report.scope}</span>
            </div>
            <div className="result-item">
              <span className="label">Status:</span>
              <span className={`status status-${report.status?.toLowerCase()}`}>
                {report.status}
              </span>
            </div>
            <div className="result-item">
              <span className="label">Generated Date:</span>
              <span className="value">
                {new Date(report.generatedDate).toLocaleString()}
              </span>
            </div>
          </div>

          <div className="metrics-section">
            <h5>Metrics Data:</h5>
            <pre className="metrics-data">
              {JSON.stringify(JSON.parse(report.metrics), null, 2)}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomReportGenerator;
