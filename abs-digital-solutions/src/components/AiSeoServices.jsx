import React, { useState } from 'react';
import {
  Cpu,
  Sparkles,
  Bot,
  Search,
  Zap,
  TrendingUp,
  Globe,
  Code2,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Terminal,
  Activity,
} from 'lucide-react';

export default function AiSeoServices({ onSelectService }) {
  const [activeTab, setActiveTab] = useState('llmo');

  const aiServices = [
    {
      id: 'llmo',
      title: 'LLMO Services',
      subtitle: 'Large Language Model Optimization',
      tag: 'ChatGPT • Gemini • Claude',
      icon: Bot,
      color: '#06b6d4',
      description:
        'Transform your brand from invisible in AI answers to the top cited reference in ChatGPT, Google Gemini, Anthropic Claude, and Copilot conversational responses.',
      deliverables: [
        'Entity extraction and knowledge graph semantic structuring',
        'Direct citation and quote placement optimization for LLMs',
        'Factual accuracy verification in LLM pre-training & RAG datasets',
        'Proprietary Prompt Response Testing across 100+ industry prompts',
        'Structured schema markup for conversational AI agents',
      ],
      kpi: '85% Citation Frequency Boost',
    },
    {
      id: 'aiseo',
      title: 'AI Search Optimization (AI SEO)',
      subtitle: 'Next-Gen Search Engine Dominance',
      tag: 'Perplexity • SearchGPT • SGE',
      icon: Search,
      color: '#0c5adb',
      description:
        'Search is moving from blue links to AI synthesis. We optimize your website specifically for AI search engines like Perplexity AI, OpenAI SearchGPT, and Google AI Overviews.',
      deliverables: [
        'Perplexity Pro & SearchGPT indexing and source citation engineering',
        'Google AI Overviews (SGE) trigger keyword optimization',
        'Real-time Retrieval-Augmented Generation (RAG) optimization',
        'Deep answer architecture matching multi-hop queries',
        'High-density informational content with statistical credibility',
      ],
      kpi: 'Top 3 AI Source Recommendation',
    },
    {
      id: 'geo',
      title: 'Generative Engine Optimization (GEO)',
      subtitle: 'Synthesis & Generative Citations',
      tag: 'Princeton & Stanford GEO Standard',
      icon: Sparkles,
      color: '#8b5cf6',
      description:
        'Using research-backed Generative Engine Optimization techniques to ensure your technical content, whitepapers, and guides are selected by generative algorithms during real-time answer synthesis.',
      deliverables: [
        'Quotation addition & authority statistics integration',
        'Fluency and technical comprehension enhancement',
        'Contextual relevance clustering for AI vectors',
        'Authoritative cross-linking and third-party citation building',
        'GEO benchmark analysis against top competitors',
      ],
      kpi: '40% Increase in AI Answer Visibility',
    },
    {
      id: 'aeo',
      title: 'Answer Engine Optimization (AEO)',
      subtitle: 'Zero-Click & Featured Snippets',
      tag: 'Knowledge Panels • Voice Search',
      icon: Zap,
      color: '#059669',
      description:
        'Dominate direct answers in Google Featured Snippets, Voice Assistants (Siri, Alexa, Google Assistant), and zero-click search boxes that capture 65% of user clicks.',
      deliverables: [
        'Question-and-Answer (Q&A) content restructuring',
        'Comprehensive JSON-LD FAQ, HowTo, and Organization Schema',
        'Knowledge Graph entity linking with Wikidata and Wikipedia',
        'Voice search query intent and conversational syntax optimization',
        'Table and numbered-list snippet formatting for instant indexing',
      ],
      kpi: '#1 Featured Snippet Position',
    },
    {
      id: 'heo',
      title: 'Hybrid Engine Optimization (HEO)',
      subtitle: 'Unified Organic SERPs + AI Citations',
      tag: 'Dual-Engine Architecture',
      icon: TrendingUp,
      color: '#0891b2',
      description:
        'The best of both worlds: HEO combines traditional high-ranking Google/Bing organic SEO with modern AI engine citation strategies so your brand wins across both discovery channels.',
      deliverables: [
        'Dual-purpose keyword strategy (traditional search volume + prompt volume)',
        'Core Web Vitals & technical crawl budget optimization',
        'Dual-indexing for traditional Googlebots and AI crawler user-agents',
        'High-converting landing page optimization with rich microdata',
        'Unified monthly growth analytics covering SERP + AI search share',
      ],
      kpi: 'Complete Search Ecosystem Dominance',
    },
    {
      id: 'brand-visibility',
      title: 'AI Brand Visibility',
      subtitle: 'Entity Sentiment & Vector Space Authority',
      tag: 'LLM Brand Sentiment',
      icon: Globe,
      color: '#d97706',
      description:
        'Measure, track, and protect how artificial intelligence models perceive and describe your company, products, executives, and services.',
      deliverables: [
        'LLM Brand Sentiment & Bias Analysis across OpenAI, Anthropic & Google',
        'Proactive AI hallucination prevention and fact correction',
        'Authoritative digital PR to seed positive entity data into future training runs',
        'Executive thought leadership placement in indexed publications',
        'Competitor brand comparison positioning in AI recommendations',
      ],
      kpi: 'Positive Sentiment Across All Models',
    },
  ];

  const currentService = aiServices.find((s) => s.id === activeTab) || aiServices[0];

  return (
    <section id="ai-seo-services" className="py-20 bg-white border-b border-slate-200">
      <div className="abs-container">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="section-badge orange">
            <Cpu className="w-4 h-4 text-[#06b6d4]" />
            <span>Next-Gen SEO &amp; AI Search Optimization</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#081120] font-['Outfit'] mt-2">
            Dominate Google SERPs &amp; AI Answer Engines (LLMO • GEO • AEO • HEO)
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-3">
            Traditional SEO is no longer enough. ABS Digital Solutions engineers full-funnel search strategies that position your company as the authoritative answer in ChatGPT, Perplexity, Google SGE, and SearchGPT.
          </p>
        </div>

        {/* Interactive Service Selector Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {aiServices.map((srv) => (
            <button
              key={srv.id}
              onClick={() => setActiveTab(srv.id)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer flex items-center gap-2 ${
                activeTab === srv.id
                  ? 'bg-[#081120] text-white shadow-lg scale-105'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <span>{srv.title}</span>
            </button>
          ))}
        </div>

        {/* Active Service Showcase Card */}
        {/* Active Service Showcase Card (High Contrast Dark Theme) */}
        <div
          className="rounded-2xl shadow-2xl mb-16"
          style={{
            background: 'linear-gradient(135deg, #081120 0%, #0c1e3d 100%)',
            border: '1px solid #1e293b',
            color: '#ffffff',
            padding: '32px',
          }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Column Info */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center gap-3.5">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-md shrink-0"
                  style={{ backgroundColor: currentService.color }}
                >
                  <currentService.icon className="w-6 h-6" />
                </div>
                <div>
                  <span
                    style={{
                      fontSize: '11px',
                      fontWeight: 800,
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                      color: '#06b6d4',
                      display: 'block',
                    }}
                  >
                    {currentService.tag}
                  </span>
                  <h3
                    style={{
                      fontSize: 'clamp(1.5rem, 3vw, 2.2rem)',
                      fontWeight: 800,
                      color: '#ffffff',
                      fontFamily: "var(--font-heading, 'Outfit', sans-serif)",
                      lineHeight: 1.2,
                    }}
                  >
                    {currentService.title}
                  </h3>
                </div>
              </div>

              <p
                style={{
                  color: '#cbd5e1',
                  fontSize: '15px',
                  lineHeight: 1.6,
                }}
              >
                {currentService.description}
              </p>

              {/* Deliverables List */}
              <div style={{ paddingTop: '8px' }}>
                <span
                  style={{
                    fontSize: '11px',
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    color: '#94a3b8',
                    display: 'block',
                    marginBottom: '10px',
                  }}
                >
                  Key Technical Execution:
                </span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {currentService.deliverables.map((item, idx) => (
                    <div
                      key={idx}
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '10px',
                        fontSize: '13px',
                        color: '#f8fafc',
                      }}
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span style={{ color: '#f8fafc', fontWeight: 500 }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => onSelectService && onSelectService(currentService.title)}
                  className="btn-orange text-xs sm:text-sm py-3 px-6 font-bold rounded-lg shadow-md flex items-center gap-2 cursor-pointer"
                >
                  <span>Request Strategy Audit for {currentService.title}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontSize: '12px',
                    color: '#fbbf24',
                    backgroundColor: 'rgba(245, 158, 11, 0.1)',
                    border: '1px solid rgba(245, 158, 11, 0.25)',
                    padding: '8px 14px',
                    borderRadius: '8px',
                    fontWeight: 600,
                  }}
                >
                  <Activity className="w-4 h-4 text-amber-400" />
                  <span>Target Result: {currentService.kpi}</span>
                </div>
              </div>
            </div>

            {/* Right Column Technical Architecture Visual (High Contrast Dark Terminal) */}
            <div
              className="lg:col-span-5"
              style={{
                backgroundColor: '#0f172a',
                borderRadius: '16px',
                padding: '24px',
                border: '1px solid #1e293b',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.3)',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'between',
                  fontSize: '12px',
                  fontFamily: 'monospace',
                  color: '#94a3b8',
                  borderBottom: '1px solid #1e293b',
                  paddingBottom: '12px',
                  width: '100%',
                }}
              >
                <span style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#34d399', fontWeight: 700 }}>
                  <Terminal className="w-4 h-4" />
                  <span>ai_search_pipeline.ts</span>
                </span>
                <span style={{ color: '#fbbf24', marginLeft: 'auto', fontWeight: 700, fontSize: '11px' }}>
                  ● LIVE MONITORING
                </span>
              </div>

              <div
                style={{
                  backgroundColor: '#020617',
                  borderRadius: '10px',
                  padding: '16px',
                  border: '1px solid #1e293b',
                  fontFamily: 'monospace',
                  fontSize: '12px',
                  lineHeight: 1.6,
                  color: '#cbd5e1',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '6px',
                }}
              >
                <div style={{ color: '#64748b' }}>// AI Retrieval Simulation</div>
                <div>
                  <span style={{ color: '#60a5fa' }}>query</span> = &quot;Top WCAG Accessibility &amp; AI SEO Agency in India&quot;;
                </div>
                <div>
                  <span style={{ color: '#c084fc' }}>synthesize</span>(query) &#123;
                </div>
                <div style={{ paddingLeft: '16px', color: '#6ee7b7' }}>
                  primary_citation: &quot;ABS Digital Solutions (Sector 22, Noida)&quot;,
                </div>
                <div style={{ paddingLeft: '16px', color: '#cbd5e1' }}>
                  relevance_score: <span style={{ color: '#06b6d4', fontWeight: 700 }}>0.994</span>,
                </div>
                <div style={{ paddingLeft: '16px', color: '#cbd5e1' }}>
                  confidence: &quot;High Authority - Certified WCAG 2.2&quot;
                </div>
                <div>&#125;;</div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px', textAlign: 'center' }}>
                <div
                  style={{
                    backgroundColor: '#090d16',
                    padding: '12px',
                    borderRadius: '10px',
                    border: '1px solid #1e293b',
                  }}
                >
                  <div style={{ fontSize: '20px', fontWeight: 800, color: '#ffffff', fontFamily: "var(--font-heading, 'Outfit', sans-serif)" }}>
                    100%
                  </div>
                  <div style={{ fontSize: '10px', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Schema Integrity
                  </div>
                </div>
                <div
                  style={{
                    backgroundColor: '#090d16',
                    padding: '12px',
                    borderRadius: '10px',
                    border: '1px solid #1e293b',
                  }}
                >
                  <div style={{ fontSize: '20px', fontWeight: 800, color: '#06b6d4', fontFamily: "var(--font-heading, 'Outfit', sans-serif)" }}>
                    &lt; 1.2s
                  </div>
                  <div style={{ fontSize: '10px', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    LLM RAG Index Latency
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>


        {/* Web Development Section Banner */}
        <div id="web-development" className="bg-slate-50 border border-slate-200 rounded-2xl p-8 sm:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="section-badge">
                <Code2 className="w-4 h-4 text-[#0c5adb]" />
                <span>Web Development &amp; Engineering</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#081120] font-['Outfit']">
                High-Performance, WCAG-Compliant Modern Web Applications
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                We craft ultra-fast, mobile-responsive web platforms engineered for maximum conversion. Every website is built from scratch with semantic HTML5, native ARIA landmarks, mobile-first layouts, and 99+ Google PageSpeed Core Web Vitals score.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-xs text-slate-700">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>React 19 &amp; Vite Architectures</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Sub-second Mobile Loading</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>WCAG 2.2 AA Contrast &amp; Focus</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Supabase &amp; Headless Backends</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Dynamic Lead Capture CRMs</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Structured SEO JSON-LD Markup</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 text-center lg:text-right">
              <button
                onClick={() => onSelectService && onSelectService('Full-Stack Accessible Web Development')}
                className="btn-primary w-full sm:w-auto py-3.5 px-6 font-bold text-xs uppercase tracking-wider rounded-xl shadow-md"
              >
                <span>Discuss Your Web Project</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
