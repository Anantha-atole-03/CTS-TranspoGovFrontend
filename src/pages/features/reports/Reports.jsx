import React, { useState } from 'react';
import ReportDashboard from './ReportDashboard';
import CustomReportGenerator from './CustomReportGenerator';
import './Reports.css';

const Reports = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="reports-container">
      <h2>Reports & Analytics</h2>
      
      <div className="tab-navbar">
        <button 
          className={`tab-btn ${activeTab === 'dashboard' ? 'active' : ''}`}
          onClick={() => setActiveTab('dashboard')}
        >
          Dashboard
        </button>
        <button 
          className={`tab-btn ${activeTab === 'custom' ? 'active' : ''}`}
          onClick={() => setActiveTab('custom')}
        >
          Custom Report
        </button>
      </div>

      <div className="tab-content">
        {activeTab === 'dashboard' && <ReportDashboard />}
        {activeTab === 'custom' && <CustomReportGenerator />}
      </div>
    </div>
  );
};

export default Reports;
