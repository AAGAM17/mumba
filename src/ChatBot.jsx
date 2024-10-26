import { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Send, 
  Bot, 
  Loader2, 
  Plus, 
  MessageSquare,
  AlertCircle,
  Paperclip
} from "lucide-react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Tooltip, TooltipProvider } from "@/components/ui/tooltip";

const MessageBubble = ({ message, formatTime }) => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    setIsVisible(true);
  }, []);

  const getMessageStyle = () => {
    if (message.error) {
      return "bg-red-900/80 text-gray-100";
    }
    return message.sender === "user"
      ? "bg-gradient-to-r from-indigo-900 to-purple-900 text-gray-100"
      : "bg-gray-900/80 text-gray-100";
  };

  return (
    <div
      className={`flex ${
        message.sender === "user" ? "justify-end" : "justify-start"
      } transform transition-all duration-300 ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
      }`}
    >
      <div className="flex gap-3 max-w-[80%]">
        {message.sender === "bot" && (
          <Avatar className="h-8 w-8">
            <AvatarFallback className="bg-indigo-900">
              <Bot className="h-4 w-4" />
            </AvatarFallback>
          </Avatar>
        )}
        <div>
          <div className={`rounded-lg p-4 backdrop-blur-sm ${getMessageStyle()}`}>
            <div className="whitespace-pre-wrap">
              {message.error && (
                <div className="flex items-center gap-2 mb-2">
                  <AlertCircle className="h-4 w-4 text-red-200" />
                  <span className="font-medium">Error</span>
                </div>
              )}
              {message.content && (
                <div className="markdown-content">
                  {message.content.split('\n').map((line, index) => (
                    <p key={index}>{line}</p>
                  ))}
                </div>
              )}
            </div>
          </div>
          <span className="text-xs text-gray-400 block mt-1">
            {formatTime(message.timestamp)}
          </span>
        </div>
        {message.sender === "user" && (
          <Avatar className="h-8 w-8">
            <AvatarFallback className="bg-purple-900">U</AvatarFallback>
          </Avatar>
        )}
      </div>
    </div>
  );
};

export default function ChatInterface() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      content: "Hello! I'm your AI marketing specialist. How can I help you with your marketing strategies today?",
      sender: "bot",
      timestamp: new Date(),
    }
  ]);
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [lastError, setLastError] = useState(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async (text) => {
    setIsTyping(true);
    console.log("Sending to Gemini API:", text);
    try {
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
        responseMimeType: "text/markdown",
      };

      const chatSession = model.startChat({
        generationConfig,
        history: [
          {
            role: "user",
            parts: [
              {text: "you are a marketing specialist. You know what content drives product reach, how to attract more customers. You can create and give crazy marketing ideas and answer only queries related to marketing. If anything else is asked apart from this, answer it sarcastically relating to marketing taunts"},
            ],
          },
          {
            role: "model",
            parts: [
              {text: "Alright, I'm ready to dive into the world of marketing with you! What brilliant or crazy ideas shall we cook up today?"},
            ],
          },
        ],
      });

      const result = await chatSession.sendMessage(text);
      console.log("Gemini API response:", result.response.text());
      setLastError(null);
      return { response: result.response.text() };
    } catch (error) {
      console.error('Error:', error);
      setLastError(error.message);
      return { error: 'Failed to get response from the Gemini API' };
    } finally {
      setIsTyping(false);
    }
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    console.log("Sending message:", newMessage);
  
    const userMessage = {
      id: messages.length + 1,
      content: newMessage.trim(),
      sender: "user",
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setNewMessage("");
  
    const response = await sendMessage(newMessage);
    console.log("Received response:", response);
  
    if (response.response) {
      const botMessage = {
        id: messages.length + 2,
        content: response.response,
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botMessage]);
    } else if (response.error) {
      const errorMessage = {
        id: messages.length + 2,
        content: "I apologize, but I couldn't process your message. Please try again later.",
        sender: "bot",
        timestamp: new Date(),
        error: true
      };
      setMessages(prev => [...prev, errorMessage]);
    }
  };
  
  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <TooltipProvider>
      <div className="flex h-screen bg-gradient-to-br from-gray-950 via-purple-950 to-gray-950">
        <div className="absolute inset-0 bg-[url('/api/placeholder/1920/1080')] opacity-5 mix-blend-overlay animate-pulse"></div>
        
        {/* Sidebar */}
        <div className="bg-gray-950/90 backdrop-blur-xl w-80 flex flex-col border-r border-gray-800">
          <div className="p-4 border-b border-gray-800">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-xl font-bold text-gray-100">Marketing AI Chat</h1>
            </div>
            <Button className="w-full justify-start gap-2 bg-gray-800 hover:bg-gray-700 text-gray-100 border-0">
              <Plus className="h-4 w-4" /> New Chat
            </Button>
          </div>
          
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-2">
              <h2 className="text-sm font-semibold text-gray-400 mb-2">Recent Chats</h2>
              {[1, 2, 3].map((chat) => (
                <Button
                  key={chat}
                  variant="ghost"
                  className="w-full justify-start gap-2 h-auto py-3 text-gray-300 hover:bg-gray-800"
                >
                  <MessageSquare className="h-4 w-4" />
                  <div className="flex flex-col items-start text-sm">
                    <span>Marketing Strategy {chat}</span>
                    <span className="text-xs text-gray-500">Last idea...</span>
                  </div>
                </Button>
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col">
          {/* Chat Header */}
          <div className="bg-gray-950/90 backdrop-blur-xl border-b border-gray-800 p-4">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarFallback className="bg-indigo-900">
                  <Bot className="h-5 w-5" />
                </AvatarFallback>
              </Avatar>
              <div>
                <h2 className="font-semibold text-gray-100">Marketing AI Assistant</h2>
                <p className="text-sm text-gray-400">
                  {isTyping ? "Brainstorming..." : "Ready for your next big idea!"}
                </p>
              </div>
            </div>
          </div>

          {/* Messages Area */}
          <ScrollArea className="flex-1 p-4 bg-gray-950/50">
            <div className="max-w-3xl mx-auto space-y-4">
              {lastError && (
                <Alert variant="destructive" className="mb-4">
                  <AlertDescription className="flex items-center gap-2">
                    <AlertCircle className="h-4 w-4" />
                    API Error: {lastError}
                  </AlertDescription>
                </Alert>
              )}
              {messages.map((message) => (
                <MessageBubble 
                  key={message.id} 
                  message={message} 
                  formatTime={formatTime}
                />
              ))}
              {isTyping && (
                <div className="flex items-center gap-2 text-gray-400">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  AI is crafting a marketing masterpiece...
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>

          {/* Input Area */}
          <div className="p-4 border-t border-gray-800 bg-gray-950/90 backdrop-blur-xl">
            <form onSubmit={handleSend} className="max-w-3xl mx-auto">
              <div className="flex gap-2 items-center">
                <div className="flex-1 relative">
                  <Input
                    placeholder="Share your marketing challenge..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="w-full bg-gray-900/80 border-gray-800 text-gray-100 placeholder:text-gray-500 focus-visible:ring-indigo-500 pr-10"
                  />
                  <Tooltip content="Coming soon">
                    <Button
                      type="button"
                      size="icon"
                      variant="ghost"
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
                    >
                      <Paperclip className="h-4 w-4" />
                    </Button>
                  </Tooltip>
                </div>
                <Button 
                  type="submit" 
                  size="icon"
                  disabled={!newMessage.trim() || isTyping}
                  className="bg-gradient-to-r from-indigo-900 to-purple-900 hover:from-indigo-800 hover:to-purple-800 text-gray-100"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}