
import React from 'react';
import Layout from '../components/Layout';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Code, FileText, Shield } from 'lucide-react';

const DocsPage = () => {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 dark:text-white">Documentation</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border-l-4 border-primary transition-colors duration-300">
            <BookOpen className="h-8 w-8 text-primary mb-4" />
            <h2 className="text-xl font-semibold mb-2 dark:text-white">Getting Started</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              New to CryptoWallet? Learn the basics of setting up your wallet, securing your account, and making your first transaction.
            </p>
            <Link to="/tutorials" className="text-primary hover:text-primary/80 inline-flex items-center gap-1">
              Read the guide <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border-l-4 border-secondary transition-colors duration-300">
            <Shield className="h-8 w-8 text-secondary mb-4" />
            <h2 className="text-xl font-semibold mb-2 dark:text-white">Security Best Practices</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Keeping your crypto assets secure is our top priority. Learn about two-factor authentication, secure passwords, and more.
            </p>
            <Link to="/docs/security" className="text-secondary hover:text-secondary/80 inline-flex items-center gap-1">
              Learn more <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8 transition-colors duration-300">
          <h2 className="text-2xl font-semibold mb-4 dark:text-white">Core Concepts</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-2 dark:text-white">Wallet Management</h3>
              <p className="text-gray-700 dark:text-gray-300">
                Your CryptoWallet allows you to store, send, and receive Ethereum and other compatible tokens. Learn how to manage your wallet effectively.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-2 dark:text-white">Transactions</h3>
              <p className="text-gray-700 dark:text-gray-300">
                Understanding gas fees, confirmation times, and transaction history is essential for a smooth experience on the Ethereum network.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-2 dark:text-white">Account Security</h3>
              <p className="text-gray-700 dark:text-gray-300">
                Protect your assets with secure authentication methods, regular security audits, and by following our recommended security practices.
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-colors duration-300">
          <h2 className="text-2xl font-semibold mb-4 dark:text-white">Additional Resources</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link to="/tutorials" className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition flex flex-col items-center text-center">
              <FileText className="h-6 w-6 text-primary mb-2" />
              <h3 className="font-medium dark:text-white">Tutorials</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Step-by-step guides for common tasks</p>
            </Link>
            
            <Link to="/api" className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition flex flex-col items-center text-center">
              <Code className="h-6 w-6 text-primary mb-2" />
              <h3 className="font-medium dark:text-white">API Documentation</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Integrate with our platform</p>
            </Link>
            
            <Link to="/contact" className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition flex flex-col items-center text-center">
              <FileText className="h-6 w-6 text-primary mb-2" />
              <h3 className="font-medium dark:text-white">Contact Support</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Get help from our team</p>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DocsPage;
