import React from 'react';
import { X, Calendar, Clock, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';

export default function BlogArticleModal({ article, onClose, onOpenAuditModal }) {
  if (!article) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/70 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-3xl max-h-[90vh] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col border border-slate-200">
        
        {/* Top Header */}
        <div
          className="p-5 sm:p-6 text-white flex items-start justify-between"
          style={{ background: 'linear-gradient(135deg, #081120 0%, #0c1e3d 100%)' }}
        >
          <div className="space-y-2 pr-6">
            <span
              className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md text-white font-mono"
              style={{ backgroundColor: article.accentColor || '#0c5adb' }}
            >
              {article.category}
            </span>
            <h3 className="text-xl sm:text-2xl font-extrabold font-['Outfit'] text-white leading-tight">
              {article.title}
            </h3>
            <div className="flex items-center gap-4 text-xs text-slate-300 pt-1">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-amber-400" />
                <span>Published on {article.date}</span>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-cyan-400" />
                <span>{article.readTime}</span>
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-300 hover:text-white rounded-lg hover:bg-white/10 transition cursor-pointer shrink-0"
            aria-label="Close article modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Article Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-4 text-sm text-slate-700 leading-relaxed bg-white">
          <p className="text-base text-slate-900 font-semibold leading-relaxed border-l-4 pl-4 py-1" style={{ borderColor: article.accentColor || '#0c5adb' }}>
            {article.excerpt}
          </p>

          <div className="prose prose-slate max-w-none space-y-4 pt-2">
            {article.content.split('\n\n').map((paragraph, idx) => {
              const text = paragraph.trim();
              if (!text) return null;

              if (text.startsWith('### ')) {
                return (
                  <h4 key={idx} className="text-lg font-bold text-[#081120] font-['Outfit'] pt-2">
                    {text.replace('### ', '')}
                  </h4>
                );
              }
              if (text.startsWith('#### ')) {
                return (
                  <h5 key={idx} className="text-base font-bold text-slate-800 font-['Outfit'] pt-2">
                    {text.replace('#### ', '')}
                  </h5>
                );
              }
              if (text.startsWith('1.') || text.startsWith('- ')) {
                return (
                  <div key={idx} className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs sm:text-sm space-y-2 text-slate-800">
                    {text.split('\n').map((li, lIdx) => (
                      <div key={lIdx} className="flex items-start gap-2">
                        <span className="text-[#0c5adb] font-bold">•</span>
                        <span>{li.replace(/^[0-9]+\.\s+|\-\s+/, '')}</span>
                      </div>
                    ))}
                  </div>
                );
              }

              return (
                <p key={idx} className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {text}
                </p>
              );
            })}
          </div>

          {/* Call to Action Inside Article */}
          <div className="mt-8 p-5 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h5 className="text-sm font-bold text-slate-900 font-['Outfit']">
                Need expert implementation for your organization?
              </h5>
              <p className="text-xs text-slate-500 mt-0.5">
                Speak directly with Rahul Singh and our compliance architects in Noida.
              </p>
            </div>
            <button
              onClick={() => {
                onClose();
                if (onOpenAuditModal) onOpenAuditModal(`Article Consultation: ${article.title}`);
              }}
              className="btn-orange text-xs py-2.5 px-4 font-bold rounded-lg shrink-0 cursor-pointer flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Request Free Audit</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
