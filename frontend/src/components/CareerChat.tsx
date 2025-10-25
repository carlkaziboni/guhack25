import { useState } from 'react';
import { motion } from 'framer-motion';

interface CareerChatProps {
  doorType: string;
  onBack: () => void;
}

const careerInfo: Record<string, { title: string; description: string; tips: string[] }> = {
  internship: {
    title: 'Internship Path',
    description: 'Gain hands-on experience in your field of interest while still in school or early in your career.',
    tips: [
      'Start early - many internships are available to sophomores and juniors',
      'Network with professionals in your desired field',
      'Treat your internship as a long interview - give it your all',
      'Document your achievements and learnings',
      'Ask for mentorship and feedback regularly',
    ],
  },
  upskill: {
    title: 'Upskilling Path',
    description: 'Enhance your existing skills or learn new ones to stay competitive in the job market.',
    tips: [
      'Identify skills gaps in your current role or desired position',
      'Take online courses on platforms like Coursera, Udemy, or LinkedIn Learning',
      'Practice through personal projects and open-source contributions',
      'Earn industry-recognized certifications',
      'Join communities and attend workshops to learn from peers',
    ],
  },
  graduate: {
    title: 'Graduate Job Path',
    description: 'Secure a full-time position after completing your degree, launching your professional career.',
    tips: [
      'Build a strong portfolio showcasing your best work',
      'Optimize your resume and LinkedIn profile',
      'Practice behavioral and technical interview questions',
      'Leverage your university career services and alumni network',
      'Apply early and follow up on applications professionally',
    ],
  },
};

export default function CareerChat({ doorType, onBack }: CareerChatProps) {
  const [messages, setMessages] = useState<{ text: string; sender: 'user' | 'bot' }[]>([
    { text: `Welcome to the ${careerInfo[doorType].title}!`, sender: 'bot' },
    { text: careerInfo[doorType].description, sender: 'bot' },
    { text: 'Here are some tips to help you succeed:', sender: 'bot' },
  ]);
  const [inputValue, setInputValue] = useState('');

  const handleSend = () => {
    if (inputValue.trim()) {
      // Add user message
      setMessages((prev) => [...prev, { text: inputValue, sender: 'user' }]);
      
      // Simulate bot response
      setTimeout(() => {
        const botResponse = generateBotResponse(inputValue, doorType);
        setMessages((prev) => [...prev, { text: botResponse, sender: 'bot' }]);
      }, 500);
      
      setInputValue('');
    }
  };

  const generateBotResponse = (userInput: string, type: string): string => {
    const input = userInput.toLowerCase();
    
    if (input.includes('how') || input.includes('start') || input.includes('begin')) {
      return `To start with ${careerInfo[type].title}, I recommend focusing on the tips I shared earlier. Would you like more specific guidance on any of them?`;
    } else if (input.includes('skill') || input.includes('learn')) {
      return 'Great question! The most important skills vary by industry, but communication, problem-solving, and adaptability are universally valuable. What field are you interested in?';
    } else if (input.includes('time') || input.includes('long')) {
      return 'The timeline varies for everyone. Internships typically last 3-6 months, upskilling can take weeks to months depending on the skill, and job searches often take 2-4 months. Stay persistent!';
    } else {
      return "That's a great point! I'm here to help guide you through this career path. Feel free to ask me anything specific about your journey.";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-purple-400">
            {careerInfo[doorType].title}
          </h1>
          <button
            onClick={onBack}
            className="px-6 py-2 bg-gray-800 hover:bg-gray-700 text-yellow-400 rounded-lg transition-colors duration-300 border border-yellow-400/30"
          >
            ← Back to Hallway
          </button>
        </div>

        {/* Tips Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 mb-6 border border-purple-500/30"
        >
          <h2 className="text-xl font-semibold text-yellow-400 mb-4">Key Tips for Success</h2>
          <ul className="space-y-2">
            {careerInfo[doorType].tips.map((tip, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="flex items-start text-gray-300"
              >
                <span className="text-purple-400 mr-2">•</span>
                {tip}
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Chat Interface */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-gray-800/50 backdrop-blur-sm rounded-lg border border-purple-500/30 overflow-hidden"
        >
          {/* Messages */}
          <div className="h-96 overflow-y-auto p-6 space-y-4">
            {messages.map((message, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-md px-4 py-2 rounded-lg ${
                    message.sender === 'user'
                      ? 'bg-yellow-400 text-gray-900'
                      : 'bg-purple-600 text-white'
                  }`}
                >
                  {message.text}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Input */}
          <div className="border-t border-gray-700 p-4">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask me anything about this career path..."
                className="flex-1 px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <button
                onClick={handleSend}
                className="px-6 py-2 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold rounded-lg transition-colors duration-300"
              >
                Send
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
