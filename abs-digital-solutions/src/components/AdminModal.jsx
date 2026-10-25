import React, { useState, useEffect } from 'react';
import {
  X,
  Lock,
  User,
  Mail,
  Key,
  ShieldAlert,
  ShieldCheck,
  CheckCircle2,
  RefreshCw,
  Search,
  Filter,
  Download,
  Trash2,
  Phone,
  MessageSquare,
  FileSpreadsheet,
  LogOut,
  AlertCircle,
  Eye,
  EyeOff,
  Edit3,
  Calendar,
  Building,
} from 'lucide-react';
import {
  checkAdminExists,
  registerInitialAdmin,
  loginAdmin,
  getAdminSession,
  logoutAdmin,
  fetchLeads,
  updateLeadStatus,
  deleteLead,
} from '../lib/supabaseClient';

export default function AdminModal({ isOpen, onClose }) {
  // Authentication & session state
  const [hasAdmin, setHasAdmin] = useState(true);
  const [checkingAdmin, setCheckingAdmin] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  const [authMode, setAuthMode] = useState('login'); // 'login' or 'register'
  const [authError, setAuthError] = useState('');
  const [authLoading, setAuthLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Forms
  const [loginForm, setLoginForm] = useState({
    usernameOrEmail: '',
    password: '',
  });

  const [registerForm, setRegisterForm] = useState({
    fullName: '',
    username: '',
    email: 'rahul.singh@absdigitalsolution.com',
    password: '',
    confirmPassword: '',
  });

  // Leads & Dashboard state
  const [leads, setLeads] = useState([]);
  const [leadsLoading, setLeadsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterService, setFilterService] = useState('ALL');
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [editingNotesId, setEditingNotesId] = useState(null);
  const [tempNotes, setTempNotes] = useState('');

  // Initial load check
  useEffect(() => {
    if (!isOpen) return;

    const init = async () => {
      setCheckingAdmin(true);
      setAuthError('');

      // Check existing session
      const session = getAdminSession();
      if (session) {
        setCurrentUser(session);
        loadLeadsData();
      } else {
        // Check if admin exists in Supabase
        const status = await checkAdminExists();
        setHasAdmin(status.hasAdmin);
        if (!status.hasAdmin) {
          setAuthMode('register');
        } else {
          setAuthMode('login');
        }
      }
      setCheckingAdmin(false);
    };

    init();
  }, [isOpen]);

  const loadLeadsData = async () => {
    setLeadsLoading(true);
    try {
      const { leads: loadedLeads } = await fetchLeads();
      setLeads(loadedLeads || []);
    } catch (err) {
      console.error('Error loading leads in admin modal:', err);
    } finally {
      setLeadsLoading(false);
    }
  };

  // Handlers for Auth
  const handleRegister = async (e) => {
    e.preventDefault();
    setAuthError('');

    if (registerForm.password !== registerForm.confirmPassword) {
      setAuthError('Passwords do not match.');
      return;
    }
    if (registerForm.password.length < 6) {
      setAuthError('Password must be at least 6 characters long.');
      return;
    }

    setAuthLoading(true);
    try {
      const res = await registerInitialAdmin({
        username: registerForm.username,
        email: registerForm.email,
        password: registerForm.password,
        fullName: registerForm.fullName,
      });

      if (res.success) {
        setHasAdmin(true);
        setCurrentUser(res.user);
        loadLeadsData();
      } else {
        setAuthError(res.error || 'Failed to complete registration.');
        if (res.error && res.error.includes('already')) {
          setHasAdmin(true);
          setAuthMode('login');
        }
      }
    } catch (err) {
      setAuthError(err?.message || 'Error occurred during registration.');
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setAuthError('');
    setAuthLoading(true);

    try {
      const res = await loginAdmin({
        usernameOrEmail: loginForm.usernameOrEmail,
        password: loginForm.password,
      });

      if (res.success) {
        setCurrentUser(res.user);
        loadLeadsData();
      } else {
        setAuthError(res.error || 'Invalid credentials.');
      }
    } catch (err) {
      setAuthError(err?.message || 'Login failed.');
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogout = () => {
    logoutAdmin();
    setCurrentUser(null);
    setLoginForm({ usernameOrEmail: '', password: '' });
    setAuthMode('login');
  };

  // Lead Actions
  const handleStatusChange = async (leadId, newStatus) => {
    await updateLeadStatus(leadId, newStatus);
    setLeads((prev) =>
      prev.map((l) => (l.id === leadId ? { ...l, status: newStatus } : l))
    );
  };

  const handleSaveNotes = async (leadId) => {
    await updateLeadStatus(leadId, null, tempNotes);
    setLeads((prev) =>
      prev.map((l) => (l.id === leadId ? { ...l, notes: tempNotes } : l))
    );
    setEditingNotesId(null);
  };

  const handleDeleteLead = async (leadId, name) => {
    if (window.confirm(`Are you sure you want to permanently delete lead for "${name}"?`)) {
      await deleteLead(leadId);
      setLeads((prev) => prev.filter((l) => l.id !== leadId));
    }
  };

  const handleExportCSV = () => {
    if (leads.length === 0) {
      alert('No leads to export.');
      return;
    }

    const headers = [
      'Ticket ID',
      'Date',
      'Client Name',
      'Mobile Phone',
      'Email',
      'Service Required',
      'Location / City',
      'Budget',
      'Status',
      'Source',
      'Inquiry Details',
      'Internal Notes',
    ];

    const rows = leads.map((l) => [
      `"${l.id || ''}"`,
      `"${l.date || ''}"`,
      `"${(l.fullName || '').replace(/"/g, '""')}"`,
      `"${(l.mobile || '').replace(/"/g, '""')}"`,
      `"${(l.email || '').replace(/"/g, '""')}"`,
      `"${(l.service || '').replace(/"/g, '""')}"`,
      `"${(l.city || '').replace(/"/g, '""')}"`,
      `"${(l.budget || '').replace(/"/g, '""')}"`,
      `"${(l.status || '').replace(/"/g, '""')}"`,
      `"${(l.source || '').replace(/"/g, '""')}"`,
      `"${(l.query || '').replace(/"/g, '""')}"`,
      `"${(l.notes || '').replace(/"/g, '""')}"`,
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute(
      'download',
      `abs_digital_leads_${new Date().toISOString().slice(0, 10)}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!isOpen) return null;

  // Filtered Leads
  const filteredLeads = leads.filter((l) => {
    const matchesSearch =
      !searchQuery ||
      (l.fullName && l.fullName.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (l.mobile && l.mobile.includes(searchQuery)) ||
      (l.email && l.email.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (l.id && l.id.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (l.query && l.query.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesService =
      filterService === 'ALL' ||
      (l.service && l.service.toLowerCase().includes(filterService.toLowerCase()));

    const matchesStatus =
      filterStatus === 'ALL' || (l.status && l.status === filterStatus);

    return matchesSearch && matchesService && matchesStatus;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/75 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-6xl max-h-[92vh] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col border border-slate-200">
        
        {/* Top Header */}
        <div className="bg-[#081120] text-white px-6 py-4 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0c5adb] to-[#06b6d4] flex items-center justify-center text-white shadow-md">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-bold font-['Outfit'] text-white">
                  ABS Digital Solutions • Admin Control Panel
                </h3>
                <span className="text-[10px] font-mono bg-emerald-950 text-emerald-400 border border-emerald-800 px-2 py-0.5 rounded-full hidden sm:inline-block">
                  Supabase Live Sync
                </span>
              </div>
              <p className="text-xs text-slate-400">
                {currentUser
                  ? `Logged in as ${currentUser.fullName || currentUser.username} (${currentUser.email})`
                  : 'Secure Administrator Portal for Lead Management'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {currentUser && (
              <button
                onClick={handleLogout}
                className="flex items-center gap-1 text-xs text-rose-300 hover:text-white bg-rose-950/60 hover:bg-rose-900 border border-rose-800 px-3 py-1.5 rounded-lg transition"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/10 transition"
              aria-label="Close Admin Modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-slate-50">
          
          {checkingAdmin ? (
            <div className="py-20 text-center space-y-3">
              <RefreshCw className="w-8 h-8 text-[#0c5adb] animate-spin mx-auto" />
              <p className="text-xs text-slate-500 font-mono">
                Verifying system admin authentication state...
              </p>
            </div>
          ) : !currentUser ? (
            /* AUTHENTICATION VIEW */
            <div className="max-w-md mx-auto py-8">
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xl space-y-6">
                
                {/* Mode Selector (Only if initial registration is still open) */}
                {!hasAdmin ? (
                  <div className="bg-amber-50 border border-amber-200 rounded-xl p-3.5 text-xs text-amber-900 space-y-1">
                    <div className="flex items-center gap-1.5 font-bold text-amber-950">
                      <ShieldAlert className="w-4 h-4 text-amber-600" />
                      <span>One-Time Initial Admin Account Registration</span>
                    </div>
                    <p className="text-[11px] text-amber-800">
                      No admin account exists yet. Create your master administrator account now. Once created, registration is <strong>permanently locked</strong> and closed to everyone else.
                    </p>
                  </div>
                ) : (
                  <div className="text-center space-y-1">
                    <h4 className="text-xl font-extrabold text-[#081120] font-['Outfit']">
                      Administrator Login
                    </h4>
                    <p className="text-xs text-slate-500">
                      Registration is closed. Please sign in with your master credentials.
                    </p>
                  </div>
                )}

                {authError && (
                  <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-xs text-rose-700 flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                    <span>{authError}</span>
                  </div>
                )}

                {/* FORM: One-Time Registration */}
                {!hasAdmin || authMode === 'register' ? (
                  <form onSubmit={handleRegister} className="space-y-3.5 text-left">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Full Name <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Enter full name"
                        value={registerForm.fullName}
                        onChange={(e) => setRegisterForm({ ...registerForm, fullName: e.target.value })}
                        className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-slate-300 focus:border-[#0c5adb] focus:ring-1 focus:ring-[#0c5adb] outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Admin Username <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. rahul or admin"
                        value={registerForm.username}
                        onChange={(e) => setRegisterForm({ ...registerForm, username: e.target.value })}
                        className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-slate-300 focus:border-[#0c5adb] focus:ring-1 focus:ring-[#0c5adb] outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Official Email <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={registerForm.email}
                        onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })}
                        className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-slate-300 focus:border-[#0c5adb] focus:ring-1 focus:ring-[#0c5adb] outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Password (Min 6 characters) <span className="text-rose-500">*</span>
                      </label>
                      <div className="relative">
                        <input
                          type={showPassword ? 'text' : 'password'}
                          required
                          placeholder="••••••••"
                          value={registerForm.password}
                          onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })}
                          className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-slate-300 focus:border-[#0c5adb] focus:ring-1 focus:ring-[#0c5adb] outline-none pr-10"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600"
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Confirm Password <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type={showPassword ? 'text' : 'password'}
                        required
                        placeholder="••••••••"
                        value={registerForm.confirmPassword}
                        onChange={(e) => setRegisterForm({ ...registerForm, confirmPassword: e.target.value })}
                        className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-slate-300 focus:border-[#0c5adb] focus:ring-1 focus:ring-[#0c5adb] outline-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={authLoading}
                      className="w-full btn-orange text-xs py-3 font-bold uppercase tracking-wider rounded-lg shadow-md cursor-pointer mt-2"
                    >
                      {authLoading ? 'Creating Account & Locking Portal...' : 'Create Master Admin & Lock Registration'}
                    </button>
                  </form>
                ) : (
                  /* FORM: Normal Admin Login */
                  <form onSubmit={handleLogin} className="space-y-4 text-left">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Username or Official Email
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="admin or rahul.singh@absdigitalsolution.com"
                        value={loginForm.usernameOrEmail}
                        onChange={(e) => setLoginForm({ ...loginForm, usernameOrEmail: e.target.value })}
                        className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-slate-300 focus:border-[#0c5adb] focus:ring-1 focus:ring-[#0c5adb] outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Password
                      </label>
                      <div className="relative">
                        <input
                          type={showPassword ? 'text' : 'password'}
                          required
                          placeholder="••••••••"
                          value={loginForm.password}
                          onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                          className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-slate-300 focus:border-[#0c5adb] focus:ring-1 focus:ring-[#0c5adb] outline-none pr-10"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600"
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={authLoading}
                      className="w-full btn-primary text-xs py-3 font-bold uppercase tracking-wider rounded-lg shadow-md cursor-pointer"
                    >
                      {authLoading ? 'Authenticating...' : 'Sign In to Admin Dashboard'}
                    </button>

                    <div className="text-center pt-2">
                      <span className="text-[11px] text-slate-400">
                        Protected by Supabase Single-Admin Security Policy
                      </span>
                    </div>
                  </form>
                )}

              </div>
            </div>
          ) : (
            /* LOGGED-IN ADMIN DASHBOARD VIEW */
            <div className="space-y-6">
              
              {/* Metric Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                  <span className="text-[10px] text-slate-400 uppercase font-mono block">Total Leads</span>
                  <div className="text-2xl font-extrabold text-[#081120] font-['Outfit'] mt-1">
                    {leads.length}
                  </div>
                  <span className="text-[10px] text-emerald-600 font-semibold">Live in Database</span>
                </div>

                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                  <span className="text-[10px] text-slate-400 uppercase font-mono block">Pending Review</span>
                  <div className="text-2xl font-extrabold text-[#06b6d4] font-['Outfit'] mt-1">
                    {leads.filter((l) => (l.status || '').toLowerCase().includes('pending') || (l.status || '').toLowerCase().includes('new')).length}
                  </div>
                  <span className="text-[10px] text-amber-600 font-semibold">Needs Follow-Up</span>
                </div>

                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                  <span className="text-[10px] text-slate-400 uppercase font-mono block">Converted Clients</span>
                  <div className="text-2xl font-extrabold text-emerald-600 font-['Outfit'] mt-1">
                    {leads.filter((l) => (l.status || '').toLowerCase().includes('converted')).length}
                  </div>
                  <span className="text-[10px] text-emerald-600 font-semibold">Closed Deals</span>
                </div>

                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                  <span className="text-[10px] text-slate-400 uppercase font-mono block">AI SEO Inquiries</span>
                  <div className="text-2xl font-extrabold text-[#0c5adb] font-['Outfit'] mt-1">
                    {leads.filter((l) => (l.service || '').toLowerCase().includes('seo') || (l.service || '').toLowerCase().includes('llm')).length}
                  </div>
                  <span className="text-[10px] text-[#0c5adb] font-semibold">LLMO / GEO Demands</span>
                </div>
              </div>

              {/* Action Bar: Search, Filters, Refresh, Export */}
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-3">
                
                {/* Search Bar */}
                <div className="relative w-full md:w-72">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    placeholder="Search name, phone, email, ticket..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full text-xs pl-9 pr-3 py-2 rounded-lg border border-slate-300 focus:border-[#0c5adb] outline-none"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-600 text-xs"
                    >
                      ✕
                    </button>
                  )}
                </div>

                {/* Filter Dropdowns */}
                <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
                  <select
                    value={filterService}
                    onChange={(e) => setFilterService(e.target.value)}
                    className="text-xs px-2.5 py-2 rounded-lg border border-slate-300 bg-white text-slate-700 outline-none"
                  >
                    <option value="ALL">All Services</option>
                    <option value="WCAG">WCAG Auditing</option>
                    <option value="eLearning">Accessible eLearning</option>
                    <option value="Document">PDF Remediation</option>
                    <option value="LMS">LMS Accessibility</option>
                    <option value="LLMO">LLMO Services</option>
                    <option value="AI SEO">AI SEO / GEO</option>
                    <option value="Web">Web Development</option>
                  </select>

                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="text-xs px-2.5 py-2 rounded-lg border border-slate-300 bg-white text-slate-700 outline-none"
                  >
                    <option value="ALL">All Statuses</option>
                    <option value="New / Pending Review">New / Pending Review</option>
                    <option value="Contacted">Contacted</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Converted">Converted</option>
                    <option value="Archived">Archived</option>
                  </select>

                  {/* Refresh */}
                  <button
                    onClick={loadLeadsData}
                    disabled={leadsLoading}
                    className="p-2 rounded-lg border border-slate-300 hover:bg-slate-100 text-slate-600 transition"
                    title="Refresh leads from database"
                  >
                    <RefreshCw className={`w-4 h-4 ${leadsLoading ? 'animate-spin text-[#0c5adb]' : ''}`} />
                  </button>

                  {/* Export CSV */}
                  <button
                    onClick={handleExportCSV}
                    className="btn-primary text-xs py-2 px-3 rounded-lg font-bold flex items-center gap-1.5 shadow-sm"
                  >
                    <FileSpreadsheet className="w-3.5 h-3.5" />
                    <span>Export CSV</span>
                  </button>
                </div>

              </div>

              {/* Leads Table */}
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-slate-100/80 text-slate-700 border-b border-slate-200 font-bold uppercase tracking-wider text-[11px]">
                        <th className="py-3 px-4">Ticket / Date</th>
                        <th className="py-3 px-4">Client Contact</th>
                        <th className="py-3 px-4">Service &amp; Source</th>
                        <th className="py-3 px-4">Inquiry Message</th>
                        <th className="py-3 px-4">Status</th>
                        <th className="py-3 px-4">Internal Notes</th>
                        <th className="py-3 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {leadsLoading ? (
                        <tr>
                          <td colSpan={7} className="text-center py-12 text-slate-500">
                            <RefreshCw className="w-6 h-6 animate-spin mx-auto text-[#0c5adb] mb-2" />
                            <span>Loading leads from Supabase...</span>
                          </td>
                        </tr>
                      ) : filteredLeads.length === 0 ? (
                        <tr>
                          <td colSpan={7} className="text-center py-12 text-slate-500">
                            <ShieldAlert className="w-8 h-8 mx-auto text-slate-300 mb-2" />
                            <span className="font-semibold block">No leads match the filters.</span>
                            <span className="text-[11px] text-slate-400">
                              Try clearing search terms or submit a test lead from the website.
                            </span>
                          </td>
                        </tr>
                      ) : (
                        filteredLeads.map((lead) => (
                          <tr key={lead.id} className="hover:bg-slate-50 transition">
                            
                            {/* ID & Date */}
                            <td className="py-3.5 px-4 font-mono">
                              <span className="font-extrabold text-[#0c5adb] block">{lead.id}</span>
                              <span className="text-[10px] text-slate-400 block">{lead.date}</span>
                            </td>

                            {/* Client Contact */}
                            <td className="py-3.5 px-4">
                              <span className="font-bold text-slate-900 block">{lead.fullName || 'Anonymous'}</span>
                              <div className="flex items-center gap-2 mt-0.5">
                                <a
                                  href={`tel:${lead.mobile}`}
                                  className="text-slate-600 hover:text-[#0c5adb] flex items-center gap-1 font-mono"
                                >
                                  <Phone className="w-3 h-3 text-[#06b6d4]" />
                                  <span>{lead.mobile}</span>
                                </a>
                                <a
                                  href={`https://wa.me/${(lead.mobile || '').replace(/[^0-9]/g, '')}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-emerald-600 hover:text-emerald-700 font-bold text-[10px] bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200"
                                  title="Chat on WhatsApp"
                                >
                                  WhatsApp
                                </a>
                              </div>
                              {lead.email && (
                                <a
                                  href={`mailto:${lead.email}`}
                                  className="text-slate-500 hover:text-slate-700 text-[11px] block mt-0.5 truncate max-w-[160px]"
                                >
                                  {lead.email}
                                </a>
                              )}
                            </td>

                            {/* Service & Source */}
                            <td className="py-3.5 px-4">
                              <span className="font-semibold text-slate-800 block text-xs">
                                {lead.service || lead.stream || 'General Inquiry'}
                              </span>
                              <span className="text-[10px] text-slate-400 block mt-0.5">
                                {lead.source || 'Website'}
                              </span>
                              {lead.budget && (
                                <span className="text-[10px] text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200 inline-block mt-0.5">
                                  Budget: {lead.budget}
                                </span>
                              )}
                            </td>

                            {/* Inquiry Message */}
                            <td className="py-3.5 px-4 max-w-[200px]">
                              <p className="text-xs text-slate-600 line-clamp-2" title={lead.query}>
                                {lead.query || 'No additional note provided.'}
                              </p>
                              {lead.city && (
                                <span className="text-[10px] text-slate-400 block mt-1">
                                  City: {lead.city}
                                </span>
                              )}
                            </td>

                            {/* Status Selector */}
                            <td className="py-3.5 px-4">
                              <select
                                value={lead.status || 'New / Pending Review'}
                                onChange={(e) => handleStatusChange(lead.id, e.target.value)}
                                className={`text-[11px] font-bold px-2 py-1 rounded-lg border outline-none ${
                                  (lead.status || '').toLowerCase().includes('converted')
                                    ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                                    : (lead.status || '').toLowerCase().includes('contacted')
                                    ? 'bg-blue-50 text-blue-700 border-blue-300'
                                    : (lead.status || '').toLowerCase().includes('progress')
                                    ? 'bg-purple-50 text-purple-700 border-purple-300'
                                    : 'bg-amber-50 text-amber-700 border-amber-300'
                                }`}
                              >
                                <option value="New / Pending Review">New / Pending Review</option>
                                <option value="Contacted">Contacted</option>
                                <option value="In Progress">In Progress</option>
                                <option value="Converted">Converted</option>
                                <option value="Archived">Archived</option>
                              </select>
                            </td>

                            {/* Internal Admin Notes */}
                            <td className="py-3.5 px-4 max-w-[180px]">
                              {editingNotesId === lead.id ? (
                                <div className="space-y-1.5">
                                  <textarea
                                    rows={2}
                                    value={tempNotes}
                                    onChange={(e) => setTempNotes(e.target.value)}
                                    className="w-full text-[11px] p-1.5 border border-slate-300 rounded outline-none"
                                    placeholder="Add internal note..."
                                  ></textarea>
                                  <div className="flex items-center gap-1">
                                    <button
                                      onClick={() => handleSaveNotes(lead.id)}
                                      className="text-[10px] bg-emerald-600 text-white px-2 py-0.5 rounded font-bold"
                                    >
                                      Save
                                    </button>
                                    <button
                                      onClick={() => setEditingNotesId(null)}
                                      className="text-[10px] bg-slate-200 text-slate-600 px-2 py-0.5 rounded"
                                    >
                                      Cancel
                                    </button>
                                  </div>
                                </div>
                              ) : (
                                <div
                                  onClick={() => {
                                    setEditingNotesId(lead.id);
                                    setTempNotes(lead.notes || '');
                                  }}
                                  className="group flex items-start justify-between cursor-pointer p-1 rounded hover:bg-slate-100"
                                  title="Click to edit internal note"
                                >
                                  <span className="text-[11px] text-slate-500 italic truncate max-w-[130px]">
                                    {lead.notes || 'Click to add note...'}
                                  </span>
                                  <Edit3 className="w-3 h-3 text-slate-300 group-hover:text-slate-600 ml-1 shrink-0" />
                                </div>
                              )}
                            </td>

                            {/* Delete Action */}
                            <td className="py-3.5 px-4 text-right">
                              <button
                                onClick={() => handleDeleteLead(lead.id, lead.fullName)}
                                className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition"
                                title="Delete Lead"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </td>

                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>

                <div className="p-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
                  <span>Showing {filteredLeads.length} of {leads.length} total entries</span>
                  <span className="text-emerald-700 font-medium">Auto-synced with Supabase backend</span>
                </div>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
}
