import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "@/components/ui/navigation-menu";
import { ChevronRight } from "lucide-react";
import { Link, useNavigate } from 'react-router-dom';
import { SignInButton, useUser } from "@clerk/clerk-react";

// Animated Lines Component
const MovingLines = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute w-full h-full">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute h-[2px] w-[100vw] bg-gradient-to-r from-transparent via-purple-500/20 to-transparent"
            style={{
              top: `${20 * i}%`,
              animation: `moveLines ${15 + i * 2}s linear infinite`,
              transform: `rotate(${i % 2 ? '-' : ''}5deg)`,
            }}
          />
        ))}
      </div>
    </div>
  );
};

// Floating Particles Component
const FloatingParticles = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute w-2 h-2 rounded-full bg-purple-500/20"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animation: `float ${10 + Math.random() * 10}s linear infinite`,
          }}
        />
      ))}
    </div>
  );
};

const ScrollingBanner = () => {
  const technologies = [
    { name: 'Empower', color: 'text-cyan-400' },
    { name: 'Creators', color: 'text-white' },
    { name: 'Elevate', color: 'text-green-500' },
    { name: 'Vibes.', color: 'text-orange-500' }
  ];

  const duplicatedTech = [...technologies, ...technologies];

  return (
    <div className="w-full overflow-hidden py-6 bg-transparent">
      <div className="relative flex">
        <div className="flex animate-marquee whitespace-nowrap">
          {duplicatedTech.map((tech, index) => (
            <div key={index} className="flex items-center mx-8">
              <span className={`text-3xl font-bold ${tech.color} hover:scale-110 transition-transform duration-300`}>
                {tech.name}
              </span>
              <span className="text-gray-600 text-3xl mx-4">•</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const AnimatedText = ({ text, delay = 0, className = "", wordDelay = 100 }) => {
  const [displayedText, setDisplayedText] = useState([]);
  const words = text.split(" ");

  useEffect(() => {
    words.forEach((word, index) => {
      setTimeout(() => {
        setDisplayedText(prev => [...prev, word]);
      }, delay + (index * wordDelay));
    });
  }, [text, delay, wordDelay]);

  return (
    <span className={className}>
      {words.map((word, index) => (
        <span
          key={index}
          className={`inline-block transition-all duration-500 ${
            displayedText.includes(word)
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-4"
          }`}
        >
          {word}{" "}
        </span>
      ))}
    </span>
  );
};

// Add this to your existing CSS or create a new style tag
const styles = `
  @keyframes moveLines {
    0% { transform: translateX(-100%) rotate(var(--rotation, 5deg)); }
    100% { transform: translateX(100%) rotate(var(--rotation, 5deg)); }
  }

  @keyframes float {
    0%, 100% { transform: translate(0, 0); }
    25% { transform: translate(50px, 50px); }
    50% { transform: translate(0, 100px); }
    75% { transform: translate(-50px, 50px); }
  }

  @keyframes pulse {
    0%, 100% { transform: scale(1); opacity: 0.5; }
    50% { transform: scale(1.1); opacity: 0.8; }
  }

  .animate-pulse-slow {
    animation: pulse 4s ease-in-out infinite;
  }
`;

export default function LandingPage() {
  const [mounted, setMounted] = useState(false);
  const { isSignedIn, user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isSignedIn) {
      navigate('/domainselector');
    }
  }, [isSignedIn, navigate]);

  const handleGetStarted = () => {
    if (isSignedIn) {
      navigate('/domainselector');
    }
    // If not signed in, the SignInButton will handle the sign-in process
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-[#0B012A]">
      {/* Inject styles */}
      <style>{styles}</style>

      {/* Rich Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#2A0F61]/50 via-[#120B3C] to-[#0B012A]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(66,27,142,0.1),transparent_70%)]" />
      
      {/* Moving Lines */}
      <MovingLines />

      {/* Floating Particles */}
      <FloatingParticles />

      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-1/4 w-[500px] h-[500px] bg-[#421B8E]/20 rounded-full filter blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[#1B328E]/20 rounded-full filter blur-3xl animate-pulse-slow delay-1000" />
      </div>

      {/* Interactive Grid Overlay */}
      <div 
        className="absolute inset-0 bg-[linear-gradient(rgba(66,27,142,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(66,27,142,0.05)_1px,transparent_1px)] bg-[size:100px_100px]"
        style={{
          backgroundPosition: '50% 50%',
          transition: 'all 0.3s ease-out',
        }}
      />

      {/* Main Content */}
      <div className="relative z-10">
        {/* Navigation */}
        <nav className="px-4 py-6 backdrop-blur-sm border-b border-[#421B8E]/10">
          <NavigationMenu className="mx-auto max-w-6xl">
            <NavigationMenuList className="flex gap-8 text-[#B8A8E3]">
              {['About', 'Contact'].map((item, index) => (
                <NavigationMenuItem key={item}>
                  <NavigationMenuLink 
                    className={`hover:text-white transition-all duration-300 hover:scale-110 ${
                      mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                    }`}
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    {item}
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
          {/* Sign In Button */}
          <div className="absolute top-6 right-4">
            <SignInButton mode="modal">
              <Button
                variant="outline"
                className="bg-[#421B8E]/10 border-[#421B8E] text-[#8B6EDD] hover:bg-[#421B8E] hover:text-white transition-all duration-500"
              >
                Sign In
              </Button>
            </SignInButton>
          </div>
        </nav>

        {/* Hero Section */}
        <main className="max-w-6xl mx-auto px-4 mt-24 flex flex-col items-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
            <div className="text-white [text-shadow:_0_4px_24px_rgba(66,27,142,0.4)] overflow-hidden hover:scale-105 transition-transform duration-500">
              <AnimatedText 
                text="AuraReach"
                delay={800}
                wordDelay={150}
              />
            </div>
          </h1>

          <p className="text-[#B8A8E3] text-xl mb-12 overflow-hidden">
            <AnimatedText 
              text="Empowering Creators. Elevating Brands. Syncing Vibes."
              delay={1600}
              wordDelay={100}
            />
          </p>

          {/* Technology Banners Section */}
          <div className="w-full space-y-8 mb-16">
            <ScrollingBanner />
            <ScrollingBanner />
          </div>

          {/* Enhanced CTA Button */}
          {isSignedIn ? (
            <Button 
              variant="outline" 
              className={`group bg-[#421B8E]/10 border-[#421B8E] text-[#8B6EDD] hover:bg-[#421B8E] hover:text-white transition-all duration-500 shadow-lg hover:shadow-[#421B8E]/50 hover:scale-105 ${
                mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
              style={{ transitionDelay: '2000ms' }}
              onClick={handleGetStarted}
            >
              Let's Start
              <ChevronRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          ) : (
            <SignInButton mode="modal" 
              appearance={{
                baseTheme: [
                  {
                    variables: {
                      colorBackground: '#0B012A',
                      colorText: '#B8A8E3',
                      colorPrimary: '#421B8E',
                      colorTextOnPrimaryBackground: '#FFFFFF',
                      colorTextSecondary: '#8B6EDD',
                      colorInputBackground: '#120B3C',
                      colorInputText: '#B8A8E3',
                      colorInputBorder: '#421B8E',
                    },
                  },
                ],
                elements: {
                  rootBox: "bg-[#0B012A] text-[#B8A8E3]",
                  card: "bg-[#120B3C] border border-[#421B8E] shadow-lg",
                  headerTitle: "text-[#8B6EDD] text-2xl",
                  headerSubtitle: "text-[#B8A8E3]",
                  formButtonPrimary: "bg-[#421B8E] text-white hover:bg-[#5D4DE3] transition-all duration-300",
                  formFieldInput: "bg-[#0B012A] border-[#421B8E] text-[#B8A8E3]",
                  formFieldLabel: "text-[#8B6EDD]",
                  footerActionLink: "text-[#8B6EDD] hover:text-white",
                  identityPreviewText: "text-[#B8A8E3]",
                  identityPreviewEditButton: "text-[#8B6EDD] hover:text-white",
                }
              }}
            >
              <Button 
                variant="outline" 
                className={`group bg-[#421B8E]/10 border-[#421B8E] text-[#8B6EDD] hover:bg-[#421B8E] hover:text-white transition-all duration-500 shadow-lg hover:shadow-[#421B8E]/50 hover:scale-105 ${
                  mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
                style={{ transitionDelay: '2000ms' }}
              >
                Let's Start
                <ChevronRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </SignInButton>
          )}
        </main>

        {/* Interactive Decorative Elements */}
        <div className="absolute top-1/3 right-1/4 w-4 h-4 rounded-full bg-[#8B6EDD]/20 backdrop-blur-sm border border-[#8B6EDD]/40 hover:scale-150 transition-transform duration-500" />
        <div className="absolute bottom-1/3 left-1/4 w-6 h-6 rounded-full bg-[#5D4DE3]/20 backdrop-blur-sm border border-[#5D4DE3]/40 hover:scale-150 transition-transform duration-500" />
      </div>
    </div>
  );
}
