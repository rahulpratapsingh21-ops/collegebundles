export const newsCategories = [
  { id: 'all', name: 'News', badgeColor: '#1e40af' },
  { id: 'medical', name: 'Medical & Healthcare', badgeColor: '#15803d' },
  { id: 'engineering', name: 'Engineering & Tech', badgeColor: '#0369a1' },
  { id: 'management', name: 'Management & MBA', badgeColor: '#b45309' },
  { id: 'online', name: 'Online', badgeColor: '#7e22ce' },
];

export const breakingNewsTickerItems = [
  {
    id: 'ticker-1',
    category: 'Medical',
    text: 'NEET UG 2026: NMC adds 8,400+ MBBS seats across Govt & Private colleges; Counselling schedule announced.',
    date: 'Just Now',
  },
  {
    id: 'ticker-2',
    category: 'Engineering',
    text: 'JEE Main Session 2 Cutoff Expectations: JoSAA 2026 seat matrix for top 31 NITs & IIITs released.',
    date: '10 mins ago',
  },
  {
    id: 'ticker-3',
    category: 'Management',
    text: 'IIM Admissions 2026: CAT percentile cutoffs and PI shortlisting rules updated; Check top non-IIM alternatives.',
    date: '25 mins ago',
  },
  {
    id: 'ticker-4',
    category: 'Online',
    text: 'UGC-DEB 2026 Official Gazette: 120+ Universities authorized for 100% online degrees with degree parity.',
    date: '1 hour ago',
  },
  {
    id: 'ticker-5',
    category: 'Admissions Hotline',
    text: 'Admission Guidance Open: Call Toll-Free Helpline 8802155810 for spot seat booking & 50% scholarship assistance.',
    date: 'Live Now',
  },
];

