import React, { useState } from 'react';
import { Star, ChevronDown, ChevronUp, Quote, HelpCircle, Phone, MessageCircle } from 'lucide-react';

export default function TestimonialsFAQ({ onOpenLeadModal }) {
  const [openFaq, setOpenFaq] = useState(0);

  const testimonials = [
    {
      name: 'Rohan Deshmukh',
      role: 'Online MBA Graduate (Now Product Manager at Infosys)',
      text: 'I was hesitant about whether an online degree would be respected in tech MNCs. CollegeBundle counselor explained UGC-DEB regulations and helped me choose Manipal Online. I completed my MBA while working full-time and got a 65% salary hike upon graduation!',
      rating: 5,
      stream: 'Management (Online MBA)',
    },
    {
      name: 'Ananya Singhal',
      role: 'MBBS 2nd Year Student',
      text: 'With 552 marks in NEET, I was confused between repeat year and private medical colleges. The team at 8802155810 guided my parents through state quota counselling and saved us nearly ₹12 Lakhs in hidden college charges. Forever grateful!',
      rating: 5,
      stream: 'Medical (NEET UG)',
    },
    {
      name: 'Kabir Patel',
      role: 'B.Tech AI & Data Science (Batch of 2026)',
      text: 'Their AI matcher tool gave me an exact match for VIT Vellore and SRM. The counselor followed up with scholarship forms and guided me through choice filling. Truly the most reliable educational platform.',
      rating: 5,
      stream: 'Engineering (B.Tech)',
    },
  ];

  const faqs = [
    {
      q: 'Is CollegeBundle counseling really 100% free for students?',
      a: 'Yes, 100% free! CollegeBundle is funded through direct institutional partnerships with accredited universities. Students and parents never pay any advisory, registration, or counseling fee to our counselors.',
    },
    {
      q: 'How can I connect immediately with a human counselor?',
      a: 'You can call our dedicated counseling helpline directly at 8802155810 between 9:00 AM and 8:30 PM (Monday through Sunday). You can also WhatsApp us at the same number for instant brochure downloads.',
    },
    {
      q: 'Are degrees from online universities recognized by UGC and employers?',
      a: 'Absolutely. Under the University Grants Commission (Open and Distance Learning Programmes and Online Programmes) Regulations 2020 and subsequent gazettes, degrees obtained online from accredited HEIs hold equal standing with conventional degrees for all jobs, government exams (UPSC/SSC), and international higher studies.',
    },
    {
      q: 'Can I get scholarship assistance through CollegeBundles.in?',
      a: 'Yes! We facilitate up to 50% tuition scholarships for eligible students based on merit marks, corporate sponsorships, defence family quotas, and early-bird registration batches.',
    },
    {
      q: 'How does the AI College Finder tool work?',
      a: 'Our AI Counselor integrates official historical cutoff matrices, NIRF institutional data, and university fee parameters. When you enter your score, budget, and location, it computes statistical admission probability and matches you with verified programs.',
    },
  ];

  return (
    <section style={{ padding: '4rem 0', backgroundColor: '#ffffff' }}>
      <div className="container">
        {/* Testimonials */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <h2 style={{ fontSize: 'clamp(1.75rem, 3.2vw, 2.4rem)', color: '#0f172a', marginBottom: '0.75rem' }}>
            Stories of Students Empowered by CollegeBundle
          </h2>
          <p style={{ maxWidth: '600px', margin: '0 auto', fontSize: '1rem', color: '#64748b' }}>
            Over 50,000 students have realized their academic dreams with our guidance.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '1.5rem',
            marginBottom: '4rem',
          }}
        >
          {testimonials.map((item, idx) => (
            <div
              key={idx}
              style={{
                backgroundColor: '#f8fafc',
                border: '1px solid #e2e8f0',
                borderRadius: '16px',
                padding: '1.75rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', marginBottom: '1rem' }}>
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} size={16} fill="#f59e0b" color="#f59e0b" />
                  ))}
                </div>
                <p style={{ fontSize: '0.95rem', color: '#334155', lineHeight: 1.6, fontStyle: 'italic', marginBottom: '1.25rem' }}>
                  "{item.text}"
                </p>
              </div>

              <div>
                <div style={{ fontWeight: 700, fontSize: '1rem', color: '#0f172a' }}>{item.name}</div>
                <div style={{ fontSize: '0.8rem', color: '#64748b' }}>{item.role}</div>
                <span style={{ fontSize: '0.72rem', color: '#1d4ed8', fontWeight: 700, backgroundColor: '#eff6ff', padding: '0.15rem 0.5rem', borderRadius: '4px', display: 'inline-block', marginTop: '0.4rem' }}>
                  {item.stream}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* FAQs */}
        <div style={{ maxWidth: '850px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                backgroundColor: '#eff6ff',
                color: '#1d4ed8',
                padding: '0.25rem 0.75rem',
                borderRadius: '999px',
                fontSize: '0.75rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                marginBottom: '0.5rem',
              }}
            >
              <HelpCircle size={14} />
              <span>Everything You Need to Know</span>
            </div>
            <h3 style={{ fontSize: '1.8rem', color: '#0f172a', margin: 0 }}>
              Frequently Asked Questions
            </h3>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  style={{
                    backgroundColor: isOpen ? '#f8fafc' : '#ffffff',
                    border: '1px solid #e2e8f0',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    transition: 'all 0.2s',
                  }}
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? -1 : index)}
                    style={{
                      width: '100%',
                      padding: '1.15rem 1.25rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      textAlign: 'left',
                      fontWeight: 700,
                      fontSize: '1rem',
                      color: isOpen ? '#1d4ed8' : '#0f172a',
                      background: 'none',
                    }}
                  >
                    <span>{faq.q}</span>
                    {isOpen ? <ChevronUp size={18} color="#1d4ed8" /> : <ChevronDown size={18} color="#94a3b8" />}
                  </button>

                  {isOpen && (
                    <div
                      style={{
                        padding: '0 1.25rem 1.25rem 1.25rem',
                        fontSize: '0.92rem',
                        lineHeight: 1.6,
                        color: '#475569',
                        borderTop: '1px solid #f1f5f9',
                      }}
                    >
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Quick FAQ Hotline card */}
          <div
            style={{
              marginTop: '2.5rem',
              padding: '1.5rem',
              backgroundColor: '#f1f5f9',
              borderRadius: '14px',
              textAlign: 'center',
              border: '1px solid #e2e8f0',
            }}
          >
            <p style={{ fontWeight: 700, color: '#0f172a', fontSize: '1rem', marginBottom: '0.5rem' }}>
              Have another question not answered here?
            </p>
            <p style={{ color: '#64748b', fontSize: '0.85rem', marginBottom: '1rem' }}>
              Our counselors are on standby to answer your queries right now.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
              <a href="tel:8802155810" className="btn btn-call">
                <Phone size={16} /> Call 8802155810
              </a>
              <a
                href="https://wa.me/918802155810?text=Hi%20CollegeBundle,%20I%20have%20an%20admission%20question"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  padding: '0.65rem 1.25rem',
                  borderRadius: '10px',
                  backgroundColor: '#25d366',
                  color: '#ffffff',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  textDecoration: 'none',
                }}
              >
                <MessageCircle size={16} /> WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
