
import React from 'react';
import Layout from '../components/Layout';
import { Book, Shield, Wallet, Send, History, Link as LinkIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

const TutorialsPage = () => {
  const tutorials = [
    {
      id: 1,
      title: 'Getting Started with CryptoWallet',
      description: 'Learn the basics of setting up your wallet and managing your crypto assets.',
      icon: <Book className="h-6 w-6 text-primary" />,
      category: 'Beginner',
      timeToRead: '5 min'
    },
    {
      id: 2,
      title: 'Securing Your Wallet',
      description: 'Essential security practices to keep your crypto assets safe.',
      icon: <Shield className="h-6 w-6 text-primary" />,
      category: 'Security',
      timeToRead: '8 min'
    },
    {
      id: 3,
      title: 'Managing Multiple Wallets',
      description: 'How to create and manage multiple wallets for different purposes.',
      icon: <Wallet className="h-6 w-6 text-primary" />,
      category: 'Intermediate',
      timeToRead: '7 min'
    },
    {
      id: 4,
      title: 'Sending Your First Transaction',
      description: 'Step-by-step guide to sending cryptocurrency to another wallet.',
      icon: <Send className="h-6 w-6 text-primary" />,
      category: 'Beginner',
      timeToRead: '6 min'
    },
    {
      id: 5,
      title: 'Understanding Transaction History',
      description: 'How to read and interpret your transaction history.',
      icon: <History className="h-6 w-6 text-primary" />,
      category: 'Intermediate',
      timeToRead: '10 min'
    },
    {
      id: 6,
      title: 'Connecting to DApps',
      description: 'Learn how to connect your wallet to decentralized applications.',
      icon: <LinkIcon className="h-6 w-6 text-primary" />,
      category: 'Advanced',
      timeToRead: '12 min'
    }
  ];

  const categories = ['All', 'Beginner', 'Intermediate', 'Advanced', 'Security'];

  return (
    <Layout>
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Tutorials</h1>
          
          <div className="flex space-x-2 overflow-x-auto pb-2">
            {categories.map((category, index) => (
              <button
                key={index}
                className={`px-4 py-2 text-sm font-medium rounded-full whitespace-nowrap ${
                  index === 0
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-2xl font-semibold mb-4">Featured Tutorial</h2>
          <div className="bg-gray-50 rounded-lg p-6 border border-gray-100">
            <span className="inline-block bg-primary/10 text-primary text-sm font-medium px-3 py-1 rounded-full mb-4">
              Beginner Friendly
            </span>
            <h3 className="text-xl font-semibold mb-2">Complete Guide to Cryptocurrency Wallets</h3>
            <p className="text-gray-700 mb-4">
              Everything you need to know about cryptocurrency wallets, from types of wallets to security best practices.
              This comprehensive guide will help you understand how to manage your digital assets effectively.
            </p>
            <div className="flex justify-between items-center">
              <span className="text-gray-500 text-sm">15 min read</span>
              <Link 
                to="/tutorials/complete-guide" 
                className="inline-flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
              >
                Read Now
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </svg>
              </Link>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {tutorials.map((tutorial) => (
            <div key={tutorial.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  {tutorial.icon}
                  <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                    {tutorial.category}
                  </span>
                </div>
                <h3 className="text-lg font-semibold mb-2">{tutorial.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{tutorial.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500">{tutorial.timeToRead} read</span>
                  <Link 
                    to={`/tutorials/${tutorial.id}`} 
                    className="text-primary hover:text-primary/80 text-sm font-medium"
                  >
                    Read More →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="bg-primary/10 rounded-lg p-6 flex flex-col md:flex-row items-center justify-between">
          <div className="mb-4 md:mb-0 md:mr-6">
            <h3 className="text-xl font-semibold mb-2">Can't find what you're looking for?</h3>
            <p className="text-gray-700">Our support team is always ready to help with any questions you might have.</p>
          </div>
          <Link 
            to="/contact" 
            className="shrink-0 bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors"
          >
            Contact Support
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default TutorialsPage;
