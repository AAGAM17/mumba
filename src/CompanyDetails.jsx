import React, { useState } from 'react';
import { Send, X, Sparkles } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { useNavigate, Link } from 'react-router-dom';
import { GoogleGenerativeAI } from "@google/generative-ai";

const CompanyDetailsInput = () => {
  const [companyDetails, setCompanyDetails] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const navigate = useNavigate();

  const apiKey = "AIzaSyC7rtwzCa5XxZqMGJ3FDmAXT3-3Ar8r0BY";
  const genAI = new GoogleGenerativeAI(apiKey);

  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });

  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
  };

  const handleGenerateWithAI = async () => {
    setIsGenerating(true);
    try {
      const result = await model.generateContent({
        contents: [{ role: "user", parts: [{ text: `Expand on this company description with more details: ${companyDetails}` }]}],
        generationConfig,
      });

      const generatedText = result.response.text();
      setCompanyDetails(generatedText);
    } catch (error) {
      console.error('Error generating content:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSubmit = async () => {
    try {
      const chatSession = model.startChat({
        generationConfig,
        history: [
          {
            role: "user",
            parts: [{ text: `Analyze this company: ${companyDetails}. Based on the provided information, create a table with 5 YouTube content creator collaboration suggestions for an Indian fitness tracker company. If the information is insufficient, make reasonable assumptions to fill in any gaps.

            Format the response as a table:

            | Creator Name | Content & Audience Match | Collaboration Concept |
            |--------------|--------------------------|------------------------|
            | [Name]       | [Brief description of content style, audience demographics, and how they align with the fitness tracker] | [Specific, creative promotional idea leveraging the creator's style and audience preferences] |

            Ensure each suggestion is tailored, detailed, and highlights potential benefits for both parties. Focus on Indian YouTubers from various niches that could align with a fitness tracker product. Provide actionable collaboration ideas regardless of the level of detail provided about the company.` }],
          },
        ],
      });

      const result = await chatSession.sendMessage(companyDetails);
      const text = result.response.text();
      navigate('/dict', { state: { generatedContent: text } });
    } catch (error) {
      console.error('Error generating content:', error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 p-8">
      {/* Header Section */}
      <div className="container mx-auto text-center mb-16">
        <h1 className="text-5xl font-bold text-white mb-4">Company Details</h1>
        <p className="text-gray-400">
          Share your company details in detail to receive personalized recommendations
        </p>
      </div>

      {/* Input Card */}
      <div className="max-w-4xl mx-auto">
        <Card className="bg-slate-900/40 text-white backdrop-blur-lg border border-slate-800/50 overflow-hidden">
          <div className="p-8">
            {/* Top Bar */}
            <div className="flex justify-end mb-6">
              <Link to="/dashboard">
                <button className="p-2 hover:bg-slate-800/50 rounded-full transition-colors">
                <X className="w-5 h-5 text-gray-400" />
              </button>
              </Link>
            </div>

            {/* Category Tag */}
            <div className="mb-6">
              <span className="px-4 py-1.5 bg-blue-500/20 text-blue-400 rounded-full text-sm">
                Company Information
              </span>
            </div>

            {/* Input Area */}
            <div className="relative">
              <textarea
                rows="6"
                className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg 
                         focus:outline-none focus:ring-2 focus:ring-blue-500/50 
                         placeholder-gray-500 text-white resize-none pr-12"
                placeholder="Tell us about your company..."
                value={companyDetails}
                onChange={(e) => setCompanyDetails(e.target.value)}
              />
              <button
                className="absolute right-4 bottom-4 p-2 bg-blue-500 hover:bg-blue-600 
                         rounded-lg transition-colors flex items-center justify-center"
                onClick={handleSubmit}
              >
                <Send className="w-4 h-4" />
              </button>
              <button
                className="absolute right-14 bottom-4 p-2 bg-green-500 hover:bg-green-600 
                         rounded-lg transition-colors flex items-center justify-center"
                onClick={handleGenerateWithAI}
                disabled={isGenerating}
              >
                <Sparkles className="w-4 h-4" />
              </button>
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

export default CompanyDetailsInput;