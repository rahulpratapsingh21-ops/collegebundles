import React, { useState } from 'react';
import { 
  Sparkles, 
  X, 
  Send, 
  Bot, 
  User, 
  Phone, 
  CheckCircle, 
  Award, 
  ArrowRight, 
  GraduationCap, 
  Calculator, 
  MessageSquare,
  HelpCircle,
  Zap
} from 'lucide-react';
import { topUniversities } from '../data/collegesData';

export default function AICounselorModal({ onClose, onOpenLeadModal }) {
  const [activeTab, setActiveTab] = useState('matcher'); // 'matcher' or 'chat'

  // Matcher State
  const [stream, setStream] = useState('Management');
  const [score, setScore] = useState('85');
  const [budget, setBudget] = useState('2-5L');
  const [location, setLocation] = useState('All India');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);

  // Chatbot State
  const [chatMessages, setChatMessages] = useState([
    {
      sender: 'ai',
      text: 'Hello! I am CollegeBundle AI Counselor. I can help you find colleges matching your score, compare cutoffs, evaluate UGC-DEB online degrees, and check scholarship eligibility. How can I assist you today?',
      time: 'Just now',
    },
  ]);
  const [inputQuery, setInputQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const samplePrompts = [
    'Best Online MBA under ₹2.5 Lakhs?',
    'NEET 540 score: Govt vs Private MBBS?',
    'Is Online Degree valid for UPSC exams?',
    'Top B.Tech colleges with 90 JEE percentile?',
  ];

  const handleRunMatcher = (e) => {
    e.preventDefault();
    setIsAnalyzing(true);
    setAnalysisResult(null);

    setTimeout(() => {
      setIsAnalyzing(false);
      // Filter or generate tailored colleges based on inputs
      let matches = topUniversities.filter((col) => {
        return col.stream.includes(stream) || col.stream.includes('Online');
      });

      if (matches.length === 0) {
        matches = topUniversities.slice(0, 3);
      }

      setAnalysisResult({
        probability: Math.min(98, Math.max(72, parseInt(score || 80) + 10)),
        scholarshipEligible: parseInt(score || 80) > 75 ? '30% - 50% Merit Grant' : '15% Standard Grant',
        colleges: matches.slice(0, 3),
      });
    }, 1100);
  };

  const handleSendMessage = (textToSend) => {
    const query = textToSend || inputQuery;
    if (!query.trim()) return;

    const userMsg = {
      sender: 'user',
      text: query,
      time: 'Just now',
    };

    setChatMessages((prev) => [...prev, userMsg]);
    setInputQuery('');
    setIsTyping(true);

    setTimeout(() => {
      let reply = '';
      const qLower = query.toLowerCase();

      if (qLower.includes('online mba') || qLower.includes('mba under')) {
        reply = `For Online MBA under ₹2.5 Lakhs, the top UGC-DEB and AICTE accredited choices are:
1. **Manipal University Jaipur (MUJ Online):** Fees ~₹1.75L with 14 specializations and Coursera access.
2. **Amity University Online:** Fees ~₹1.95L with global accreditations and 300+ recruiters.
3. **LPU Online:** Fees ~₹1.10L, offering the highest value ROI and up to 50% scholarship.

All these degrees hold 100% legal parity with on-campus degrees under the UGC Gazette. Would you like our senior admission counselor to connect with you at **8802155810**?`;
      } else if (qLower.includes('neet') || qLower.includes('mbbs')) {
        reply = `With a NEET score around that range:
- **Government Seats (AIQ):** Top AIQ cutoff typically closes around 610-618. However, depending on state domicile quota (e.g. UP, Bihar, WB, MP), state government cutoffs can dip to 580-595.
- **Private & Deemed Colleges:** Scores between 450 - 550 open doors to premier private medical colleges in Karnataka, UP, and deemed universities (like KMC Manipal, DY Patil, Bharati Vidyapeeth).
- Call our dedicated Medical Admissions Desk at **8802155810** for state-wise seat matrix and low-package counseling.`;
      } else if (qLower.includes('upsc') || qLower.includes('valid') || qLower.includes('government job')) {
        reply = `Yes, 100% VALID! 

According to the University Grants Commission (UGC) Gazette Notification dated September 2022, bachelor's and master's degrees obtained through Online and Open Distance Learning (ODL) from UGC-recognized universities are **at par with degrees obtained through regular conventional mode** for:
- UPSC Civil Services, SSC, Banking, and all State Public Service Commissions
- Higher education in India and abroad (WES approved)
- Private MNC employment and corporate promotions`;
      } else if (qLower.includes('b.tech') || qLower.includes('jee') || qLower.includes('engineering')) {
        reply = `For Engineering aspirants with 85-95 percentile in JEE Main:
- **Top Choices:** VIT Vellore/Chennai, Thapar Institute, BITS Pilani (via BITSAT), SRM University, and Chandigarh University.
- **Branch Strategy:** High recommendation to consider Computer Science with AI & Data Science or Cyber Security specializations, where 2026 hiring packages have shown a 22% upward trend.
- For direct counseling and category fee slabs, dial **8802155810**.`;
      } else {
        reply = `Thank you for asking! Based on current 2026 admission trends, eligibility cutoffs and scholarship allocations are actively being finalized. 

CollegeBundle provides 100% free personalized counseling for Medical, Engineering, Management, and UGC-DEB Online degrees. Would you like a personalized fee comparison or scholarship check? You can also reach our chief counselor directly at **8802155810**.`;
      }

      setIsTyping(false);
      setChatMessages((prev) => [
        ...prev,
        {
          sender: 'ai',
          text: reply,
          time: 'Just now',
        },
      ]);
    }, 900);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '800px', display: 'flex', flexDirection: 'column', maxHeight: '92vh' }}
      >
        {/* Header */}
        <div
          style={{
            backgroundColor: '#0f172a',
            color: '#ffffff',
            padding: '1.25rem 1.5rem',
            borderTopLeftRadius: '24px',
            borderTopRightRadius: '24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '10px',
                background: 'linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 0 15px rgba(124, 58, 237, 0.4)',
              }}
            >
              <Bot size={22} color="#ffffff" />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <h3 style={{ fontSize: '1.15rem', color: '#ffffff', margin: 0 }}>
                  CollegeBundle AI Counselor
                </h3>
                <span
                  style={{
                    backgroundColor: '#10b981',
                    color: '#ffffff',
                    fontSize: '0.65rem',
                    fontWeight: 800,
                    padding: '0.1rem 0.4rem',
                    borderRadius: '999px',
                  }}
                >
                  ONLINE
                </span>
              </div>
              <p style={{ fontSize: '0.75rem', color: '#94a3b8', margin: 0 }}>
                Instant College Match, Cutoff Prediction & Admission Guidance
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            style={{
              padding: '0.4rem',
              borderRadius: '8px',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              color: '#ffffff',
              cursor: 'pointer',
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Tab Controls */}
        <div
          style={{
            display: 'flex',
            borderBottom: '1px solid #e2e8f0',
            backgroundColor: '#f8fafc',
          }}
        >
          <button
            onClick={() => setActiveTab('matcher')}
            style={{
              flex: 1,
              padding: '0.85rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.45rem',
              fontWeight: 700,
              fontSize: '0.9rem',
              color: activeTab === 'matcher' ? '#1d4ed8' : '#64748b',
              borderBottom: activeTab === 'matcher' ? '3px solid #1d4ed8' : 'none',
              backgroundColor: activeTab === 'matcher' ? '#ffffff' : 'transparent',
            }}
          >
            <Calculator size={16} />
            <span>AI College Matcher</span>
          </button>

          <button
            onClick={() => setActiveTab('chat')}
            style={{
              flex: 1,
              padding: '0.85rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.45rem',
              fontWeight: 700,
              fontSize: '0.9rem',
              color: activeTab === 'chat' ? '#7c3aed' : '#64748b',
              borderBottom: activeTab === 'chat' ? '3px solid #7c3aed' : 'none',
              backgroundColor: activeTab === 'chat' ? '#ffffff' : 'transparent',
            }}
          >
            <MessageSquare size={16} />
            <span>Interactive AI Chat</span>
          </button>
        </div>

        {/* Body Content */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem' }}>
          {activeTab === 'matcher' ? (
            <div>
              {/* Form to Match */}
              <form onSubmit={handleRunMatcher} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#334155', marginBottom: '0.35rem' }}>
                    Target Stream
                  </label>
                  <select
                    value={stream}
                    onChange={(e) => setStream(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.6rem',
                      borderRadius: '8px',
                      border: '1px solid #cbd5e1',
                      backgroundColor: '#ffffff',
                    }}
                  >
                    <option value="Medical">Medical (MBBS / BDS / AYUSH)</option>
                    <option value="Engineering">Engineering (B.Tech / M.Tech)</option>
                    <option value="Management">Management (MBA / PGDM / BBA)</option>
                    <option value="Online">Online Degree (BCA/MCA/MBA)</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#334155', marginBottom: '0.35rem' }}>
                    Entrance Score / 12th %
                  </label>
                  <input
                    type="text"
                    value={score}
                    onChange={(e) => setScore(e.target.value)}
                    placeholder="e.g. 560 NEET / 90% JEE / 85% CAT"
                    style={{
                      width: '100%',
                      padding: '0.6rem',
                      borderRadius: '8px',
                      border: '1px solid #cbd5e1',
                      backgroundColor: '#ffffff',
                    }}
                    required
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#334155', marginBottom: '0.35rem' }}>
                    Approx. Budget
                  </label>
                  <select
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.6rem',
                      borderRadius: '8px',
                      border: '1px solid #cbd5e1',
                      backgroundColor: '#ffffff',
                    }}
                  >
                    <option value="Under 1.5L">Under ₹1.5 Lakhs (Affordable / Online)</option>
                    <option value="2-5L">₹2 - ₹5 Lakhs (Mid-tier Private)</option>
                    <option value="5-15L">₹5 - ₹15 Lakhs (Top Engineering / MBA)</option>
                    <option value="15L+">Above ₹15 Lakhs (Private MBBS / Deemed)</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#334155', marginBottom: '0.35rem' }}>
                    Preferred Location
                  </label>
                  <select
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.6rem',
                      borderRadius: '8px',
                      border: '1px solid #cbd5e1',
                      backgroundColor: '#ffffff',
                    }}
                  >
                    <option value="All India">All India / Pan India</option>
                    <option value="Delhi NCR">Delhi NCR & North</option>
                    <option value="Bangalore">Bangalore / South India</option>
                    <option value="Mumbai Pune">Mumbai / Pune / West</option>
                    <option value="Online Anywhere">100% Online (Study from Home)</option>
                  </select>
                </div>

                <div style={{ gridColumn: '1 / -1', marginTop: '0.25rem' }}>
                  <button
                    type="submit"
                    disabled={isAnalyzing}
                    className="btn btn-ai"
                    style={{ width: '100%', padding: '0.75rem', fontSize: '1rem' }}
                  >
                    {isAnalyzing ? (
                      <span>AI Neural Model Evaluating Cutoffs...</span>
                    ) : (
                      <>
                        <Sparkles size={18} />
                        <span>Run AI Recommendation & Match</span>
                      </>
                    )}
                  </button>
                </div>
              </form>

              {/* Match Results Display */}
              {analysisResult && (
                <div style={{ marginTop: '1.5rem', animation: 'fadeIn 0.3s ease-out' }}>
                  {/* Summary Metric Header */}
                  <div
                    style={{
                      backgroundColor: '#eff6ff',
                      border: '1px solid #bfdbfe',
                      borderRadius: '14px',
                      padding: '1.25rem',
                      marginBottom: '1.25rem',
                      display: 'flex',
                      flexWrap: 'wrap',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '1rem',
                    }}
                  >
                    <div>
                      <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#1e40af', textTransform: 'uppercase' }}>
                        AI Admission Odds
                      </div>
                      <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0f172a' }}>
                        {analysisResult.probability}% Match Score
                      </div>
                    </div>

                    <div>
                      <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#b45309', textTransform: 'uppercase' }}>
                        Scholarship Status
                      </div>
                      <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#d97706' }}>
                        {analysisResult.scholarshipEligible}
                      </div>
                    </div>

                    <a
                      href="tel:8802155810"
                      className="btn btn-call"
                      style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}
                    >
                      <Phone size={14} /> Call 8802155810
                    </a>
                  </div>

                  {/* Recommended Colleges Cards */}
                  <h4 style={{ fontSize: '1rem', color: '#0f172a', marginBottom: '0.75rem' }}>
                    Top AI Recommended Matches for You:
                  </h4>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    {analysisResult.colleges.map((col) => (
                      <div
                        key={col.id}
                        style={{
                          backgroundColor: '#ffffff',
                          border: '1px solid #e2e8f0',
                          borderRadius: '12px',
                          padding: '1.2rem',
                          display: 'flex',
                          flexWrap: 'wrap',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          gap: '1rem',
                          boxShadow: 'var(--shadow-sm)',
                        }}
                      >
                        <div style={{ flex: 1, minWidth: '220px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                            <span style={{ fontSize: '1rem', fontWeight: 700, color: '#0f172a' }}>
                              {col.name}
                            </span>
                            <span style={{ fontSize: '0.7rem', backgroundColor: '#ecfdf5', color: '#065f46', padding: '0.1rem 0.4rem', borderRadius: '4px', fontWeight: 700 }}>
                              {col.ranking}
                            </span>
                          </div>
                          <div style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '0.4rem' }}>
                            Fees: <strong>{col.fees}</strong> • Rating: ⭐ {col.rating} ({col.reviewsCount} reviews)
                          </div>
                          <div style={{ fontSize: '0.78rem', color: '#1e40af', fontWeight: 600 }}>
                            {col.highlights}
                          </div>
                        </div>

                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                          <button
                            onClick={() => {
                              onClose();
                              onOpenLeadModal(`AI Matcher: ${col.name}`);
                            }}
                            className="btn btn-gold"
                            style={{ padding: '0.5rem 0.9rem', fontSize: '0.8rem' }}
                          >
                            Claim Seat & Brochure
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* Chat Interface */
            <div style={{ display: 'flex', flexDirection: 'column', height: '100%', minHeight: '380px' }}>
              {/* Quick Prompt Chips */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1rem' }}>
                {samplePrompts.map((p, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendMessage(p)}
                    style={{
                      fontSize: '0.75rem',
                      padding: '0.35rem 0.65rem',
                      borderRadius: '999px',
                      backgroundColor: '#f1f5f9',
                      color: '#334155',
                      border: '1px solid #e2e8f0',
                      cursor: 'pointer',
                    }}
                  >
                    {p}
                  </button>
                ))}
              </div>

              {/* Chat Message Scroll */}
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '1rem', overflowY: 'auto', marginBottom: '1rem' }}>
                {chatMessages.map((msg, i) => (
                  <div
                    key={i}
                    style={{
                      display: 'flex',
                      gap: '0.6rem',
                      alignItems: 'flex-start',
                      alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                      maxWidth: '85%',
                    }}
                  >
                    {msg.sender === 'ai' && (
                      <div
                        style={{
                          width: '32px',
                          height: '32px',
                          borderRadius: '50%',
                          backgroundColor: '#7c3aed',
                          color: '#ffffff',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                        }}
                      >
                        <Bot size={18} />
                      </div>
                    )}

                    <div
                      style={{
                        padding: '0.85rem 1rem',
                        borderRadius: '14px',
                        backgroundColor: msg.sender === 'user' ? '#1d4ed8' : '#f8fafc',
                        color: msg.sender === 'user' ? '#ffffff' : '#1e293b',
                        border: msg.sender === 'ai' ? '1px solid #e2e8f0' : 'none',
                        fontSize: '0.9rem',
                        lineHeight: 1.55,
                        whiteSpace: 'pre-wrap',
                      }}
                    >
                      {msg.text}
                    </div>

                    {msg.sender === 'user' && (
                      <div
                        style={{
                          width: '32px',
                          height: '32px',
                          borderRadius: '50%',
                          backgroundColor: '#1e40af',
                          color: '#ffffff',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                        }}
                      >
                        <User size={18} />
                      </div>
                    )}
                  </div>
                ))}

                {isTyping && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#7c3aed', fontSize: '0.85rem' }}>
                    <Bot size={18} />
                    <span>CollegeBundle AI is formulating response...</span>
                  </div>
                )}
              </div>

              {/* Input row */}
              <div style={{ display: 'flex', gap: '0.5rem', paddingTop: '0.75rem', borderTop: '1px solid #e2e8f0' }}>
                <input
                  type="text"
                  value={inputQuery}
                  onChange={(e) => setInputQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Ask anything about colleges, cutoffs, online MBA, MBBS..."
                  style={{
                    flex: 1,
                    padding: '0.75rem 1rem',
                    borderRadius: '10px',
                    border: '1px solid #cbd5e1',
                    fontSize: '0.9rem',
                    outline: 'none',
                  }}
                />
                <button
                  onClick={() => handleSendMessage()}
                  className="btn btn-ai"
                  style={{ padding: '0.75rem 1.25rem' }}
                >
                  <Send size={18} />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Modal Bottom Counselor Footer */}
        <div
          style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: '#f8fafc',
            borderTop: '1px solid #e2e8f0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: '0.8rem',
            color: '#64748b',
          }}
        >
          <span>Need human counselor? Dial <strong>8802155810</strong></span>
          <button
            onClick={() => {
              onClose();
              onOpenLeadModal('AI Modal Bottom');
            }}
            style={{ color: '#1d4ed8', fontWeight: 700, textDecoration: 'underline' }}
          >
            Get Free Callback
          </button>
        </div>
      </div>
    </div>
  );
}
