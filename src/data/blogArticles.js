export const blogArticles = [
  {
    id: 'wcag-22-enterprise-checklist',
    title: 'Digital Accessibility Strategy for 2026: Complete WCAG 2.2 AA Roadmap',
    category: 'Digital Accessibility',
    badge: 'WCAG 2.2 AA Auditing',
    date: 'December 17th, 2025',
    readTime: '6 min read',
    accentColor: '#0c5adb',
    coverImage: '/blog/blog-accessibility.jpg',
    excerpt:
      'Explore essential WCAG 2.2 success criteria, focus appearance requirements, and why automated tools miss 70% of accessibility violations without human screen-reader audits.',
    content: `
### Why WCAG 2.2 Compliance is Mandatory for Global Organizations in 2026

The World Wide Web Consortium (W3C) officially published WCAG 2.2 to address modern mobile touch interactions, cognitive disabilities, and keyboard-focus navigation. With the European Accessibility Act (EAA) taking full enforcement and US Department of Justice (DOJ) ADA Title III regulations expanding across public and private sectors, digital accessibility is no longer optional.

#### Key Success Criteria in WCAG 2.2 Level AA:
1. **Focus Appearance (Minimum) (2.4.11):** Ensures keyboard focus indicators have sufficient contrast (at least 3:1) and area against background elements.
2. **Dragging Movements (2.5.7):** Any drag-and-drop interaction must provide a single-pointer alternative (e.g. click-to-move buttons).
3. **Target Size (Minimum) (2.5.8):** Interactive targets must be at least 24 by 24 CSS pixels, preventing accidental taps on mobile viewports.
4. **Accessible Authentication (3.3.8):** Cognitive function tests (like memorizing passwords or solving puzzles) must not be the only way to log in.
5. **Redundant Entry (3.3.7):** Information previously entered by the user must be auto-populated or available for selection.

#### The Risk of Relying Solely on Automated Scanners
Automated tools can only detect approximately 30% of accessibility barriers (such as color contrast code values or missing alt text attributes). They cannot evaluate whether alt text is contextually meaningful, whether reading order makes sense to a blind user on JAWS, or if modal dialogs trap focus. Full compliance requires manual testing by trained accessibility engineers and assistive technology users.
    `,
  },
  {
    id: 'llmo-geo-ai-search-guide',
    title: 'Top AI Search & LLMO Optimization Strategies in India 2026',
    category: 'Next-Gen AI SEO',
    badge: 'LLMO & GEO Citations',
    date: 'December 22nd, 2025',
    readTime: '8 min read',
    accentColor: '#06b6d4',
    coverImage: '/blog/blog-ai-seo.jpg',
    excerpt:
      'Search behavior is moving from 10 blue Google links to conversational AI answers. Discover how Generative Engine Optimization (GEO) positions your brand as the primary cited source.',
    content: `
### The Paradigm Shift: From Search Engines to Generative AI Answer Engines

Over 65% of enterprise queries now touch AI answer engines like OpenAI SearchGPT, Perplexity AI, Claude, and Google AI Overviews. Traditional keyword frequency no longer guarantees inclusion. Generative Engine Optimization (GEO) and Large Language Model Optimization (LLMO) are the new disciplines required to capture market share.

#### How LLMs Select Sources for Real-Time Synthesis:
1. **Entity Graph Prominence:** LLMs index semantic entities and their relationships. If your organization is recognized as an authoritative authority in Wikidata and reputable citation networks, your probability of inclusion skyrockets.
2. **Quotable Factual Density:** Generative models prefer direct factual statements, verified statistics, and concise definitions over fluff marketing language.
3. **Structured Knowledge Formats:** Formatting content into semantic JSON-LD, Q&A pairs, and comparison tables allows RAG (Retrieval-Augmented Generation) parsers to ingest facts without hallucination.
4. **Hybrid Engine Optimization (HEO):** Ranking on Google Page 1 provides the base crawling pool from which Perplexity and Google SGE draw real-time citations.
    `,
  },
  {
    id: 'accessible-elearning-higher-education',
    title: 'Accessible eLearning & LMS Platforms for Higher Education',
    category: 'EdTech & eLearning',
    badge: 'SCORM & LMS Inclusive Content',
    date: 'November 5th, 2024',
    readTime: '7 min read',
    accentColor: '#7c3aed',
    coverImage: '/blog/blog-elearning.jpg',
    excerpt:
      'Designing inclusive online courses in Articulate Storyline 360 and Canvas LMS. Addressing closed captions, keyboard traps, and assistive technology learners.',
    content: `
### Building Inclusive Education for Every Student in Higher Ed

With universities and corporate learning academies delivering 80%+ of professional development online, accessible eLearning is legally mandated. Courses delivered via Canvas, Moodle, or Blackboard must support diverse learners, including those with motor disabilities, hearing loss, and visual impairments.

#### Practical Standards for Course Authors:
1. **Custom Tab Order:** Ensure every interactive slide element (next buttons, hotspots, choices) has a logical tab order that bypasses repetitive navigation.
2. **Synchronized Video Captions:** VTT closed captions must be synchronized with slide voiceovers and audio explanations.
3. **Drag-and-Drop Keyboard Alternatives:** Screen reader users cannot use mouse drags. Storyline branching must provide a keyboard selection equivalent.
4. **Color Contrast in Quiz Feedback:** Never rely solely on green (correct) or red (incorrect) to convey test results; include icons and text labels.
    `,
  },
  {
    id: 'pdf-ua-document-remediation',
    title: 'Document Accessibility & PDF/UA Remediation: ISO 14289 Compliance',
    category: 'Document Accessibility',
    badge: 'PDF/UA & Section 508',
    date: 'January 8th, 2026',
    readTime: '5 min read',
    accentColor: '#059669',
    coverImage: '/blog/blog-pdf-ua.jpg',
    excerpt:
      'A deep dive into ISO 14289-1 PDF/UA standards. Learn how to fix complex data tables, reading order tag trees, and mathematical formulas for screen-reader compliance.',
    content: `
### Remediating Enterprise Documents at Scale

PDFs remain the dominant format for annual reports, academic syllabi, scientific research, and financial statements. However, over 90% of PDFs created by standard exports fail basic Section 508 and WCAG compliance tests, rendering them unreadable for blind users.

#### The Anatomy of a Fully Accessible PDF/UA Document:
1. **Tagged Reading Order:** Screen readers read document tags, not visual coordinates. Improper tagging results in text being announced out of sequence (e.g. multi-column layouts reading across columns instead of down).
2. **Complex Table Tagging:** Data tables must feature tagged header cells (\`<TH>\`) mapped to data cells (\`<TD>\`) with proper scope attributes, especially when spanning multiple pages.
3. **MathML vs Image Formulas:** Mathematical equations must be tagged using MathML or accompanied by precise descriptive text rather than plain raster screenshots.
4. **Decorative Artifacts:** Header rules, background borders, and design flourishes must be tagged as background artifacts so screen readers ignore them.
    `,
  },
];
