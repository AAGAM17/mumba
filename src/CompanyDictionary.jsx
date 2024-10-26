import React, { useState, useEffect } from 'react';
import { Bookmark, Share2, MessageSquare, X, LayoutDashboard } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Link, useLocation } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const ArticleCard = ({ category, title, author, readTime, content }) => (
  <Card className="bg-slate-900/40 text-white backdrop-blur-lg border border-slate-800/50 overflow-hidden mb-8">
    <div className="p-8">
      {/* Top Action Bar */}
      <div className="flex justify-between items-center mb-6">
        {/* Dashboard Button */}
        <Link to="/dashboard">
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg transition-colors text-sm font-medium">
            <LayoutDashboard className="w-4 h-4" />
            Move to Dashboard
          </button>
        </Link>
        {/* Close Button */}
        <button className="p-2 hover:bg-slate-800/50 rounded-full transition-colors">
          <X className="w-5 h-5 text-gray-400" />
        </button>
      </div>
      {/* Category Tag */}
      <div className="mb-6">
        <span className="px-4 py-1.5 bg-blue-500/20 text-blue-400 rounded-full text-sm">
          {category}
        </span>
      </div>
      {/* Title */}
      <h2 className="text-3xl font-bold mb-6">{title}</h2>
      {/* Author Info and Read Time */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center">
          <span className="text-blue-400">{author.initials}</span>
        </div>
        <div className="flex-1">
          <h3 className="text-white">{author.name}</h3>
        </div>
      </div>
      {/* Content */}
      <div className="text-gray-300 leading-relaxed">
        <ReactMarkdown 
          remarkPlugins={[remarkGfm]} 
          className="prose prose-invert max-w-none"
          components={{
            table: ({node, ...props}) => (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-700" {...props} />
              </div>
            ),
            thead: ({node, ...props}) => <thead className="bg-gray-800" {...props} />,
            th: ({node, ...props}) => <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider" {...props} />,
            td: ({node, ...props}) => <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300" {...props} />,
          }}
        >
          {content}
        </ReactMarkdown>
      </div>
    </div>
  </Card>
);

const CompanyDict = () => {
  const [generatedContent, setGeneratedContent] = useState('');
  const location = useLocation();

  useEffect(() => {
    if (location.state && location.state.generatedContent) {
      setGeneratedContent(location.state.generatedContent);
    }
  }, [location]);

  return (
    <div className="min-h-screen bg-slate-950 p-8">
      {/* Header Section */}
      <div className="container mx-auto text-center mb-16">
        <h1 className="text-5xl font-bold text-white mb-4">Company Dictionary</h1>
        <p className="text-gray-400">
          Personalized Content Strategy based on your niche and domain analysis
        </p>
      </div>
      
      {/* Content Cards */}
      <div className="max-w-4xl mx-auto relative">
        {generatedContent ? (
          <ArticleCard
            category="Content Strategy"
            title="YouTube Content Creator Suggestions"
            author={{
              name: "AI Assistant",
              initials: "AI"
            }}
            content={generatedContent}
          />
        ) : (
          <p className="text-white text-center">No content generated yet.</p>
        )}
        
        {/* Background Glow Effect */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-blue-500/10 blur-3xl"></div>
        </div>
      </div>
    </div>
  );
};

export default CompanyDict;