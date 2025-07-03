
import React, { useState } from 'react';
import { 
  Brain,  Moon,  Sun,  BookOpen,  Mic,  BarChart3,  Music,  Shield,  Heart, Sparkles, Users, Gift, ChevronRight
} from 'lucide-react';
import SubmitReview from "../components/SubmitReview";
import DisplayReviews from '../components/DisplayReviews';

import { useTheme } from '../context/ThemeContext';
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Home = () => {
const { isDark: darkMode, toggleTheme: toggleDarkMode } = useTheme();

  //  const darkMode = useThemeStore(state => state.darkMode);
  // const toggleDarkMode = useThemeStore(state => state.toggleDarkMode);
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();

  const handleClick = () => {
    if (isLoggedIn) {
      navigate("/journal");
    } else {
      navigate("/login");
    }}

  const features = [
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: "Smart Journaling",
      description: "AI-powered journal analysis with emotion insights, self-care suggestions, and daily affirmations",
      color: "from-blue-500 to-purple-600"
    },
    {
      icon: <Mic className="w-8 h-8" />,
      title: "Voice Capabilities",
      description: "Speech-to-text journaling, AI voice responses, and conversational emotional support",
      color: "from-purple-500 to-pink-600"
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Mood Analytics",
      description: "Track emotional patterns with beautiful charts and receive personalized weekly insights",
      color: "from-pink-500 to-rose-600"
    },
    {
      icon: <Music className="w-8 h-8" />,
      title: "Mood Playlists",
      description: "Curated music recommendations that match your current emotional state and preferences",
      color: "from-rose-500 to-orange-600"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Private & Secure",
      description: "Your mental health data stays private with secure OTP authentication and encryption",
      color: "from-green-500 to-teal-600"
    },
    {
      icon: <Gift className="w-8 h-8" />,
      title: "100% Free",
      description: "No subscriptions, no locked features. Complete access to all mental wellness tools",
      color: "from-teal-500 to-blue-600"
    }
  ];

  return (
    <div className={`min-h-screen  mt-10 transition-all duration-500 ${
      darkMode 
        ? 'bg-gradient-to-br from-gray-900 via-purple-900 to-gray-800 text-white' 
        : 'bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 text-gray-900'
    }`}>


      {/* Hero Section */}
      <section className="relative px-6 py-20">
        <div className="max-w-6xl mx-auto text-center">
          {/* Floating Elements */}
          <div className="absolute top-10 left-10 w-20 h-20 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-20 animate-pulse"></div>
          <div className="absolute top-32 right-20 w-16 h-16 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-20 animate-pulse delay-1000"></div>
          <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-gradient-to-r from-pink-400 to-rose-400 rounded-full opacity-20 animate-pulse delay-2000"></div>
          
          <div className="relative z-10">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 mb-8 backdrop-blur-sm">
              <Sparkles className="w-4 h-4 mr-2 text-purple-600" />
              <span className="text-sm font-medium">AI-Powered Mental Wellness Platform</span>
            </div>
            
            <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight">
              Welcome to{' '}
              <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
                MindSpace
              </span>
              <Heart className="inline-block w-16 h-16 ml-4 text-pink-500 animate-pulse" />
            </h1>
            
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-80 leading-relaxed">
              Your private sanctuary for emotional intelligence, AI-powered journaling, 
              and personalized mental wellness support — completely free for everyone.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button  onClick={handleClick}
               className="group px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-full font-semibold text-lg shadow-2xl hover:shadow-purple-500/25 transform hover:scale-105 transition-all duration-300"
                >
                Start Your Journey
                <ChevronRight className="inline-block w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
              
            
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Powerful Features for{' '}
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Mental Wellness
              </span>
            </h2>
            <p className="text-xl opacity-80 max-w-2xl mx-auto">
              Discover how MindSpace combines AI intelligence with compassionate design 
              to support your emotional journey.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`group relative p-8 rounded-3xl transition-all duration-500 hover:scale-105 cursor-pointer ${
                  darkMode 
                    ? 'bg-gray-800/50 hover:bg-gray-800/70 backdrop-blur-sm border border-gray-700/50' 
                    : 'bg-white/70 hover:bg-white/90 backdrop-blur-sm shadow-xl hover:shadow-2xl border border-white/20'
                }`}
                style={{
                  animationDelay: `${index * 100}ms`
                }}
              >
                {/* Glow Effect */}
                <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${feature.color} opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-xl`}></div>
                
                {/* Content */}
                <div className="relative z-10">
                  <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${feature.color} text-white mb-6 shadow-lg`}>
                    {feature.icon}
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                  <p className="opacity-80 leading-relaxed">{feature.description}</p>
                  
                  <div className="mt-6 flex items-center text-purple-600 group-hover:text-pink-600 transition-colors">
                    <span className="font-semibold">Explore Feature</span>
                    <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <div className={`relative rounded-3xl p-12 text-center ${
            darkMode 
              ? 'bg-gradient-to-r from-purple-900/50 to-pink-900/50 border border-purple-500/20' 
              : 'bg-gradient-to-r from-purple-100 to-pink-100 border border-purple-200/50'
          } backdrop-blur-sm`}>
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <Users className="w-8 h-8 text-white" />
              </div>
            </div>
            
            <h3 className="text-3xl font-bold mb-8 pt-4">
              Join People on Their Wellness Journey
            </h3>
             <div className='flex flex-wrap justify-center'>
              <SubmitReview />
              <DisplayReviews />
             
            </div>
               
           
            
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`px-6 py-12 border-t ${
        darkMode ? 'border-gray-800' : 'border-gray-200'
      }`}>
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <Brain className="w-6 h-6 text-purple-600" />
            <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              MindSpace
            </span>
          </div>
          <p className="opacity-60 mb-4">
            Supporting mental wellness through AI-powered insights and compassionate design.
          </p>
          <p className="text-sm opacity-40">
            © 2025 MindSpace. Made with ❤️ for mental health awareness.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;