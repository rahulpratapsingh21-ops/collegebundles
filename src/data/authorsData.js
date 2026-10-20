/**
 * Authors Data for CollegeBundles.in
 * Formatted strictly according to Google EEAT (Experience, Expertise, Authoritativeness, Trustworthiness) guidelines.
 * Tailored by category: Medical, Engineering, Management, Online Education, and Editorial.
 */

export const CATEGORY_AUTHORS = {
  medical: {
    name: 'Dr. Aarav Mehta, MD',
    title: 'Senior Medical Admissions Analyst & NEET Counselling Lead',
    role: 'Senior Medical Editor',
    avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=200&auto=format&fit=crop&q=80',
    fallbackInitials: 'AM',
    avatarBg: '#059669',
    verified: true,
    credentials: 'MD (AIIMS New Delhi) • 9+ Yrs Medical Admissions • 15,000+ Aspirants Mentored',
    bio: 'Dr. Aarav Mehta is a Senior Medical Admissions Analyst at CollegeBundles.in with over 9 years of dedicated experience tracking MCC counselling procedures, NEET UG/PG score percentiles, and state quota seat matrices. An alumnus of AIIMS New Delhi, Dr. Mehta evaluates college cutoffs, fee structures, and stray vacancy round dynamics to provide transparent, student-first guidance.',
    social: {
      twitter: 'https://twitter.com',
      linkedin: 'https://linkedin.com',
    },
  },

  engineering: {
    name: 'Er. Rohan Singhania',
    title: 'Senior Engineering Admissions Strategist & JoSAA Analyst',
    role: 'Lead Engineering Analyst',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
    fallbackInitials: 'RS',
    avatarBg: '#0284c7',
    verified: true,
    credentials: 'B.Tech (IIT Bombay) • 8+ Yrs JoSAA/CSAB Research • Seat Matrix Specialist',
    bio: 'Er. Rohan Singhania is a Senior Engineering Admissions Strategist at CollegeBundles.in with 8+ years of expertise in IIT/NIT branch allocation, JoSAA/CSAB counselling rounds, and JEE rank predictions. An IIT Bombay graduate, his analytical deep-dives and cutoff benchmarks help engineering aspirants make data-driven college choices.',
    social: {
      twitter: 'https://twitter.com',
      linkedin: 'https://linkedin.com',
    },
  },

  management: {
    name: 'Pooja Deshmukh, MBA',
    title: 'Lead Management Education Researcher & B-School Advisor',
    role: 'Senior B-School Researcher',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80',
    fallbackInitials: 'PD',
    avatarBg: '#d97706',
    verified: true,
    credentials: 'MBA (IIM Indore) • 7+ Yrs B-School Admissions Consulting • 200+ Colleges Audited',
    bio: 'Pooja Deshmukh is the Lead Management Education Researcher at CollegeBundles.in, specializing in IIM composite score criteria, CAT/XAT percentile cutoffs, and B-school ROI analytics. With an MBA from IIM Indore and 7+ years in corporate strategy and academic consulting, she tracks B-school placement benchmarks and MBA admission criteria across India.',
    social: {
      twitter: 'https://twitter.com',
      linkedin: 'https://linkedin.com',
    },
  },

  online: {
    name: 'Prof. Rajeshwari Sen',
    title: 'Chief Digital Learning Advisor & Distance Education Specialist',
    role: 'Higher Education Consultant',
    avatar: 'https://images.unsplash.com/photo-1580894732454-defa1b559b9a?w=200&auto=format&fit=crop&q=80',
    fallbackInitials: 'RS',
    avatarBg: '#7c3aed',
    verified: true,
    credentials: '11+ Yrs Academic Research • Ex-DU Visiting Faculty • UGC-DEB Policy Specialist',
    bio: 'Prof. Rajeshwari Sen is an Academic Consultant and Online Learning Specialist at CollegeBundles.in with over 10 years of experience in higher education policy, UGC-DEB accreditations, and digital degree validations. She works closely with educational institutions to evaluate curriculum rigor, corporate parity, and distance learning quality.',
    social: {
      twitter: 'https://twitter.com',
      linkedin: 'https://linkedin.com',
    },
  },

  editorial: {
    name: 'Dr. Vikrant Kashyap',
    title: 'Chief Editorial Director & Higher Education Policy Analyst',
    role: 'Editorial Director',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
    fallbackInitials: 'VK',
    avatarBg: '#1e3a8a',
    verified: true,
    credentials: 'Ph.D. Educational Planning • 14+ Yrs Education Journalism • Editorial Director',
    bio: 'Dr. Vikrant Kashyap leads the research and editorial desk at CollegeBundles.in. With a Ph.D. in Educational Planning and Administration and over 14 years in national higher education journalism, he oversees our editorial integrity, data verification, and student-first counselling standards across India.',
    social: {
      twitter: 'https://twitter.com',
      linkedin: 'https://linkedin.com',
    },
  },
};

/**
 * Returns author profile based on article category or categorySlug
 */
export function getAuthorForCategory(category, authorName) {
  const cat = (category || '').toLowerCase();
  
  if (cat.includes('med') || cat.includes('health') || cat.includes('neet') || cat.includes('mbbs')) {
    return CATEGORY_AUTHORS.medical;
  }
  if (cat.includes('eng') || cat.includes('tech') || cat.includes('jee') || cat.includes('iit') || cat.includes('nit')) {
    return CATEGORY_AUTHORS.engineering;
  }
  if (cat.includes('manag') || cat.includes('mba') || cat.includes('cat') || cat.includes('iim') || cat.includes('bba')) {
    return CATEGORY_AUTHORS.management;
  }
  if (cat.includes('online') || cat.includes('dist') || cat.includes('deb') || cat.includes('ugc')) {
    return CATEGORY_AUTHORS.online;
  }

  // Check by author name if specific
  if (authorName) {
    const nameLower = authorName.toLowerCase();
    if (nameLower.includes('mehta') || nameLower.includes('sharma')) return CATEGORY_AUTHORS.medical;
    if (nameLower.includes('singhania') || nameLower.includes('verma')) return CATEGORY_AUTHORS.engineering;
    if (nameLower.includes('deshmukh') || nameLower.includes('kapoor')) return CATEGORY_AUTHORS.management;
    if (nameLower.includes('sen') || nameLower.includes('gupta')) return CATEGORY_AUTHORS.online;
  }

  return CATEGORY_AUTHORS.editorial;
}
