import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { motion, AnimatePresence, useMotionTemplate, useMotionValue } from 'framer-motion';
import {
  Briefcase, LayoutDashboard, Plus, Search, MapPin,
  Building2, Clock, Edit3, Trash2, X, Target, Award, AlertCircle,
  ChevronRight, Code
} from 'lucide-react';
import './App.css';

const API_BASE_URL = 'http://localhost:8080';

const statusConfig = {
  'Applied': { color: '#a1a1aa', bg: 'rgba(255,255,255,0.03)', border: 'rgba(255,255,255,0.08)' },
  'OA': { color: '#60a5fa', bg: 'rgba(96, 165, 250, 0.08)', border: 'rgba(96, 165, 250, 0.2)' },
  'Interview': { color: '#c084fc', bg: 'rgba(192, 132, 252, 0.08)', border: 'rgba(192, 132, 252, 0.2)' },
  'Offer': { color: '#34d399', bg: 'rgba(52, 211, 153, 0.08)', border: 'rgba(52, 211, 153, 0.2)' },
  'Rejected': { color: '#f87171', bg: 'rgba(248, 113, 113, 0.08)', border: 'rgba(248, 113, 113, 0.2)' }
};

const getStatus = (status) => statusConfig[status] || statusConfig['Applied'];

const SpotlightCard = ({ children, onClick, app }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      className="premium-card"
      onMouseMove={handleMouseMove}
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      layout
    >
      <motion.div
        className="card-spotlight"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              400px circle at ${mouseX}px ${mouseY}px,
              rgba(255,255,255,0.08),
              transparent 80%
            )
          `,
        }}
      />
      <div className="card-border-gradient" />
      <div className="card-inner">{children}</div>
    </motion.div>
  );
};

export default function App() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingApp, setEditingApp] = useState(null);
  const [toast, setToast] = useState(null);
  const searchInputRef = useRef(null);

  const [formData, setFormData] = useState({
    companyName: '', role: '', type: '', location: '', CTC: '', status: 'Applied'
  });

  useEffect(() => {
    fetchApplications();
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/applications`);
      setApplications(response.data || []);
    } catch (error) {
      showToast('Connection anomaly detected');
    } finally {
      setTimeout(() => setLoading(false), 600);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const openModal = (app = null) => {
    setEditingApp(app);
    setFormData(app ? {
      companyName: app.companyName || '',
      role: app.role || '',
      type: app.type || '',
      location: app.location || '',
      CTC: app.CTC || app.ctc || '',
      status: app.status || 'Applied'
    } : { companyName: '', role: '', type: '', location: '', CTC: '', status: 'Applied' });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setEditingApp(null), 300);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingApp) {
        await axios.put(`${API_BASE_URL}/applications/editApplication`, null, {
          params: { id: editingApp.id, ...formData }
        });
        showToast('Application Updated');
      } else {
        await axios.post(`${API_BASE_URL}/applications/newApplication`, null, {
          params: { ...formData }
        });
        showToast('Application Created');
      }
      closeModal();
      fetchApplications();
    } catch (error) {
      console.error("Submission error:", error);
      showToast('Error processing application');
    }
  };

  const handleDelete = async (id, e) => {
    e.stopPropagation();
    try {
      await axios.delete(`${API_BASE_URL}/applications/${id}`);
      showToast('Application Deleted');
      fetchApplications();
    } catch (error) {
      showToast('Application Deletion failed!');
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

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 30 } }
  };

  return (
    <div className="app-container">
      <div className="cinematic-bg">
        <div className="ambient-light main-glow"></div>
        <div className="ambient-light accent-glow"></div>
        <div className="noise-overlay"></div>
        <div className="grid-overlay"></div>
      </div>

      <nav className="glass-sidebar">
        <div className="brand-header">
          <div className="logo-mark">
            <Target size={18} strokeWidth={2.5} />
          </div>
          <span className="brand-text">ApplyFlow</span>
        </div>

        <div className="nav-group">
          <p className="nav-label">Menu</p>
          <button className="nav-link active">
            <LayoutDashboard size={16} />
            <span>My Applications</span>
          </button>
        </div>
      </nav>

      <main className="main-viewport">
        <header className="glass-header">
          <div className="search-wrapper">
            <Search size={16} className="search-icon" />
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Search by company or role..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="search-input"
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="premium-btn primary"
            onClick={() => openModal()}
          >
            <Plus size={16} />
            <span>Create Application</span>
          </motion.button>
        </header>

        <div className="content-scroll">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="hero-metrics"
          >
            {[
              { label: 'Total Applications', val: stats.active, icon: <Briefcase size={16} />, color: 'var(--text-primary)' },
              { label: 'Assessments', val: stats.oa, icon: <Code size={16} />, color: '#60a5fa' },
              { label: 'Interviews', val: stats.interviews, icon: <Clock size={16} />, color: '#c084fc' },
              { label: 'Offers Secured', val: stats.offers, icon: <Award size={16} />, color: '#34d399' }
            ].map((stat, i) => (
              <motion.div variants={itemVariants} key={i} className="metric-card">
                <div className="metric-header">
                  <div className="metric-icon" style={{ color: stat.color }}>{stat.icon}</div>
                  <span>{stat.label}</span>
                </div>
                <div className="metric-value">{stat.val}</div>
                <div className="metric-sparkline" style={{
                  background: `linear-gradient(90deg, ${stat.color} 0%, transparent 100%)`
                }}></div>
              </motion.div>
            ))}
          </motion.div>

          <div className="board-section">
            <div className="board-header">
              <div className="title-group">
                <h2>My Applications</h2>
              </div>
            </div>

            {loading ? (
              <div className="premium-grid">
                {[1, 2, 3, 4, 5, 6].map(i => (
                  <div key={i} className="skeleton-card">
                    <div className="skeleton-line title"></div>
                    <div className="skeleton-line sub"></div>
                    <div className="skeleton-line blocks"></div>
                  </div>
                ))}
              </div>
            ) : filteredApps.length === 0 ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="state-container empty">
                <div className="empty-illustration">
                  <AlertCircle size={32} />
                  <div className="illus-glow"></div>
                </div>
                <h3>No results found</h3>
                <p>We couldn’t find any applications matching your search.</p>
              </motion.div>
            ) : (
              <motion.div layout className="premium-grid">
                <AnimatePresence mode="popLayout">
                  {filteredApps.map((app) => (
                    <SpotlightCard key={app.id} app={app} onClick={() => openModal(app)}>
                      <div className="card-top">
                        <div className="company-id">
                          <div className="avatar">
                            <Building2 size={16} />
                          </div>
                          <div className="id-text">
                            <h3>{app.companyName}</h3>
                            <p>{app.role}</p>
                          </div>
                        </div>
                        <button
                          className="action-btn danger"
                          onClick={(e) => handleDelete(app.id, e)}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>

                      <div className="card-meta">
                        <div className="meta-item"><MapPin size={12} /><span>{app.location || 'N/A'}</span></div>
                        <div className="meta-separator"></div>
                        <div className="meta-item"><Briefcase size={12} /><span>{app.type || 'N/A'}</span></div>
                        <div className="meta-separator"></div>
                        <div className="meta-item highlight"><span>₹{app.CTC || app.ctc || 'N/A'}</span></div>
                      </div>

                      <div className="card-bottom">
                        <div
                          className="status-pill"
                          style={{
                            '--pill-color': getStatus(app.status).color,
                            '--pill-bg': getStatus(app.status).bg,
                            '--pill-border': getStatus(app.status).border
                          }}
                        >
                          <div className="pulse-dot"></div>
                          {app.status}
                        </div>
                        <ChevronRight size={14} className="hover-arrow" />
                      </div>
                    </SpotlightCard>
                  ))}
                </AnimatePresence>
              </motion.div>
            )}
          </div>
        </div>
      </main>

      <AnimatePresence>
        {isModalOpen && (
          <div className="premium-dialog-root">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="dialog-backdrop"
              onClick={closeModal}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="dialog-panel"
            >
              <div className="dialog-header">
                <div className="dialog-title">
                  {editingApp ? <Edit3 size={18} /> : <Edit3 size={18} />}
                  <h2>{editingApp ? 'Edit Application' : 'New Application'}</h2>
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
                      placeholder="e.g. InfoSys"
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
                      placeholder="e.g. Java FullStack"
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
                      placeholder="e.g. Bangalore"
                    />
                  </div>

                  <div className="field-group">
                    <label>Compensation</label>
                    <div className="input-with-icon">
                      <span className="input-icon rupee-symbol">₹</span>
                      <input
                        type="text"
                        name="CTC"
                        value={formData.CTC}
                        onChange={handleInputChange}
                        required
                        placeholder="e.g. 4.4LPA"
                        className="has-icon"
                      />
                    </div>
                  </div>
                </div>

                <div className="input-row">
                  <div className="field-group">
                    <label>Employment Type</label>
                    <div className="custom-select">
                      <select
                        name="type"
                        value={formData.type}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="" disabled>Select type</option>
                        <option value="Full-time">Full-time</option>
                        <option value="Part-time">Part-time</option>
                        <option value="Contract">Contract</option>
                        <option value="Internship">Internship</option>
                      </select>
                      <ChevronRight size={14} className="select-arrow" />
                    </div>
                  </div>

                  <div className="field-group">
                    <label>Status</label>
                    <div className="custom-select">
                      <select
                        name="status"
                        value={formData.status}
                        onChange={handleInputChange}
                        required
                      >
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
                  <button
                    type="button"
                    className="premium-btn secondary"
                    onClick={closeModal}
                  >
                    Cancel
                  </button>

                  <button type="submit" className="premium-btn primary">
                    {editingApp ? 'Save Changes' : 'Create Application'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="premium-toast"
          >
            <span>{toast}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}