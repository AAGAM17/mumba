import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Bot, BarChart2, CreditCard, Search, Globe, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { UserButton } from "@clerk/clerk-react";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-white text-center">
            Dashboard Solutions
          </h2>
          <UserButton />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Analytics Card */}
          <Link to="/analytics">
            <Card className="group relative overflow-hidden bg-gradient-to-br from-blue-500 to-blue-600 border-0 transition-transform duration-300 hover:scale-105 hover:-rotate-2">
              <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/30"></div>
              <CardContent className="relative p-8 h-[400px] flex flex-col items-center justify-center text-white">
                <div className="mb-6 p-4 bg-white/10 rounded-full">
                  <BarChart2 className="h-12 w-12" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Advanced Analytics</h3>
                <p className="text-center text-white/80">
                  Powerful data visualization and insights to drive your business decisions
                </p>
                <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/20 to-transparent"></div>
              </CardContent>
            </Card>
          </Link>

          {/* Chatbot Card */}
          <Link to="/bot">
            <Card className="group relative overflow-hidden bg-gradient-to-br from-purple-500 to-purple-600 border-0 transition-transform duration-300 hover:scale-105">
              <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/30"></div>
              <CardContent className="relative p-8 h-[400px] flex flex-col items-center justify-center text-white">
                <div className="mb-6 p-4 bg-white/10 rounded-full">
                  <Bot className="h-12 w-12" />
                </div>
                <h3 className="text-2xl font-bold mb-4">AI Chatbot</h3>
                <p className="text-center text-white/80">
                  Intelligent customer support automation powered by advanced AI
                </p>
                <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/20 to-transparent"></div>
              </CardContent>
            </Card>
          </Link>

          {/* Subscription Card */}
          <Link to="/managesubs"> 
            <Card className="group relative overflow-hidden bg-gradient-to-br from-emerald-500 to-emerald-600 border-0 transition-transform duration-300 hover:scale-105 hover:rotate-2">
              <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/30"></div>
              <CardContent className="relative p-8 h-[400px] flex flex-col items-center justify-center text-white">
                <div className="mb-6 p-4 bg-white/10 rounded-full">
                  <CreditCard className="h-12 w-12" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Subscription Manager</h3>
                <p className="text-center text-white/80">
                  Streamlined subscription handling and revenue management
                </p>
                <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/20 to-transparent"></div>
              </CardContent>
            </Card>
          </Link>

          {/* Business Input Card */}
          <Link to="/details">
            <Card className="group relative overflow-hidden bg-gradient-to-br from-yellow-500 to-yellow-600 border-0 transition-transform duration-300 hover:scale-105">
              <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/30"></div>
              <CardContent className="relative p-8 h-[400px] flex flex-col items-center justify-center text-white">
                <div className="mb-6 p-4 bg-white/10 rounded-full">
                  <Search className="h-12 w-12" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Business Input</h3>
                <p className="text-center text-white/80">
                  Efficiently gather and manage business data for analysis
                </p>
                <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/20 to-transparent"></div>
              </CardContent>
            </Card>
          </Link>

          {/* Domain Search Card */}
          <Link to="/domainselector">
            <Card className="group relative overflow-hidden bg-gradient-to-br from-red-500 to-red-600 border-0 transition-transform duration-300 hover:scale-105">
              <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/30"></div>
              <CardContent className="relative p-8 h-[400px] flex flex-col items-center justify-center text-white">
                <div className="mb-6 p-4 bg-white/10 rounded-full">
                  <Globe className="h-12 w-12" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Domain Search</h3>
                <p className="text-center text-white/80">
                  Explore available domains and secure your online presence
                </p>
                <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/20 to-transparent"></div>
              </CardContent>
            </Card>
          </Link>

          {/* Coming Soon Card */}
          <Card className="group relative overflow-hidden bg-gradient-to-br from-gray-600 to-gray-700 border-0 transition-transform duration-300 hover:scale-105">
            <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/30"></div>
            <CardContent className="relative p-8 h-[400px] flex flex-col items-center justify-center text-white">
              <div className="mb-6 p-4 bg-white/10 rounded-full">
                <Clock className="h-12 w-12" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Coming Soon</h3>
              <p className="text-center text-white/80">
                Stay tuned for our upcoming features and updates!
              </p>
              <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/20 to-transparent"></div>
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;