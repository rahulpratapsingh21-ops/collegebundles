import React, { useState } from 'react';
import { blogArticles } from '../data/blogArticles';
import BlogArticleModal from './BlogArticleModal';
import { BookOpen } from 'lucide-react';

export default function BlogSection({ onOpenAuditModal }) {
  const [selectedArticle, setSelectedArticle] = useState(null);

  return (
    <section id="insights-blog" className="py-20 bg-[#fafafa] border-b border-slate-200">
      <div className="abs-container">
        
        {/* Section Header (Matching User Screenshot 2: "What to Read Next") */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h2 className="text-3xl sm:text-5xl font-black text-[#081120] font-['Outfit'] tracking-tight">
            What to Read Next
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-3">
            In-depth guides on WCAG 2.2 accessibility, LLMO &amp; Generative Engine Optimization, PDF/UA remediation, and accessible eLearning.
          </p>
        </div>

        {/* 4 Cards Grid - Matching Screenshot 2 Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7">
          {blogArticles.map((article) => (
            <div
              key={article.id}
              className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-sm hover:shadow-xl hover:border-slate-300 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Card Top Graphic Cover Image (Matching Screenshot 2) */}
                <div
                  className="relative w-full overflow-hidden bg-slate-100 cursor-pointer"
                  style={{ aspectRatio: '16/9' }}
                  onClick={() => setSelectedArticle(article)}
                >
                  <img
                    src={article.coverImage}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    loading="lazy"
                  />
                  <div className="absolute top-2.5 right-2.5 bg-[#081120]/80 backdrop-blur-xs text-white text-[10px] font-mono px-2 py-0.5 rounded-md font-semibold">
                    {article.readTime}
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-5 sm:p-6 space-y-3">
                  <h3
                    onClick={() => setSelectedArticle(article)}
                    className="text-base sm:text-lg font-bold text-[#081120] font-['Outfit'] leading-snug group-hover:text-[#0c5adb] transition-colors cursor-pointer"
                  >
                    {article.title}
                  </h3>

                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                    {article.excerpt}
                  </p>

                  <div className="text-[12px] text-slate-400 font-medium pt-1">
                    Published on {article.date}
                  </div>
                </div>
              </div>

              {/* Card Bottom: Pill "Read More" button with yellow circular arrow (Screenshot 2) */}
              <div className="p-5 sm:p-6 pt-0">
                <button
                  type="button"
                  onClick={() => setSelectedArticle(article)}
                  className="blog-read-more-btn group/btn"
                >
                  <span className="blog-read-more-arrow">
                    <svg
                      viewBox="0 0 24 24"
                      width="14"
                      height="14"
                      fill="none"
                      stroke="#081120"
                      strokeWidth="2.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </span>
                  <span>Read More</span>
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Full Article Reader Modal */}
      <BlogArticleModal
        article={selectedArticle}
        onClose={() => setSelectedArticle(null)}
        onOpenAuditModal={onOpenAuditModal}
      />
    </section>
  );
}
