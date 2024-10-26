import React, { useState, useEffect } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Sparkles, Youtube, Instagram, Facebook, Video, Send, Loader, Download, MessageSquare } from 'lucide-react';
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Link } from 'react-router-dom';

const DomainSelector = () => {
  const [selectedDomain, setSelectedDomain] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [generatedOutput, setGeneratedOutput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const domains = [
    { value: 'youtube', label: 'YouTube', icon: Youtube, color: 'text-red-500', bgColor: 'bg-red-500/10' },
    { value: 'instagram', label: 'Instagram', icon: Instagram, color: 'text-pink-500', bgColor: 'bg-pink-500/10' },
    { value: 'facebook', label: 'Facebook', icon: Facebook, color: 'text-blue-500', bgColor: 'bg-blue-500/10' },
    { value: 'tiktok', label: 'TikTok', icon: Video, color: 'text-white', bgColor: 'bg-white/10' },
  ];

  const selectedDomainInfo = domains.find(d => d.value === selectedDomain);

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
    responseMimeType: "text/plain",
  };

  const generateContent = async () => {
    setIsLoading(true);
    try {
      const chatSession = model.startChat({
        generationConfig,
        history: [
          {
            role: "user",
            parts: [{ text: `Provide a detailed analysis of the top 5 Indian YouTube content creators in the ${inputValue} and ${selectedDomain} niche, presented in tabular form. The table should include the following columns:

1. Creator Name
2. Current Reach All Over Internet: Analyze their current followers (subscribers), average video views, engagement rates, view-to-subscriber ratios, and reach across platforms like Instagram, Facebook, and Twitter.
3. Content Style: Discuss the primary content focus, video style and presentation, average video length, and upload frequency.
4. Target Audience: Provide insights into audience demographics and the range of content types they cover.
5. USP & Brand Positioning: Identify what differentiates each creator, highlight their brand strengths, and mention significant collaborations or challenges overcome.
6. Audience Interaction and Engagement Strategy: Describe how they engage with their audience, incorporate feedback, and use stories/shorts or live streaming.
7. Growth Timeline and Quick Success Indicators: Detail their initial growth timeline, short-term successes, and early challenges faced along with strategies to overcome them.

Present the information in a well-formatted table.` }],
          },
        ],
      });

      const result = await chatSession.sendMessage(inputValue);
      setGeneratedOutput(result.response.text());
    } catch (error) {
      console.error("Error generating content:", error);
      setGeneratedOutput("An error occurred while generating content.");
    } finally {
      setIsLoading(false);
    }
  };

  const downloadCSV = () => {
    if (!generatedOutput) {
      console.error("No data to download");
      return;
    }

    try {
      // Parse the markdown table
      const rows = generatedOutput.split('\n').filter(row => row.trim().startsWith('|'));
      const headers = rows[0].split('|').filter(cell => cell.trim()).map(cell => cell.trim());
      const data = rows.slice(2).map(row => row.split('|').filter(cell => cell.trim()).map(cell => cell.trim()));

      let csvContent = "data:text/csv;charset=utf-8,";
      csvContent += headers.join(',') + "\n";
      data.forEach(row => {
        csvContent += row.map(cell => `"${cell.replace(/"/g, '""')}"`).join(',') + "\n";
      });

      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", "content_creators_data.csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading CSV:", error);
      alert("Error downloading CSV. Please check the console for details.");
    }
  };

  const downloadJSON = () => {
    if (!generatedOutput) {
      console.error("No data to download");
      return;
    }

    try {
      // Parse the markdown table
      const rows = generatedOutput.split('\n').filter(row => row.trim().startsWith('|'));
      const headers = rows[0].split('|').filter(cell => cell.trim()).map(cell => cell.trim());
      const data = rows.slice(2).map(row => {
        const cells = row.split('|').filter(cell => cell.trim()).map(cell => cell.trim());
        return headers.reduce((obj, header, index) => {
          obj[header] = cells[index];
          return obj;
        }, {});
      });

      const jsonData = JSON.stringify(data, null, 2);
      const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(jsonData);
      const exportFileName = 'content_creators_data.json';

      const linkElement = document.createElement('a');
      linkElement.setAttribute('href', dataUri);
      linkElement.setAttribute('download', exportFileName);
      document.body.appendChild(linkElement);
      linkElement.click();
      document.body.removeChild(linkElement);
    } catch (error) {
      console.error("Error downloading JSON:", error);
      alert("Error downloading JSON. Please check the console for details.");
    }
  };

  const redirectToChatbot = () => {
    // Assuming you have a chatbot page at /chatbot
    window.location.href = '/dashboard';
  };

  return (
    <div className="min-h-screen bg-[#060818] flex flex-col items-center justify-center p-8 relative overflow-hidden">
      {/* Background Grid Effect */}
      <div className="fixed inset-0 opacity-20">
        <div className="absolute inset-0" 
          style={{
            backgroundImage: `
              linear-gradient(to right, #193064 1px, transparent 1px),
              linear-gradient(to bottom, #193064 1px, transparent 1px)
            `,
            backgroundSize: '100px 100px'
          }} 
        />
      </div>
      
      {/* Animated Background Lines */}
      <div className="fixed inset-0">
        {[...Array(5)].map((_, i) => (
          <div
            key={`line-${i}`}
            className="glow-line"
            style={{
              top: `${20 * (i + 1)}%`,
              animationDelay: `${i * 0.5}s`
            }}
          />
        ))}
      </div>

      {/* Radial Gradient */}
      <div className="fixed inset-0">
        <div className="absolute inset-0" 
          style={{ 
            background: 'radial-gradient(circle at 50% 50%, rgba(59,130,246,0.2), transparent 70%)' 
          }} 
        />
      </div>

      {/* Title Section */}
      <div className="text-center mb-12 relative z-10">
        <h1 className="text-4xl font-light text-white mb-4 flex items-center justify-center gap-3">
          <Sparkles className="text-blue-400" />
          Select Your Platform
          <Sparkles className="text-blue-400" />
        </h1>
        <p className="text-gray-400">Choose your social platform and enter your details</p>
      </div>

      {/* Input Container */}
      <div className="relative z-10 w-full max-w-4xl">
        <div className="flex gap-4 p-1">
          {/* Domain Selector */}
          <div className="w-1/3">
            <Select value={selectedDomain} onValueChange={setSelectedDomain}>
              <SelectTrigger className="h-14 bg-white/10 border-0 backdrop-blur-md shadow-[0_0_15px_rgba(59,130,246,0.2)] 
                text-white hover:bg-white/20 transition-all duration-300">
                <SelectValue placeholder="Select Platform" />
              </SelectTrigger>
              <SelectContent className="bg-[#1a1f3d]/95 border-gray-800 backdrop-blur-md text-white">
                {domains.map((domain) => (
                  <SelectItem 
                    key={domain.value} 
                    value={domain.value}
                    className="hover:bg-white/10 transition-colors focus:bg-white/10"
                  >
                    <div className="flex items-center gap-2">
                      <domain.icon className={`${domain.color} h-6 w-6`} />
                      {domain.label}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* User Input with Icon and Post Button */}
          <div className="flex-1 relative group flex items-center">
            <Input
              placeholder={`Enter your niche`}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="w-full h-14 bg-white/5 border-0 backdrop-blur-xl text-white 
                placeholder:text-gray-400 shadow-[0_0_15px_rgba(59,130,246,0.2)]
                focus:ring-2 focus:ring-blue-500/40 hover:bg-white/10 transition-all duration-300
                pl-14 pr-4"
            />
            {selectedDomainInfo && (
              <div className={`absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full ${selectedDomainInfo.bgColor} 
                transition-all duration-300 group-hover:scale-110`}>
                <selectedDomainInfo.icon className={`${selectedDomainInfo.color} h-6 w-6`} />
              </div>
            )}

            {/* Generate Button */}
            <button
              onClick={generateContent}
              disabled={isLoading}
              className="ml-2 p-2 bg-transparent text-blue-500 border border-blue-500 rounded-full hover:bg-blue-500 hover:text-white transition duration-300 flex items-center justify-center"
            >
              {isLoading ? (
                <Loader className="h-6 w-6 animate-spin" />
              ) : (
                <Send className="h-6 w-6" />
              )}
            </button>

            {/* Glass Effect Overlay */}
            <div className="absolute inset-0 -z-10 rounded-lg overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-20" />
              <div className="absolute inset-0 backdrop-blur-sm" />
            </div>
          </div>
        </div>

        {/* Enhanced Glowing Border Effect */}
        <div className="absolute inset-0 -z-10 blur-2xl opacity-30">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/40 via-purple-500/40 to-pink-500/40 animate-pulse" />
        </div>
      </div>

      {/* Generated Output */}
      {(isLoading || generatedOutput) && (
        <div className="mt-8 p-4 bg-white/10 rounded-lg backdrop-blur-md text-white w-full overflow-auto">
          <h2 className="text-2xl font-semibold mb-4">Generated Content:</h2>
          {isLoading ? (
            <div className="flex items-center justify-center">
              <Loader className="h-8 w-8 animate-spin text-blue-500" />
              <span className="ml-2">Generating content...</span>
            </div>
          ) : (
            <>
              <ReactMarkdown 
                remarkPlugins={[remarkGfm]} 
                className="prose prose-invert max-w-none"
              >
                {generatedOutput}
              </ReactMarkdown>
              <div className="mt-4 flex justify-center space-x-4">
                <button
                  onClick={downloadCSV}
                  className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition duration-300 flex items-center"
                >
                  <Download className="mr-2 h-5 w-5" />
                  Download CSV
                </button>
                <button
                  onClick={downloadJSON}
                  className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition duration-300 flex items-center"
                >
                  <Download className="mr-2 h-5 w-5" />
                  Download JSON
                </button>
                <button
                  onClick={redirectToChatbot}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300 flex items-center"
                >
                  <MessageSquare className="mr-2 h-5 w-5" />
                  Go to Dashboard
                </button>
              </div>
            </>
          )}
        </div>
      )}

      {/* Back to Dashboard Button */}
      <div className="mt-8 relative z-10">
        <Link to="/dashboard">
          <button className="px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition duration-300">
            Back to Dashboard
          </button>
        </Link>
      </div>

      <style jsx global>{`
        @keyframes glowLine {
          0% {
            transform: translateX(-100%);
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: translateX(100%);
            opacity: 0;
          }
        }

        .glow-line {
          position: absolute;
          width: 100%;
          height: 1px;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(59, 130, 246, 0.5),
            transparent
          );
          animation: glowLine 3s infinite;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }

        .float {
          animation: float 6s ease-in-out infinite;
        }

        /* Additional styles for markdown content */
        .prose {
          color: #e2e8f0;
        }
        .prose h1, .prose h2, .prose h3, .prose h4, .prose h5, .prose h6 {
          color: #f8fafc;
        }
        .prose strong {
          color: #f8fafc;
        }
        .prose a {
          color: #60a5fa;
        }
        .prose code {
          color: #f8fafc;
          background-color: rgba(255, 255, 255, 0.1);
          padding: 2px 4px;
          border-radius: 4px;
        }
        .prose pre {
          background-color: rgba(255, 255, 255, 0.1);
          border-radius: 8px;
        }
        .prose blockquote {
          border-left-color: #60a5fa;
        }
        .prose table {
          border-collapse: collapse;
          width: 100%;
        }
        .prose th, .prose td {
          border: 1px solid rgba(255, 255, 255, 0.2);
          padding: 8px;
          text-align: left;
        }
        .prose th {
          background-color: rgba(255, 255, 255, 0.1);
        }
        .prose tr:nth-child(even) {
          background-color: rgba(255, 255, 255, 0.05);
        }
      `}</style>
    </div>
  );
};

export default DomainSelector;