export const newsArticles = [
  {
    id: 'news-1',
    title: 'NEET UG 2026 Counselling: NMC Releases Revised State Quota Seat Matrix & Expected Cutoffs for MBBS/BDS',
    slug: 'neet-ug-2026-counselling-state-quota-mbbs-seat-matrix',
    category: 'Medical',
    categorySlug: 'medical',
    image: '/medical-news.jpg',
    date: 'October 13, 2026',
    readTime: '4 min read',
    author: 'Dr. Aarav Mehta, MD',
    isBreaking: true,
    isTrending: true,
    views: '24.8K',
    excerpt: 'The National Medical Commission (NMC) has published the upgraded seat distribution for NEET UG 2026. Over 8,400 new MBBS seats in government and trust colleges have been greenlit for the upcoming academic cycle.',
    keyHighlights: [
      '8,400+ brand new MBBS seats added across 28 states',
      'AIQ (All India Quota) 15% and State Quota 85% counselling details finalized',
      'Expected general category cutoff marks: 610 - 618 for Top Government Medical Colleges',
      'Stricter regulations on private college clinical training bed ratios introduced',
    ],
    content: `
      <h3>Major Breakthrough for Medical Aspirants in 2026</h3>
      <p>In a landmark notification, the National Medical Commission (NMC) together with the Medical Counselling Committee (MCC) has unveiled the state-wise seat matrix for NEET UG 2026 admissions. With the establishment of new district medical colleges, the national MBBS seat pool has crossed 1,12,000 seats across government, autonomous, and recognized private medical institutions.</p>
      
      <h4>Key Counselling Rounds Schedule 2026:</h4>
      <p>Candidates must ensure their documents—including domicile certificates, category validations, and NEET scorecards—are kept ready in digital format for the four-round MCC online process:</p>
      <ul>
        <li><strong>Round 1 Registration & Choice Filling:</strong> Starts 1st week of next month</li>
        <li><strong>Seat Allotment & Reporting:</strong> 5-day window for college reporting with bond formalities</li>
        <li><strong>Round 2 & Mop-Up Round:</strong> Mandatory verification for upgraded seat seekers</li>
        <li><strong>Stray Vacancy Round:</strong> Deemed and central universities institutional allotment</li>
      </ul>

      <h4>Expected Category-Wise Cutoff Benchmarks:</h4>
      <p>Based on initial paper difficulty indices and candidate counts, educational analysts at CollegeBundle project the following AIQ closing ranks for prestigious state medical institutions:</p>
      <ul>
        <li><strong>General / EWS:</strong> 612 - 620 Marks (Approx. Rank 18,500 - 22,000)</li>
        <li><strong>OBC (Non-Creamy Layer):</strong> 608 - 615 Marks</li>
        <li><strong>SC Candidates:</strong> 495 - 510 Marks</li>
        <li><strong>ST Candidates:</strong> 470 - 485 Marks</li>
      </ul>

      <h4>Looking for Private or Deemed MBBS Seats with Lower Scores?</h4>
      <p>Students scoring between 450 and 550 can explore premier private medical colleges in Karnataka, Maharashtra, Uttar Pradesh, and deemed universities offering subsidized fee structures. For free, unbiased medical seat assessment and fee breakdowns, call our dedicated admission line at <strong>8802155810</strong>.</p>
    `,
    datesTable: [
      { event: 'Round 1 Choice Locking', date: 'Oct 28, 2026' },
      { event: 'Seat Allotment Result (AIQ)', date: 'Nov 02, 2026' },
      { event: 'Physical Verification at Campus', date: 'Nov 04 - Nov 09, 2026' },
      { event: 'Round 2 Registration Commencement', date: 'Nov 14, 2026' },
    ],
    faqs: [
      { q: 'Can I participate in state counselling if I register for AIQ?', a: 'Yes! Candidates can independently participate in both AIQ 15% through MCC and their respective state quota 85% counselling portals.' },
      { q: 'What is the minimum budget required for private MBBS?', a: 'Tuition fees range from ₹8 Lakhs to ₹24 Lakhs per annum depending on the state and minority/quota status. Call 8802155810 for low-package college options.' },
    ]
  },
  {
    id: 'news-2',
    title: 'Engineering Admissions 2026: JoSAA Seat Matrix Released; Computer Science & AI Branches See 18% Intake Surge',
    slug: 'engineering-admissions-2026-josaa-seat-matrix-cse-ai-surge',
    category: 'Engineering',
    categorySlug: 'engineering',
    image: '/engineering-news.jpg',
    date: 'October 13, 2026',
    readTime: '5 min read',
    author: 'Er. Rohan Singhania',
    isBreaking: false,
    isTrending: true,
    views: '31.2K',
    excerpt: 'Joint Seat Allocation Authority (JoSAA) has published the official matrix for 23 IITs, 31 NITs, 26 IIITs, and 38 GFTIs. B.Tech in Artificial Intelligence, Cyber Security, and Data Engineering have seen major seat expansions.',
    keyHighlights: [
      'Over 57,000 engineering seats up for grabs across premier national institutes',
      'AI & Machine Learning specializations formally accredited as independent degree tracks in 18 NITs',
      'Flexible branch change policy adopted by 12 leading technical universities',
      'Direct admissions and management seats open in top private engineering universities',
    ],
    content: `
      <h3>Engineering Landscape Transforms for 2026 Tech Aspirants</h3>
      <p>The Joint Seat Allocation Authority (JoSAA) along with CSAB (Central Seat Allocation Board) has made public the consolidated seat allotment framework. The spotlight this year is on high-demand computer science specializations, including Artificial Intelligence, Robotics, and Cloud Computing.</p>

      <h4>Why 2026 is the Year for Specialised B.Tech Degrees:</h4>
      <p>The AI revolution has caused tech recruiters to prioritize candidates with hands-on exposure to Large Language Models (LLMs), neural systems, and hardware-software co-design. Major universities have upgraded their curricula to align with IEEE and ABET international standards.</p>

      <h4>Top Engineering Pathways Beyond IITs & NITs:</h4>
      <p>If your JEE Main percentile falls in the 80 - 95 bracket, excellent options with stellar campus placements (average ₹8 - ₹16 LPA) include:</p>
      <ul>
        <li><strong>VIT Vellore / Chennai:</strong> Renowned for global partnerships and 900+ recruiting companies</li>
        <li><strong>BITS Pilani / Goa / Hyderabad:</strong> Zero-attendance policy and prestigious startup incubation</li>
        <li><strong>Thapar University, Patiala:</strong> Strong industry links with top MNCs</li>
        <li><strong>SRM University, Chennai:</strong> World-class research labs and computing infrastructure</li>
        <li><strong>Leading State Universities:</strong> CoEP Pune, RV College of Engineering Bangalore, DTU Delhi</li>
      </ul>

      <h4>Get Direct Admission & Management Quota Guidance</h4>
      <p>Need help choosing between Computer Science and Data Science? Or seeking guidance on direct admission procedures in verified colleges? Speak directly with our Senior Engineering Counselors at <strong>8802155810</strong>.</p>
    `,
    datesTable: [
      { event: 'JoSAA Round 1 Seat Allotment', date: 'June 20, 2026' },
      { event: 'Online Reporting & Fee Payment', date: 'June 21 - June 25, 2026' },
      { event: 'CSAB Special Rounds', date: 'July 15 - July 22, 2026' },
      { event: 'Campus Orientation & Classes', date: 'August 01, 2026' },
    ],
    faqs: [
      { q: 'Is B.Tech in AI & ML better than Core Computer Science?', a: 'Core CSE offers broader flexibility, but specialized AI & ML gives you direct edge in data intelligence roles. Both command comparable top-tier recruitment.' },
      { q: 'Can I get into a top engineering college with an 85 percentile in JEE Main?', a: 'Yes! Several top state universities, premier private colleges (VIT, Manipal, Chandigarh University, Amity) and GFTIs offer direct seats at this score. Call 8802155810 for exact options.' }
    ]
  },
  {
    id: 'news-3',
    title: 'Top MBA & PGDM Admissions 2026: IIM Cutoffs, Non-IIM Tier-1 B-Schools, and Average Package Analysis (₹28.4 LPA)',
    slug: 'top-mba-pgdm-admissions-2026-iim-cutoffs-tier-1-bschools',
    category: 'Management',
    categorySlug: 'management',
    image: '/management-news.jpg',
    date: 'October 12, 2026',
    readTime: '4 min read',
    author: 'Pooja Deshmukh, MBA',
    isBreaking: false,
    isTrending: true,
    views: '19.4K',
    excerpt: 'Detailed analysis of CAT, XAT, GMAT, and SNAP cutoffs for 2026 admissions. Top management institutes report robust consulting, fintech, and product management hiring with median packages soaring.',
    keyHighlights: [
      'IIM Ahmedabad, Bangalore, Calcutta composite score weightages revised',
      'Top non-IIM institutions (FMS, XLRI, SPJIMR, MDI, NMIMS, SIBM) open application windows',
      'Executive MBA and 1-Year PGP gaining high traction among IT and finance professionals',
      'Scholarships up to 100% available for high-achieving CAT/XAT score holders',
    ],
    content: `
      <h3>Accelerate Your Career: The Strategic Guide to MBA 2026</h3>
      <p>With corporate India experiencing double-digit growth in digital transformation, supply chain logistics, and venture capital, top business schools are refining their curricula to produce industry-ready leaders. Admission applications for the 2026-2028 batch are now actively processing across top management institutions.</p>

      <h4>CAT Percentile vs Target College Mapping:</h4>
      <ul>
        <li><strong>99+ Percentile:</strong> IIM Ahmedabad, IIM Bangalore, IIM Calcutta, FMS Delhi</li>
        <li><strong>95 - 98.9 Percentile:</strong> IIM Lucknow, IIM Kozhikode, IIM Indore, MDI Gurgaon, SPJIMR</li>
        <li><strong>85 - 94 Percentile:</strong> New & Baby IIMs, IMT Ghaziabad, IMI New Delhi, FORE School of Management, TAPMI Manipal</li>
        <li><strong>75 - 84 Percentile:</strong> Great Lakes, Jaipuria Institute, BIMTECH, Amity, LPU, Alliance University</li>
      </ul>

      <h4>Key Specializations in High Demand for 2026:</h4>
      <p>Business Analytics, Product Management, Fintech Strategies, and ESG (Environmental, Social, and Governance) management are seeing the highest placement packages, with global consulting firms leading recruitment.</p>

      <h4>Need 1-on-1 Profile Evaluation?</h4>
      <p>Don't let a low entrance percentile hold you back from a high-ROI business school. Many premier AICTE-approved institutions offer holistic profile-based selections. Connect with our dedicated MBA admission desk at <strong>8802155810</strong> for profile shortlisting.</p>
    `,
    datesTable: [
      { event: 'CAT Exam & Result Window', date: 'Nov 2026 - Jan 2027' },
      { event: 'XAT 2027 Registration Deadline', date: 'Nov 30, 2026' },
      { event: 'GD / PI Round Invitations', date: 'Feb - March 2027' },
      { event: 'Final Merit Lists & Offer Letters', date: 'April - May 2027' },
    ],
    faqs: [
      { q: 'Is PGDM equivalent to an MBA degree?', a: 'Yes! AICTE-approved PGDM programs that are accredited by the Association of Indian Universities (AIU) are legally equivalent to MBA degrees for all government jobs and higher studies.' },
      { q: 'What is the ROI on an MBA with ₹10-15 Lakh fees?', a: 'Institutes in this bracket typically report average starting packages between ₹9 LPA and ₹14 LPA, allowing complete recovery of education costs within 18 months.' }
    ]
  },
  {
    id: 'news-4',
    title: 'Online Higher Education: UGC-DEB Approvals, Degree Legitimacy, Fees & Top 10 Online Universities 2026',
    slug: 'online-higher-education-ugc-deb-approvals-fees-universities',
    category: 'Online',
    categorySlug: 'online',
    image: '/online-degree-news.jpg',
    date: 'October 13, 2026',
    readTime: '6 min read',
    author: 'Prof. Rajeshwari Sen',
    isBreaking: true,
    isTrending: true,
    views: '42.1K',
    excerpt: 'Everything you must know about Online Degrees in India: UGC Gazette Notification proving 100% equivalence to on-campus degrees, NAAC A++ universities, no-cost EMI fees, and placement support.',
    keyHighlights: [
      'Official UGC Notification confirms Online Degrees hold 100% equivalence for UPSC, MNCs, & Foreign Visas',
      'Zero commute: Learn via modern LMS with live Sunday lectures & recorded video vaults',
      'Affordable tuition starting from just ₹6,000/month with zero-interest student EMI',
      'Top recognized universities: Amity, LPU, Manipal, Chandigarh University, DY Patil, Jain Online',
    ],
    content: `
      <h3>Online Degrees Guide 2026</h3>
      <p>Gone are the days when distance education meant waiting months for postal textbooks. In 2026, UGC (University Grants Commission) and DEB (Distance Education Bureau) have established clear, rigorous frameworks allowing accredited NAAC A/A+ universities to deliver full-fledged digital bachelor's and master's degree programs.</p>

      <h4>The 5 Golden Rules to Verify an Online Degree:</h4>
      <ol>
        <li><strong>UGC-DEB Approval:</strong> Check the university's entitlement on the official deb.ugc.ac.in portal for your specific admission session.</li>
        <li><strong>NAAC Grading:</strong> Universities with NAAC A+, A++, or Category-1 autonomy provide internationally recognized credentials.</li>
        <li><strong>AICTE Approval:</strong> Mandatory for technical and management courses like Online MBA, MCA, and BCA.</li>
        <li><strong>Proctored Examination Mode:</strong> Legitimate online programs utilize AI-proctored or designated center semester examinations.</li>
        <li><strong>No "Online" Stamp on Degree:</strong> As per UGC directives, the certificate format matches the regular on-campus degree without discriminatory disclaimers.</li>
      </ol>

      <h4>Popular Online Programs with High ROI:</h4>
      <ul>
        <li><strong>Online MBA:</strong> Fees ₹1.2L - ₹2.8L | Average Hike: 45% - 70% for working professionals</li>
        <li><strong>Online MCA:</strong> Fees ₹1.1L - ₹2.2L | Focus on Full Stack, Cloud, DevOps & AI</li>
        <li><strong>Online BCA:</strong> Fees ₹90K - ₹1.8L | Ideal launchpad for IT careers straight after 12th</li>
        <li><strong>Online BBA & B.Com:</strong> Fees ₹80K - ₹1.5L | High flexibility for CA / Government exam aspirants</li>
      </ul>

      <h4>Get Free University Shortlist & Up to 50% Scholarship</h4>
      <p>CollegeBundle partners directly with over 40+ leading UGC-approved online universities. Get personalized fee comparison, syllabus breakdown, and scholarship vouchers by calling our counselor helpline at <strong>8802155810</strong>.</p>
    `,
    datesTable: [
      { event: 'Winter / January Session Admissions', date: 'Dec 15 - Feb 28, 2026' },
      { event: 'Summer / July Session Admissions', date: 'June 01 - August 31, 2026' },
      { event: 'LMS Access & Student Portal Activation', date: 'Within 48 hours of verification' },
      { event: 'First Semester Term-End Exams', date: 'Flexible Weekend Windows' },
    ],
    faqs: [
      { q: 'Can I apply for government jobs (UPSC, SSC, Banking) with an Online Degree?', a: 'ABSOLUTELY YES! As per the UGC Gazette Notification (September 2022), degrees acquired through Online & ODL mode from UGC-recognized institutions are fully equivalent to regular on-campus degrees for all central and state government recruitment.' },
      { q: 'Is there placement assistance provided in online degrees?', a: 'Yes, leading universities like Amity, LPU, and Manipal host virtual job fairs, career portals, and resume-building workshops with 500+ corporate hiring partners.' },
      { q: 'Can fees be paid in monthly installments?', a: 'Yes! Most universities offer 0% interest EMI options starting at just ₹4,500 - ₹7,000 per month. Call 8802155810 to check EMI eligibility.' }
    ]
  },
  {
    id: 'news-5',
    title: 'Top Medical Colleges in India 2026: NIRF Rankings, Patient Inflow, Stipends & Bond Details',
    slug: 'top-medical-colleges-india-2026-nirf-stipend-bond-guide',
    category: 'Medical',
    categorySlug: 'medical',
    image: '/medical-news.jpg',
    date: 'October 11, 2026',
    readTime: '5 min read',
    author: 'Medical Advisory Board, CollegeBundle',
    isBreaking: false,
    isTrending: false,
    views: '15.6K',
    excerpt: 'Detailed review of AIIMS New Delhi, CMC Vellore, JIPMER Puducherry, KGMU Lucknow, and Kasturba Medical College Manipal. Compare PG stipends, clinical bed occupancy, and rural service bonds.',
    keyHighlights: [
      'Comprehensive breakdown of NIRF 2026 Top 15 Medical Institutions',
      'Clinical exposure metrics: Outpatient (OPD) volume compared',
      'Rural service bond duration & penalty amounts across 15 states',
      'Internship stipend ranges from ₹18,000 to ₹35,000 per month',
    ],
    content: `
      <h3>How to Choose the Right Medical College Beyond Just NIRF Rank</h3>
      <p>When selecting an MBBS or MD destination, two critical factors matter more than campus aesthetics: <em>Clinical Inflow</em> (the variety and volume of patients treated in the teaching hospital) and <em>Post-MBBS Service Bond obligations</em>.</p>
      
      <h4>Top 5 Medical Colleges Breakdown:</h4>
      <ul>
        <li><strong>AIIMS New Delhi:</strong> The pinnacle of Indian medicine. Subsidized tuition under ₹2,000/yr, premier research facilities, zero service bond.</li>
        <li><strong>CMC Vellore:</strong> World-renowned ethical healthcare training. Strong clinical mentorship with heavy inpatient exposure.</li>
        <li><strong>JIPMER Puducherry:</strong> Autonomous institute of national importance with stellar internal PG reservation.</li>
        <li><strong>Kasturba Medical College (KMC Manipal):</strong> Top-tier private institution accredited globally with USMLE / PLAB high success ratios.</li>
        <li><strong>KGMU Lucknow:</strong> Historic medical powerhouse with 4,500+ hospital beds and massive patient diversity.</li>
      </ul>

      <h4>For Admission Queries & Cutoff Guidance:</h4>
      <p>Dial our medical counseling team at <strong>8802155810</strong> for state quota rank analysis.</p>
    `,
    datesTable: [],
    faqs: []
  },
  {
    id: 'news-6',
    title: 'B.Tech Placements 2026 Report: High Growth in Cloud, Embedded Systems & Fintech; Median Salaries Jump',
    slug: 'btech-placements-2026-report-cloud-embedded-fintech',
    category: 'Engineering',
    categorySlug: 'engineering',
    image: '/engineering-news.jpg',
    date: 'October 10, 2026',
    readTime: '3 min read',
    author: 'Campus Placement Cell Tracker',
    isBreaking: false,
    isTrending: false,
    views: '18.9K',
    excerpt: 'Hiring patterns shift toward specialization: Students with verifiable GitHub portfolios and open-source contributions secure 30% higher compensation packages across campus drives.',
    keyHighlights: [
      'Highest domestic package touches ₹1.12 Crore in 2026 recruitment drives',
      'Over 60% of job offers originate from product companies and high-growth fintechs',
      'Core branches (ECE, Mechanical) see renewed hiring in electric vehicle (EV) and semiconductor manufacturing',
    ],
    content: `
      <p>Engineering colleges that implemented project-based grading and industry internships have recorded historic placement statistics this season. Recruiters are seeking graduates proficient in modern developer workflows, distributed systems, and edge computing.</p>
      <p>For counseling on which colleges offer guaranteed placement tracks, call <strong>8802155810</strong>.</p>
    `,
    datesTable: [],
    faqs: []
  }
];
