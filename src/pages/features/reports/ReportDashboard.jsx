import React, { useEffect, useState } from 'react';
import { getOperationalDashboard } from '../../../axios/report_analytics_api';
import './ReportDashboard.css';

const ReportDashboard = () => {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getOperationalDashboard();
      console.log('Dashboard response:', response);
      setDashboard(response.data);
    } catch (err) {
      console.error('Error fetching dashboard:', err);
      const errorMessage = err.response?.data?.message || 
                          err.message || 
                          'Failed to load dashboard data. Make sure the backend is running on port 8081';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Loading dashboard...</div>;
  if (error) return (
    <div className="error-section">
      <div className="error">{error}</div>
      <button className="retry-btn" onClick={fetchDashboardData}>
        Retry
      </button>
      <p className="debug-info">
        <small>Debug: Check browser console (F12) for more details. Backend should be at http://localhost:8081</small>
      </p>
    </div>
  );

  return (
    <div className="report-dashboard">
      <div className="dashboard-header">
        <h3>Operational Dashboard</h3>
        <button className="refresh-btn" onClick={fetchDashboardData}>
          Refresh
        </button>
      </div>

      <div className="metrics-grid">
        <div className="metric-card">
          <h4>Active Routes</h4>
          <p className="metric-value">{dashboard?.activeRoutes || 0}</p>
        </div>

        <div className="metric-card">
          <h4>Total Tickets</h4>
          <p className="metric-value">{dashboard?.totalTickets || 0}</p>
        </div>

        <div className="metric-card">
          <h4>Compliance Alerts</h4>
          <p className="metric-value">{dashboard?.complianceAlerts || 0}</p>
        </div>

        <div className="metric-card">
          <h4>Program Efficiency</h4>
          <p className="metric-value">{(dashboard?.programEfficiency || 0).toFixed(2)}%</p>
        </div>
      </div>
    </div>
  );
};

export default ReportDashboard;
