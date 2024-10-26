import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { MessageSquare, Calendar, Bookmark, Share2, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ServiceDashboard = () => {
  const [selectedCard, setSelectedCard] = useState(null);

  const cards = [
    {
      id: 1,
      title: "Social Impact",
      image: "/api/placeholder/400/320",
      author: "Alex Smith",
      category: "Environment"
    },
    {
      id: 2,
      title: "Community Build",
      image: "/api/placeholder/400/320",
      author: "Jamie Lee",
      category: "Social"
    },
    {
      id: 3,
      title: "Green Future",
      image: "/api/placeholder/400/320",
      author: "Chris Wong",
      category: "Sustainability"
    },
    {
      id: 4,
      title: "Urban Planning",
      image: "/api/placeholder/400/320",
      author: "Sarah Chen",
      category: "Development"
    },
    {
      id: 5,
      title: "Tech Innovation",
      image: "/api/placeholder/400/320",
      author: "Mike Johnson",
      category: "Technology"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 p-8">
      {/* Added Title Section */}
      <div className="container mx-auto mb-12 text-center">
        <h1 className="text-5xl font-bold text-white mb-4">Top Creators</h1>
        <div className="w-24 h-1 bg-blue-500 mx-auto rounded-full"></div>
      </div>

      <AnimatePresence>
        {!selectedCard ? (
          // 3D Card Gallery View
          <motion.div 
            className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-center justify-center min-h-[80vh]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {cards.map((card, index) => (
              <motion.div
                key={card.id}
                className={`${index === 1 ? 'md:col-span-1 md:col-start-2' : ''}`}
                initial={{ 
                  opacity: 0,
                  y: 50,
                  rotateY: -15,
                  perspective: 1000
                }}
                animate={{ 
                  opacity: 1,
                  y: 0,
                  rotateY: 0,
                  transition: { delay: index * 0.2 }
                }}
                whileHover={{ 
                  scale: 1.05,
                  rotateY: 5,
                  transition: { duration: 0.3 }
                }}
              >
                <Card
                  className="bg-slate-900/50 text-white overflow-hidden cursor-pointer transform transition-transform duration-500 hover:shadow-2xl hover:shadow-blue-500/20"
                  onClick={() => setSelectedCard(card)}
                >
                  <div className="relative">
                    <img 
                      src={card.image}
                      alt={card.title}
                      className="w-full h-64 object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                      <h3 className="text-xl font-bold">{card.title}</h3>
                      <p className="text-sm text-gray-300">{card.author}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          // Diamond Layout View
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="relative w-full max-w-4xl mx-auto"
          >
            {/* Close Button */}
            <button 
              onClick={() => setSelectedCard(null)}
              className="absolute right-4 top-4 z-50 bg-slate-800 p-2 rounded-full"
            >
              <X className="w-6 h-6 text-white" />
            </button>

            {/* Header Text */}
            <div className="text-center mb-16">
              <h1 className="text-4xl font-bold text-white mb-4">Services With Responsibility</h1>
              <p className="text-gray-300">
                Develop Socially Responsible Card Products, Collaborate With Social
                Brand Marketings And Non-Profits, And Measure Impact Programs.
              </p>
            </div>

            {/* Diamond Grid Layout */}
            <div className="grid grid-cols-3 gap-6">
              {/* Left Card */}
              <motion.div
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <Card className="bg-slate-900/50 text-white p-6 backdrop-blur-lg border-slate-800">
                  <h2 className="text-2xl mb-2">Social</h2>
                  <p className="text-sm text-gray-400">Services Division</p>
                </Card>
              </motion.div>

              {/* Center Column */}
              <div className="space-y-6">
                <motion.div
                  initial={{ y: -50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <Card className="bg-slate-900/50 text-white p-6 backdrop-blur-lg border-slate-800">
                    <div className="flex justify-between items-center">
                      <h3>Earn Up To</h3>
                      <span className="text-2xl font-bold">9.9K</span>
                    </div>
                  </Card>
                </motion.div>

                {/* Selected Card Display */}
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <Card className="bg-slate-900/50 text-white p-4 backdrop-blur-lg border-slate-800 relative overflow-hidden">
                    <div className="absolute inset-0 bg-blue-500/20 blur-3xl"></div>
                    <div className="relative">
                      <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-blue-500"></div>
                          <span>{selectedCard.author}</span>
                        </div>
                        <Bookmark className="w-5 h-5" />
                      </div>
                      <div className="h-64 rounded-lg bg-gradient-to-br from-purple-600 to-blue-500 mb-4">
                        <img 
                          src={selectedCard.image}
                          alt={selectedCard.title}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      </div>
                      <div className="flex justify-between">
                        <div className="flex gap-2">
                          <MessageSquare className="w-5 h-5" />
                          <Share2 className="w-5 h-5" />
                        </div>
                        <button className="text-white">♥</button>
                      </div>
                    </div>
                  </Card>
                </motion.div>

                <motion.div
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <Card className="bg-slate-900/50 text-white p-6 backdrop-blur-lg border-slate-800">
                    <h3 className="text-xl mb-2">Investment</h3>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-5 h-5" />
                      <span>Release Date</span>
                    </div>
                  </Card>
                </motion.div>
              </div>

              {/* Right Card */}
              <motion.div
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <Card className="bg-slate-900/50 text-white p-6 backdrop-blur-lg border-slate-800">
                  <h2 className="text-2xl mb-2">Credit</h2>
                  <p className="text-sm text-gray-400">Ambassador</p>
                </Card>
              </motion.div>
            </div>

            {/* Glowing Effect */}
            <div className="absolute inset-0 -z-10">
              <div className="absolute inset-0 bg-blue-500/20 blur-3xl"></div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ServiceDashboard;