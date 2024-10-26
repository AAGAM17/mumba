import React, { useRef, useState } from "react";
import {
  ChevronRight,
  ChevronLeft,
  Bot,
  ChartCandlestick,
  Power,
  ChartNoAxesCombined,
  Settings,
  CreditCard,
  Search,
  Building2
} from "lucide-react";
import { Route, Routes, Link, useNavigate } from "react-router-dom";
import { ScrollArea } from "@/components/ui/scroll-area";
import Dashboard from "./Dashboard";
import ChatInterface from "./ChatBot";
import Chart from "./Chart"; // You'll need to create this component  // You'll need to create this component
import DomainSelector from "./Domain";
import CompanyDetailsInput from "./CompanyDetails";

function Navbar() {
  const navigate = useNavigate();
  const navRef = useRef(null);
  const navItems = [
    { label: "Home", path: "/", icon: ChartNoAxesCombined },
    { label: "Chatbot", path: "/bot", icon: Bot },
    { label: "Analytics", path: "/analytics", icon: ChartCandlestick },
    { label: "Subscription", path: "/managesubs", icon: CreditCard },
    { label: "Domain Search", path: "/domainselector", icon: Search },
    { label: "Business Input", path: "/details", icon: Building2 },
  ];

  const [isExpanded, setisExpanded] = useState(false);
  const [activeTab, setactiveTab] = useState(navItems[0].label);

  const handletogglebar = () => {
    setisExpanded(!isExpanded);
  };

  const handleLogout = () => {
    window.localStorage.removeItem("token");
    navigate('/');
    window.location.reload();
  };

  return (
    <div className="flex h-screen bg-gray-900">
      <div
        ref={navRef}
        className={`h-screen flex flex-col border-r border-gray-800 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 shadow-xl transition-all duration-300 ease-in-out fixed top-0 left-0 ${
          isExpanded ? "w-64" : "w-20"
        } z-20`}
      >
        {/* Toggle Button */}
        <button
          onClick={handletogglebar}
          className="absolute -right-3 top-20 transform bg-gray-800 rounded-full p-1 border border-gray-700 z-20 shadow-md hover:bg-gray-700 transition-colors duration-200"
        >
          {isExpanded ? (
            <ChevronLeft size={20} strokeWidth={1.5} className="text-gray-300" />
          ) : (
            <ChevronRight size={20} strokeWidth={1.5} className="text-gray-300" />
          )}
        </button>

        <div className="flex flex-col h-full">
          {/* Nav Items */}
          <nav className="flex flex-col items-center space-y-1 py-4">
            {navItems.map((item, index) => (
              <React.Fragment key={index}>
                {index === 3 || index === 6 || index === 9 ? (
                  <div
                    className={`my-2 h-px bg-gray-700 ${
                      isExpanded ? "w-52" : "w-10"
                    }`}
                  ></div>
                ) : null}
                <Link
                  to={item.path}
                  className={`relative flex items-center hover:bg-gray-800/50 transition-colors duration-200 rounded-md
                    ${isExpanded ? "w-52 justify-start px-4" : "w-14 justify-center"}
                    ${activeTab === item.label ? "text-blue-400 bg-gray-800/30" : "text-gray-400"}
                    py-3`}
                  onClick={() => setactiveTab(item.label)}
                >
                  <item.icon
                    size={20}
                    strokeWidth={1.5}
                    className={activeTab === item.label ? "text-blue-400" : "text-gray-400"}
                  />
                  {isExpanded && (
                    <span className="ml-4 text-sm font-medium whitespace-nowrap overflow-hidden">
                      {item.label}
                    </span>
                  )}
                </Link>
              </React.Fragment>
            ))}
          </nav>
        </div>
      </div>

      <ScrollArea
        className={`flex-1 overflow-y-hidden transition-all duration-300 ${
          isExpanded ? "ml-64" : "ml-20"
        }`}
      >
        <main>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/bot" element={<ChatInterface />} />
            <Route path="/analytics" element={<Chart />} />
            <Route path="/domainselector" element={<DomainSelector />} />
            <Route path="/details" element={<CompanyDetailsInput />} />
          </Routes>
        </main>
      </ScrollArea>
    </div>
  );
}

export default Navbar;