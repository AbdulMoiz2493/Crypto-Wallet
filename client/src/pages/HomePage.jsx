
import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { useAuth } from '../context/AuthContext';
import { ArrowRight, Shield, Wallet, BarChart3, Clock } from 'lucide-react';

const HomePage = () => {
  // Add a default value to prevent null errors
  const { isAuthenticated = false } = useAuth() || {};

  const features = [
    {
      icon: <Wallet className="h-8 w-8 text-primary" />,
      title: "Secure Wallet",
      description: "Your private keys are encrypted and never leave your device, giving you full control over your assets."
    },
    {
      icon: <BarChart3 className="h-8 w-8 text-secondary" />,
      title: "Real-time Updates",
      description: "Track your portfolio with up-to-date market data and transaction history."
    },
    {
      icon: <Shield className="h-8 w-8 text-primary" />,
      title: "Enhanced Security",
      description: "Multiple security layers to protect your funds and personal information."
    },
    {
      icon: <Clock className="h-8 w-8 text-secondary" />,
      title: "Fast Transactions",
      description: "Send and receive Ethereum quickly with minimal transaction fees."
    }
  ];

  return (
    <Layout>
      <div className="max-w-5xl mx-auto">
        {/* Hero Section */}
        <div className="py-16 md:py-24 px-4">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent leading-tight">
              The Secure Way to Manage Your Ethereum
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
              Send, receive, and manage your Ethereum with a simple, secure, and elegant wallet solution.
            </p>
            
            {isAuthenticated ? (
              <Link to="/dashboard" className="bg-primary hover:bg-primary/90 text-white font-medium py-3 px-8 rounded-lg inline-flex items-center gap-2 transition-all transform hover:translate-y-[-2px] shadow-md hover:shadow-lg">
                Go to Dashboard
                <ArrowRight className="h-4 w-4" />
              </Link>
            ) : (
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/register" className="bg-primary hover:bg-primary/90 text-white font-medium py-3 px-8 rounded-lg inline-flex items-center gap-2 transition-all transform hover:translate-y-[-2px] shadow-md hover:shadow-lg">
                  Create Wallet
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link to="/login" className="bg-white border border-primary text-primary hover:bg-gray-50 font-medium py-3 px-8 rounded-lg inline-flex items-center gap-2 transition-colors">
                  Sign In
                </Link>
              </div>
            )}
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-8 border border-gray-100 transition-all hover:shadow-xl hover:translate-y-[-4px]">
                <div className="h-14 w-14 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h2 className="text-xl font-semibold mb-3">{feature.title}</h2>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>

          
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
