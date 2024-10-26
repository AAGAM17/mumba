import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronRight, Code, Palette, LineChart } from "lucide-react";
import { useNavigate } from 'react-router-dom';

const PlanCard = ({ title, description, price, features, isSelected, onClick, icon: Icon }) => (
  <Card
    className={`relative h-[450px] p-6 transform transition-all duration-500 hover:translate-y-[-20px] hover:rotate-[2deg] 
      cursor-pointer border bg-gradient-to-b from-[#1a1a2f] to-[#15162c] hover:shadow-2xl 
      ${isSelected ? 'ring-2 ring-purple-500 translate-y-[-20px]' : 'hover:shadow-purple-500/20'}`}
    onClick={onClick}
    style={{
      transformStyle: 'preserve-3d',
      perspective: '1000px'
    }}
  >
    <div className="space-y-4">
      <div className="h-12 w-12 rounded-lg bg-purple-500/10 flex items-center justify-center">
        <Icon className="h-6 w-6 text-purple-500" />
      </div>
      <h3 className="text-2xl font-bold text-white">{title}</h3>
      <p className="text-gray-400 h-20">{description}</p>
      <div className="text-3xl font-bold text-white">
        {price === "Contact Sales" ? price : `$${price}`} 
        {price !== "Contact Sales" && <span className="text-lg font-normal text-gray-400">/mo</span>}
      </div>
      <ul className="space-y-3 pt-4">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center text-gray-300">
            <ChevronRight className="h-4 w-4 text-purple-500 mr-2" />
            {feature}
          </li>
        ))}
      </ul>
    </div>
  </Card>
);

const SuccessPage = ({ selectedPlan }) => (
  <div className="min-h-screen bg-[#0B012A] flex items-center justify-center p-4">
    <Card className="max-w-md p-8 text-center space-y-6 bg-gradient-to-b from-[#1a1a2f] to-[#15162c]">
      <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto">
        <svg
          className="w-8 h-8 text-green-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>
      <h2 className="text-2xl font-bold text-white">Thank you for your choice!</h2>
      <p className="text-gray-400">
        You have selected the <span className="text-purple-500 font-semibold">{selectedPlan}</span> plan.
        Our team will contact you shortly with the next steps.
      </p>
      
      <Button 
        className="w-full bg-purple-500 hover:bg-purple-600 text-white"
        onClick={() => window.location.href = '/'}
      >
        Back to Home
      </Button>
    </Card>
  </div>
);

export default function CardSelectionPage() {
  const [selectedCard, setSelectedCard] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const navigate = useNavigate();

  const plans = [
    {
      title: "Creators Hub",
      description: "Perfect for individuals and small projects",
      price: "0",
      icon: Palette,
      features: [
        "Up to 5 projects",
        "Basic analytics",
        "24/7 support",
      ]
    },
    {
      title: "Pro Plan",
      description: "Ideal for growing businesses and teams",
      price: "79",
      icon: Code,
      features: [
        "Unlimited projects",
        "Advanced analytics",
        "Priority support",
        "Custom integrations"
      ]
    },
    {
      title: "Brand Marketing",
      description: "For large organizations with complex needs",
      price: "Contact Sales",
      icon: LineChart,
      features: [
        "Custom solutions",
        "Dedicated support team",
        "SLA guaranteed",
        "API access"
      ]
    }
  ];

  const handleSubmit = () => {
    if (!selectedCard) {
      toast({
        title: "Please select a plan",
        description: "You need to choose a plan before proceeding.",
        variant: "destructive"
      });
      return;
    }

    const selectedPlan = plans[selectedCard].title;
    
    // Handle redirects based on plan selection
    switch (selectedPlan) {
      case "Creators Hub":
        navigate("/domainselector");
        break;
      case "Pro Plan":
        navigate("/domainselector");
        break;
      case "Brand Marketing":
        navigate("/details");
        break;
      default:
        toast({
          title: "Error",
          description: "Invalid plan selection.",
          variant: "destructive"
        });
    }
  };

  if (showSuccess) {
    return <SuccessPage selectedPlan={plans[selectedCard]?.title} />;
  }

  return (
    <div className="min-h-screen bg-[#0B012A] p-4 md:p-8">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-blue-900/20 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(66,27,142,0.1),transparent_70%)] pointer-events-none" />
      
      {/* Content */}
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white">
            Choose Your Plan
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Select the perfect plan for your needs. Each plan is designed to provide
            the best value for your investment.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <PlanCard
              key={index}
              {...plan}
              isSelected={selectedCard === index}
              onClick={() => setSelectedCard(index)}
            />
          ))}
        </div>

        {/* Submit Button */}
        <div className="flex justify-center pt-8">
          <Button
            className="bg-purple-500 hover:bg-purple-600 text-white px-8 py-6 text-lg rounded-xl
              transform transition-all duration-300 hover:translate-y-[-2px] hover:shadow-xl
              hover:shadow-purple-500/20"
            onClick={handleSubmit}
          >
            Confirm Selection
            <ChevronRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}