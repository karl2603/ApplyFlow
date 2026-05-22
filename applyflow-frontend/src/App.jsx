import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Briefcase, 
  LayoutDashboard, 
  Plus, 
  Search, 
  MapPin, 
  DollarSign, 
  Building2, 
  Clock, 
  Edit3, 
  Trash2, 
  X,
  Target,
  Award,
  AlertCircle,
  ChevronRight,
  Sparkles,
  Code
} from 'lucide-react';
import './App.css';

const API_BASE_URL = 'http://localhost:8080';

const getStatusConfig = (status) => {
  const configs = {
    'Applied': { color: '#a1a1aa', bg: 'rgba(255,255,255,0.03)', border: 'rgba(255,255,255,0.1)', glow: 'rgba(255,255,255,0)' },
    'OA': { color: '#60a5fa', bg: 'rgba(96, 165, 250, 0.05)', border: 'rgba(96, 165, 250, 0.2)', glow: 'rgba(96, 165, 250, 0.4)' },
    'Interview': { color: '#c084fc', bg: 'rgba(192, 132, 252, 0.05)', border: 'rgba(192, 132, 252, 0.2)', glow: 'rgba(192, 132, 252, 0.4)' },
    'Offer': { color: '#34d399', bg: 'rgba(52, 211, 153, 0.05)', border: 'rgba(52, 211, 153, 0.2)', glow: 'rgba(52, 211, 153, 0.4)' },
    'Rejected': { color: '#f87171', bg: 'rgba(248, 113, 113, 0.05)', border: 'rgba(248, 113, 113, 0.2)', glow: 'rgba(248, 113, 113, 0.4)' }
  };
  return configs[status] || configs['Applied'];
};

