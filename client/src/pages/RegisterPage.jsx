
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { CreditCard, AlertCircle, Loader2, UserPlus, ShieldCheck } from 'lucide-react';
import Layout from '../components/Layout';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const validateInputs = () => {
    if (!name || !email || !password || !confirmPassword) {
      setError('Please fill in all fields');
      return false;
    }
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    
    if (password.length < 8) {
      setError('Password must be at least 8 characters long');
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateInputs()) return;
    
    setIsLoading(true);
    setError('');
    
    try {
      await register(name, email, password);
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <div className="flex flex-col bg-gray-50 dark:bg-gray-900 mt-0">
        <div className="flex-1 flex flex-col md:flex-row">
          <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-primary to-secondary items-center justify-center text-white p-12">
            <div className="max-w-md">
              <div className="flex items-center gap-2 mb-8">
                <CreditCard className="h-10 w-10" />
                <h1 className="text-3xl font-bold">CryptoWallet</h1>
              </div>
              
              <h2 className="text-3xl font-bold mb-6">Welcome to CryptoWallet</h2>
              <p className="text-lg mb-6">
                Create your account to start sending, receiving, and managing your Ethereum securely.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <div className="bg-white/20 p-2 rounded-full mt-1">
                    <ShieldCheck className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Secure Storage</h3>
                    <p className="text-white/80 text-sm">Your private keys are securely encrypted and never shared.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="bg-white/20 p-2 rounded-full mt-1">
                    <ShieldCheck className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Full Control</h3>
                    <p className="text-white/80 text-sm">You have complete control over your funds at all times.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="bg-white/20 p-2 rounded-full mt-1">
                    <ShieldCheck className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Easy Transactions</h3>
                    <p className="text-white/80 text-sm">Send and receive ETH with just a few clicks.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="w-full md:w-1/2 flex items-center justify-center p-6 md:p-12">
            <div className="w-full max-w-md">
              <div className="text-center mb-8">
                <div className="md:hidden flex items-center justify-center gap-2 mb-6">
                  <CreditCard className="h-8 w-8 text-primary" />
                  <h1 className="text-2xl font-bold text-primary">CryptoWallet</h1>
                </div>
                <h2 className="text-2xl font-bold dark:text-white">Create Your Account</h2>
                <p className="text-gray-600 dark:text-gray-400 mt-2">Sign up to get started with your new wallet</p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 md:p-8">
                {error && (
                  <div className="mb-6 flex items-center gap-2 p-4 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-300 rounded-lg">
                    <AlertCircle className="h-5 w-5 flex-shrink-0" />
                    <p>{error}</p>
                  </div>
                )}
                
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Full Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="John Doe"
                      className="w-full p-3 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:ring-primary focus:border-primary"
                      disabled={isLoading}
                    />
                  </div>
                  
                  <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Email Address
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="w-full p-3 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:ring-primary focus:border-primary"
                      disabled={isLoading}
                    />
                  </div>
                  
                  <div className="mb-4">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Password
                    </label>
                    <input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full p-3 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:ring-primary focus:border-primary"
                      disabled={isLoading}
                    />
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      Must be at least 8 characters long
                    </p>
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Confirm Password
                    </label>
                    <input
                      id="confirmPassword"
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full p-3 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:ring-primary focus:border-primary"
                      disabled={isLoading}
                    />
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full bg-primary text-white font-medium py-3 px-4 rounded-lg hover:bg-primary/90 focus:ring-4 focus:ring-primary/50 transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin" />
                        Creating account...
                      </>
                    ) : (
                      <>
                        <UserPlus className="h-5 w-5" />
                        Create Account
                      </>
                    )}
                  </button>
                  
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-4 text-center">
                    By creating an account, you agree to our Terms of Service and Privacy Policy
                  </p>
                </form>
              </div>
              
              <div className="text-center mt-6">
                <p className="text-gray-600 dark:text-gray-400">
                  Already have an account?{' '}
                  <Link to="/login" className="text-primary hover:underline font-medium">
                    Log in
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default RegisterPage;
