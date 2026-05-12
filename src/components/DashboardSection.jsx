import React, { useRef, useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { RefreshCcw, AlertTriangle, ShieldCheck, Activity, Download, Eye, Loader, X } from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import './DashboardSection.css';

const dummyData = [
  { name: '0s', original: 4000, processed: 2400 },
  { name: '0.5s', original: 3000, processed: 1398 },
  { name: '1.0s', original: 2000, processed: 9800 },
  { name: '1.5s', original: 2780, processed: 3908 },
  { name: '2.0s', original: 1890, processed: 4800 },
  { name: '2.5s', original: 2390, processed: 3800 },
  { name: '3.0s', original: 3490, processed: 4300 },
];

const reportDetails = {
  patientId: 'NM-DEMO-001',
  patientName: 'Demo Patient',
  reportDate: new Date().toISOString().split('T')[0],
  confidence: '94.8%',
  biomarkers: [
    { label: 'Jitter', value: 'Normal' },
    { label: 'Shimmer', value: 'Normal' },
    { label: 'HNR', value: 'Slightly Elevated' },
  ],
};

const DashboardSection = ({ onReset }) => {
  const dashboardRef = useRef(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showReport, setShowReport] = useState(false);
  
  // Simulating a High Risk or Low Risk result
  const isHighRisk = false; // Toggle this for different states
  
  const handleDownloadReport = async () => {
    if (!dashboardRef.current) return;
    
    setIsGenerating(true);
    try {
      // Temporarily add a class to adjust styles for PDF if needed
      dashboardRef.current.classList.add('pdf-mode');
      
      const canvas = await html2canvas(dashboardRef.current, {
        scale: 2, // Higher scale for better quality
        backgroundColor: '#0a0a0f', // Match the dark theme background roughly
        useCORS: true,
        logging: false
      });
      
      dashboardRef.current.classList.remove('pdf-mode');
      
      const imgData = canvas.toDataURL('image/png');
      
      // Calculate dimensions to fit nicely on an A4 page or keep original aspect ratio
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'px',
        format: [canvas.width, canvas.height]
      });
      
      pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
      pdf.save(`NeuroMotion_Report_${new Date().toISOString().split('T')[0]}.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
    } finally {
      setIsGenerating(false);
    }
  };
  
  return (
    <div className="dashboard-container glass-panel fade-in" ref={dashboardRef}>
      <div className="dashboard-header">
        <h3>AI Prediction <span className="text-gradient">Results</span></h3>
        <div className="header-actions">
          <button
            className="btn-secondary report-btn"
            onClick={() => setShowReport(true)}
            type="button"
          >
            <Eye size={16} />
            View Report
          </button>
          <button 
            className="btn-primary report-btn" 
            onClick={handleDownloadReport}
            disabled={isGenerating}
            type="button"
          >
            {isGenerating ? <Loader className="spin-icon" size={16} /> : <Download size={16} />}
            {isGenerating ? 'Generating...' : 'Download Report'}
          </button>
          <button className="btn-icon" onClick={onReset} title="Analyze new audio" type="button">
            <RefreshCcw size={20} />
          </button>
        </div>
      </div>
      
      <div className="dashboard-grid">
        <div className="main-result">
          <div className="status-badge" style={{ backgroundColor: isHighRisk ? 'rgba(255, 95, 86, 0.1)' : 'rgba(39, 201, 63, 0.1)', color: isHighRisk ? '#ff5f56' : '#27c93f', border: `1px solid ${isHighRisk ? '#ff5f56' : '#27c93f'}` }}>
            {isHighRisk ? <AlertTriangle size={20} /> : <ShieldCheck size={20} />}
            {isHighRisk ? 'High Risk Detected' : 'Low Risk / Normal'}
          </div>
          
          <div className="confidence-score">
            <svg viewBox="0 0 36 36" className="circular-chart">
              <path className="circle-bg"
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path className="circle"
                strokeDasharray="94.8, 100"
                style={{ stroke: 'url(#gradient)' }}
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="var(--accent-neon)" />
                  <stop offset="100%" stopColor="var(--accent-purple)" />
                </linearGradient>
              </defs>
              <text x="18" y="20.35" className="percentage">94.8%</text>
            </svg>
            <p className="confidence-label">AI Confidence Score</p>
          </div>
        </div>
        
        <div className="analysis-metrics">
          <h4>Vocal Biomarkers Analysis</h4>
          <div className="metrics-grid">
            <div className="metric-item">
              <span className="metric-name">Jitter (Frequency Variation)</span>
              <div className="progress-bar"><div className="progress" style={{ width: '45%' }}></div></div>
              <span className="metric-val">Normal</span>
            </div>
            <div className="metric-item">
              <span className="metric-name">Shimmer (Amplitude Variation)</span>
              <div className="progress-bar"><div className="progress" style={{ width: '30%' }}></div></div>
              <span className="metric-val">Normal</span>
            </div>
            <div className="metric-item">
              <span className="metric-name">HNR (Harmonic-to-Noise)</span>
              <div className="progress-bar"><div className="progress warning" style={{ width: '80%' }}></div></div>
              <span className="metric-val">Slightly Elevated</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="chart-container">
        <h4>Voice Frequency Analysis</h4>
        <div className="chart-wrapper">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={dummyData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorOriginal" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--accent-blue)" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="var(--accent-blue)" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorProcessed" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--accent-neon)" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="var(--accent-neon)" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="name" stroke="var(--text-secondary)" />
              <YAxis stroke="var(--text-secondary)" />
              <Tooltip contentStyle={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--glass-border)' }} />
              <Area type="monotone" dataKey="original" stroke="var(--accent-blue)" fillOpacity={1} fill="url(#colorOriginal)" />
              <Area type="monotone" dataKey="processed" stroke="var(--accent-neon)" fillOpacity={1} fill="url(#colorProcessed)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      <div className="recommendation-box glass-panel">
        <Activity color="var(--accent-blue)" size={24} />
        <div>
          <h4>Health Recommendation</h4>
          <p>
            The analysis indicates normal vocal patterns with no significant markers of Parkinson's disease detected. 
            However, this is an AI screening tool and not a clinical diagnosis. If you are experiencing physical symptoms, please consult a neurologist.
          </p>
        </div>
      </div>

      {showReport && (
        <div className="report-modal" role="dialog" aria-modal="true" aria-labelledby="report-title">
          <div className="report-modal-content glass-panel">
            <div className="report-modal-header">
              <div>
                <p className="report-kicker">Screening Report</p>
                <h3 id="report-title">Voice Analysis Summary</h3>
              </div>
              <button className="btn-icon report-close" type="button" onClick={() => setShowReport(false)} title="Close report">
                <X size={20} />
              </button>
            </div>

            <div className="report-summary-grid">
              <div>
                <span>Patient</span>
                <strong>{reportDetails.patientName}</strong>
              </div>
              <div>
                <span>Patient ID</span>
                <strong>{reportDetails.patientId}</strong>
              </div>
              <div>
                <span>Report Date</span>
                <strong>{reportDetails.reportDate}</strong>
              </div>
              <div>
                <span>AI Confidence</span>
                <strong>{reportDetails.confidence}</strong>
              </div>
            </div>

            <div className="report-result-line">
              <span className="status-badge report-status">
                {isHighRisk ? <AlertTriangle size={18} /> : <ShieldCheck size={18} />}
                {isHighRisk ? 'High Risk Detected' : 'Low Risk / Normal'}
              </span>
              <p>
                The voice sample shows stable vocal biomarkers in this screening run. This report is intended for
                screening support and should be reviewed with a qualified clinician for medical decisions.
              </p>
            </div>

            <div className="report-table">
              {reportDetails.biomarkers.map((metric) => (
                <div key={metric.label}>
                  <span>{metric.label}</span>
                  <strong>{metric.value}</strong>
                </div>
              ))}
            </div>

            <div className="report-modal-actions">
              <button className="btn-primary report-btn" type="button" onClick={handleDownloadReport} disabled={isGenerating}>
                {isGenerating ? <Loader className="spin-icon" size={16} /> : <Download size={16} />}
                {isGenerating ? 'Generating...' : 'Download PDF'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardSection;
