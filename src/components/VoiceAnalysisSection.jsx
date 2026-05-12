import React, { useState } from 'react';
import { Mic, Play, Loader } from 'lucide-react';
import DashboardSection from './DashboardSection';
import './VoiceAnalysisSection.css';

const VoiceAnalysisSection = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioReady, setAudioReady] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const handleRecord = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      setTimeout(() => {
        setIsRecording(false);
        setAudioReady(true);
      }, 3000); // Mock recording for 3 seconds
    }
  };

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      setShowResults(true);
    }, 4000); // Mock analysis time
  };

  return (
    <section id="analysis" className="section analysis-section">
      <div className="container">
        <div className="section-title">
          <h2>Voice <span className="text-gradient">Analysis</span></h2>
        </div>
        
        {!showResults ? (
          <div className="analysis-box glass-panel">
            <div className="analysis-tabs">
              <button className="tab active">Record Voice</button>
              <button className="tab">Upload Audio</button>
            </div>
            
            <div className="recording-area">
              {!audioReady ? (
                <>
                  <button 
                    className={`record-btn ${isRecording ? 'recording' : ''}`}
                    onClick={handleRecord}
                  >
                    <Mic size={40} color={isRecording ? "#ff5f56" : "var(--text-primary)"} />
                  </button>
                  <p className="record-status">
                    {isRecording ? "Recording... Please say 'Aah' for 3 seconds" : "Click the microphone to start recording"}
                  </p>
                  
                  {isRecording && (
                    <div className="live-waveform">
                      {[...Array(20)].map((_, i) => (
                        <div key={i} className="live-bar" style={{ animationDelay: `${Math.random()}s` }}></div>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <div className="audio-ready">
                  <div className="audio-player">
                    <button className="play-btn"><Play size={24} color="var(--accent-neon)" /></button>
                    <div className="static-waveform">
                      {[...Array(30)].map((_, i) => (
                        <div key={i} className="static-bar" style={{ height: `${Math.random() * 100}%` }}></div>
                      ))}
                    </div>
                  </div>
                  <div className="action-buttons">
                    <button className="btn-secondary" onClick={() => setAudioReady(false)}>Rerecord</button>
                    <button className="btn-primary" onClick={handleAnalyze} disabled={isAnalyzing}>
                      {isAnalyzing ? (
                        <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <Loader className="spin-icon" size={18} /> Analyzing AI...
                        </span>
                      ) : "Analyze Voice"}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <DashboardSection onReset={() => {
            setShowResults(false);
            setAudioReady(false);
          }} />
        )}
      </div>
    </section>
  );
};

export default VoiceAnalysisSection;
