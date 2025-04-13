
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { CreditCard, AlertCircle, Loader2, LogIn } from 'lucide-react';
import Layout from '../components/Layout';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }
    
    setIsLoading(true);
    setError('');
    
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to login. Please check your credentials.');
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
              
              <h2 className="text-3xl font-bold mb-6">Welcome Back!</h2>
              <p className="text-lg mb-8">
                Log in to your account to access your wallet, send transactions, and manage your Ethereum.
              </p>
              
              <div className="bg-white/10 rounded-lg p-6 backdrop-blur-sm">
                <p className="font-medium mb-2">"One of the best crypto wallets I've used."</p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-white/20 rounded-full mr-3"></div>
                  <div>
                    <p className="font-semibold">Michael Chen</p>
                    <p className="text-sm text-white/70">DeFi Enthusiast</p>
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
                <h2 className="text-2xl font-bold dark:text-white">Log In to Your Account</h2>
                <p className="text-gray-600 dark:text-gray-400 mt-2">Enter your credentials to access your wallet</p>
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
                  
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-1">
                      <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Password
                      </label>
                      <Link to="/forgot-password" className="text-sm text-primary hover:underline">
                        Forgot Password?
                      </Link>
                    </div>
                    <input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
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
                        Logging in...
                      </>
                    ) : (
                      <>
                        <LogIn className="h-5 w-5" />
                        Login
                      </>
                    )}
                  </button>
                </form>
              </div>
              
              <div className="text-center mt-6">
                <p className="text-gray-600 dark:text-gray-400">
                  Don't have an account?{' '}
                  <Link to="/register" className="text-primary hover:underline font-medium">
                    Create one now
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

export default LoginPage;
