import React from 'react';
import { Bookmark, Share2, MessageSquare, X, LayoutDashboard } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Link } from 'react-router-dom';

const RecommendedTextDashboard = () => {
  return (
    <div className="min-h-screen bg-slate-950 p-8">
      {/* Header Section */}
      <div className="container mx-auto text-center mb-16">
        <h1 className="text-5xl font-bold text-white mb-4">Tailored Strategy</h1>
        <p className="text-gray-400">
          Personalized Content Strategy based on your niche and domain analysis
        </p>
      </div>

      {/* Content Card */}
      <div className="max-w-4xl mx-auto">
        <Card className="bg-slate-900/40 text-white backdrop-blur-lg border border-slate-800/50 overflow-hidden">
          <div className="p-8">
            {/* Top Action Bar */}
            <div className="flex justify-between items-center mb-6">
              {/* Dashboard Button */}
            <Link to="/dashboard"> <button 
                className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 
                           rounded-lg transition-colors text-sm font-medium"
              >
                <LayoutDashboard className="w-4 h-4" />
                Move to Dashboard
              </button></Link> 

              {/* Close Button */}
              <button className="p-2 hover:bg-slate-800/50 rounded-full transition-colors">
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            {/* Category Tag */}
            <div className="mb-6">
              <span className="px-4 py-1.5 bg-blue-500/20 text-blue-400 rounded-full text-sm">
                Technology
              </span>
            </div>

            {/* Title */}
            <h2 className="text-3xl font-bold mb-6">The Future of AI</h2>

            {/* Author Info and Read Time */}
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center">
                <span className="text-blue-400">SC</span>
              </div>
              <div className="flex-1">
                <h3 className="text-white">Dr. Sarah Chen</h3>
                <p className="text-sm text-gray-400">5 min read</p>
              </div>
              
              {/* Action Buttons */}
              <div className="flex gap-4">
                <button className="p-2 hover:bg-slate-800/50 rounded-full transition-colors">
                  <Bookmark className="w-5 h-5 text-gray-400" />
                </button>
                <button className="p-2 hover:bg-slate-800/50 rounded-full transition-colors">
                  <Share2 className="w-5 h-5 text-gray-400" />
                </button>
                <button className="p-2 hover:bg-slate-800/50 rounded-full transition-colors">
                  <MessageSquare className="w-5 h-5 text-gray-400" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="text-gray-300 leading-relaxed">
              <p>
                Exploring the ethical implications of artificial intelligence in modern society...Lorem ipsum dolor sit amet, 
                consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim 
                veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
            </div>
          </div>
        </Card>

        {/* Background Glow Effect */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-blue-500/10 blur-3xl"></div>
        </div>
      </div>
    </div>
  );
};

export default RecommendedTextDashboard;