export default function App() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingApp, setEditingApp] = useState(null);
  
  const [formData, setFormData] = useState({
    companyName: '',
    role: '',
    type: '',
    location: '',
    CTC: '',
    status: 'Applied'
  });

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/applications`);
      setApplications(response.data || []);
    } catch (error) {
      console.error('Failed to fetch applications', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const openModal = (app = null) => {
    if (app) {
      setEditingApp(app);
      setFormData({
        companyName: app.companyName || '',
        role: app.role || '',
        type: app.type || '',
        location: app.location || '',
        // Checking both CTC and ctc to handle backend serialization differences
        CTC: app.CTC || app.ctc || '',
        status: app.status || 'Applied'
      });
    } else {
      setEditingApp(null);
      setFormData({
        companyName: '',
        role: '',
        type: '',
        location: '',
        CTC: '',
        status: 'Applied'
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => {
      setEditingApp(null);
    }, 300);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingApp) {
        await axios.put(`${API_BASE_URL}/applications/editApplication`, null, {
          params: { id: editingApp.id, ...formData }
        });
      } else {
        await axios.post(`${API_BASE_URL}/applications/newApplication`, null, {
          params: formData
        });
      }
      closeModal();
      fetchApplications();
    } catch (error) {
      console.error('Failed to save application', error);
    }
  };

  const handleDelete = async (id, e) => {
    e.stopPropagation();
    try {
      await axios.delete(`${API_BASE_URL}/applications/${id}`);
      fetchApplications();
    } catch (error) {
      console.error('Failed to delete application', error);
    }
  };

  const filteredApps = applications.filter(app => 
    app.companyName?.toLowerCase().includes(search.toLowerCase()) ||
    app.role?.toLowerCase().includes(search.toLowerCase())
  );

  const stats = {
    active: applications.filter(a => !['Rejected', 'Offer'].includes(a.status)).length,
    oa: applications.filter(a => a.status === 'OA').length,
    interviews: applications.filter(a => a.status === 'Interview').length,
    offers: applications.filter(a => a.status === 'Offer').length
  };

  return (
    <div className="app-container">
      <div className="cinematic-bg">
        <div className="mesh-gradient"></div>
        <div className="noise-texture"></div>
      </div>

      <nav className="glass-sidebar">
        <div className="brand-header">
          <div className="logo-mark">
            <Target size={18} strokeWidth={2.5} />
            <div className="logo-glow"></div>
          </div>
          <span className="brand-text">ApplyFlow</span>
        </div>
        
        <div className="nav-group">
          <p className="nav-label">Menu</p>
          <button className="nav-link active">
            <LayoutDashboard size={16} />
            <span>Overview</span>
          </button>
        </div>
      </nav>

      <main className="main-viewport">
        <header className="glass-header">
          <div className="search-bar">
            <Search size={16} className="search-icon" />
            <input 
              type="text" 
              placeholder="Search by company or role..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <div className="search-shortcut">⌘K</div>
          </div>
          
          <button className="premium-btn primary" onClick={() => openModal()}>
            <span className="btn-content">
              <Plus size={16} />
              New Application
            </span>
            <div className="btn-glow"></div>
          </button>
        </header>

        <div className="content-scroll">
          <div className="hero-metrics">
            <div className="metric-card">
              <div className="metric-bg-glow" style={{background: 'rgba(255,255,255,0.1)'}}></div>
              <div className="metric-header">
                <div className="metric-icon"><Briefcase size={16} /></div>
                <span>Active Track</span>
              </div>
              <div className="metric-value">{stats.active}</div>
              <div className="metric-sparkline active-line"></div>
            </div>

            <div className="metric-card">
              <div className="metric-bg-glow" style={{background: 'rgba(96, 165, 250, 0.15)'}}></div>
              <div className="metric-header">
                <div className="metric-icon blue"><Code size={16} /></div>
                <span>Assessments</span>
              </div>
              <div className="metric-value">{stats.oa}</div>
              <div className="metric-sparkline oa-line"></div>
            </div>
            
            <div className="metric-card">
              <div className="metric-bg-glow" style={{background: 'rgba(192, 132, 252, 0.15)'}}></div>
              <div className="metric-header">
                <div className="metric-icon purple"><Clock size={16} /></div>
                <span>Interviews</span>
              </div>
              <div className="metric-value">{stats.interviews}</div>
              <div className="metric-sparkline interview-line"></div>
            </div>
            
            <div className="metric-card">
              <div className="metric-bg-glow" style={{background: 'rgba(52, 211, 153, 0.15)'}}></div>
              <div className="metric-header">
                <div className="metric-icon green"><Award size={16} /></div>
                <span>Offers</span>
              </div>
              <div className="metric-value">{stats.offers}</div>
              <div className="metric-sparkline offer-line"></div>
            </div>
          </div>

          <div className="board-section">
            <div className="board-header">
              <div className="title-group">
                <h2>Pipeline</h2>
                <div className="badge">{filteredApps.length} entries</div>
              </div>
            </div>

            {loading ? (
              <div className="state-container loading">
                <div className="premium-spinner"></div>
                <p>Syncing data...</p>
              </div>
            ) : filteredApps.length === 0 ? (
              <div className="state-container empty">
                <div className="empty-illustration">
                  <AlertCircle size={32} />
                  <div className="illus-glow"></div>
                </div>
                <h3>Void detected</h3>
                <p>No applications match your criteria. Expand your horizons.</p>
              </div>
            ) : (
              <div className="premium-grid">
                {filteredApps.map((app, index) => (
                  <div 
                    key={app.id} 
                    className="premium-card" 
                    style={{ animationDelay: `${index * 50}ms` }}
                    onClick={() => openModal(app)}
                  >
                    <div className="card-border-gradient"></div>
                    <div className="card-inner">
                      <div className="card-top">
                        <div className="company-id">
                          <div className="avatar">
                            <Building2 size={14} />
                          </div>
                          <div className="id-text">
                            <h3>{app.companyName}</h3>
                            <p>{app.role}</p>
                          </div>
                        </div>
                        <div className="card-actions">
                          <button 
                            className="action-btn danger" 
                            onClick={(e) => handleDelete(app.id, e)}
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                      
                      <div className="card-meta">
                        <div className="meta-item">
                          <MapPin size={12} />
                          <span>{app.location || 'N/A'}</span>
                        </div>
                        <div className="meta-separator"></div>
                        <div className="meta-item">
                          <Briefcase size={12} />
                          <span>{app.type || 'N/A'}</span>
                        </div>
                        <div className="meta-separator"></div>
                        <div className="meta-item highlight">
                          <DollarSign size={12} />
                          {/* Fallback to ctc if CTC is not mapped from JSON properly */}
                          <span>{app.CTC || app.ctc || 'N/A'}</span>
                        </div>
                      </div>
                      
                      <div className="card-bottom">
                        <div 
                          className="status-pill"
                          style={{
                            '--pill-color': getStatusConfig(app.status).color,
                            '--pill-bg': getStatusConfig(app.status).bg,
                            '--pill-border': getStatusConfig(app.status).border,
                            '--pill-glow': getStatusConfig(app.status).glow
                          }}
                        >
                          <div className="pulse-dot"></div>
                          {app.status}
                        </div>
                        <ChevronRight size={14} className="hover-arrow" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      {isModalOpen && (
        <div className="premium-dialog-root">
          <div className="dialog-backdrop" onClick={closeModal}></div>
          <div className="dialog-panel">
            <div className="dialog-header">
              <div className="dialog-title">
                {editingApp ? (
                  <>
                    <Edit3 size={18} className="title-icon" />
                    <h2>Edit Application</h2>
                  </>
                ) : (
                  <>
                    <Sparkles size={18} className="title-icon" />
                    <h2>New Application</h2>
                  </>
                )}
              </div>
              <button className="dialog-close" type="button" onClick={closeModal}>
                <X size={16} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="dialog-form">
              <div className="input-row">
                <div className="field-group">
                  <label>Company</label>
                  <input 
                    type="text" 
                    name="companyName" 
                    value={formData.companyName} 
                    onChange={handleInputChange} 
                    required 
                    placeholder="e.g. Vercel"
                  />
                </div>
                <div className="field-group">
                  <label>Role</label>
                  <input 
                    type="text" 
                    name="role" 
                    value={formData.role} 
                    onChange={handleInputChange} 
                    required 
                    placeholder="e.g. Frontend Engineer"
                  />
                </div>
              </div>

              <div className="input-row">
                <div className="field-group">
                  <label>Location</label>
                  <input 
                    type="text" 
                    name="location" 
                    value={formData.location} 
                    onChange={handleInputChange} 
                    required 
                    placeholder="e.g. Remote"
                  />
                </div>
                <div className="field-group">
                  <label>Compensation</label>
                  <div className="input-with-icon">
                    <DollarSign size={14} className="input-icon" />
                    <input 
                      type="text" 
                      name="CTC" 
                      value={formData.CTC} 
                      onChange={handleInputChange} 
                      required 
                      placeholder="e.g. 120,000"
                      className="has-icon"
                    />
                  </div>
                </div>
              </div>

              <div className="input-row">
                <div className="field-group">
                  <label>Employment Type</label>
                  <div className="custom-select">
                    <select name="type" value={formData.type} onChange={handleInputChange} required>
                      <option value="" disabled>Select Type</option>
                      <option value="Full-time">Full-time</option>
                      <option value="Part-time">Part-time</option>
                      <option value="Contract">Contract</option>
                      <option value="Internship">Internship</option>
                    </select>
                    <ChevronRight size={14} className="select-arrow" />
                  </div>
                </div>
                <div className="field-group">
                  <label>Pipeline Status</label>
                  <div className="custom-select">
                    <select name="status" value={formData.status} onChange={handleInputChange} required>
                      <option value="Applied">Applied</option>
                      <option value="OA">Online Assessment</option>
                      <option value="Interview">Interview</option>
                      <option value="Offer">Offer</option>
                      <option value="Rejected">Rejected</option>
                    </select>
                    <ChevronRight size={14} className="select-arrow" />
                  </div>
                </div>
              </div>
              
              <div className="dialog-footer">
                <button type="button" className="premium-btn secondary" onClick={closeModal}>
                  <span className="btn-content">Cancel</span>
                </button>
                <button type="submit" className="premium-btn primary submit-btn">
                  <span className="btn-content">
                    {editingApp ? 'Save Changes' : 'Initialize Application'}
                  </span>
                  <div className="btn-glow"></div>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}