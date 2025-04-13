import React, { useState } from 'react';
import Layout from '../components/Layout';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { useToast } from '../hooks/use-toast';
import { formatAddress } from '../lib/utils';
import { User, Mail, Copy, Shield, Bell, Moon, LogOut, Sun } from 'lucide-react';
import { Switch } from '../components/ui/switch';

const SettingsPage = () => {
  const { user, logout } = useAuth() || {};
  const { theme, toggleTheme } = useTheme();
  const { toast } = useToast();
  const [notifications, setNotifications] = useState(true);

  const copyAddress = () => {
    if (user?.walletAddress) {
      navigator.clipboard.writeText(user.walletAddress);
      toast({
        title: "Wallet address copied",
        description: "Address has been copied to clipboard"
      });
    }
  };

  const toggleNotifications = () => {
    setNotifications(!notifications);
    toast({
      title: `Notifications ${!notifications ? 'enabled' : 'disabled'}`,
      description: `You will ${!notifications ? 'now' : 'no longer'} receive notifications`,
    });
  };

  const handleLogout = async () => {
    try {
      await logout();
      toast({
        title: "Logged out successfully",
        description: "You have been logged out of your account"
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Logout failed",
        description: "There was a problem logging out",
      });
    }
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Settings</h1>
        
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 sticky top-24 transition-colors duration-300">
              <div className="flex flex-col items-center mb-6 pb-6 border-b border-gray-100 dark:border-gray-700">
                <div className="h-20 w-20 bg-primary/10 dark:bg-primary/20 text-primary rounded-full flex items-center justify-center mb-4">
                  <User className="h-10 w-10" />
                </div>
                <h2 className="text-xl font-semibold dark:text-white">{user?.name || 'User'}</h2>
                <p className="text-gray-500 dark:text-gray-400">{user?.email || 'user@example.com'}</p>
              </div>
              
              <div className="space-y-1">
                <button className="w-full text-left px-4 py-2 rounded-lg bg-primary/10 dark:bg-primary/20 text-primary font-medium">
                  Account
                </button>
                <button className="w-full text-left px-4 py-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                  Security
                </button>
                <button className="w-full text-left px-4 py-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                  Preferences
                </button>
                <button className="w-full text-left px-4 py-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                  Integrations
                </button>
              </div>
            </div>
          </div>
          
          <div className="md:col-span-2 space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 transition-colors duration-300">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 dark:text-white">
                <User className="h-5 w-5 text-primary" />
                Account Information
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Name</label>
                  <input 
                    type="text" 
                    value={user?.name || ''} 
                    readOnly 
                    className="w-full p-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-200"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                    <Mail className="h-4 w-4 inline mr-1" />
                    Email Address
                  </label>
                  <input 
                    type="email" 
                    value={user?.email || ''} 
                    readOnly 
                    className="w-full p-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-200"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Wallet Address</label>
                  <div className="relative">
                    <input 
                      type="text" 
                      value={user?.walletAddress || ''} 
                      readOnly 
                      className="w-full p-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-200 font-mono pr-10"
                    />
                    <button
                      onClick={copyAddress}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-primary"
                      aria-label="Copy address"
                    >
                      <Copy className="h-5 w-5" />
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    This is your public wallet address. Share it with others to receive ETH.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 transition-colors duration-300">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 dark:text-white">
                <Shield className="h-5 w-5 text-primary" />
                Security
              </h2>
              
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Enhance your account security with these options
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div>
                    <h3 className="font-medium dark:text-white">Password Change</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Change your account password</p>
                  </div>
                  <button className="text-primary hover:underline">
                    Change
                  </button>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div>
                    <h3 className="font-medium dark:text-white">Two-Factor Authentication</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Add an extra layer of security</p>
                  </div>
                  <button className="text-primary hover:underline">
                    Setup
                  </button>
                </div>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 transition-colors duration-300">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 dark:text-white">
                <Bell className="h-5 w-5 text-primary" />
                Preferences
              </h2>
              
              <div className="space-y-6">
                {/* Prominent Notifications Toggle */}
                <div className="p-5 bg-gray-50 dark:bg-gray-700 rounded-xl border-2 border-gray-200 dark:border-gray-600">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Bell className="h-5 w-5 text-primary" />
                      <h3 className="font-medium text-lg dark:text-white">Notifications</h3>
                    </div>
                    <span className={`text-sm font-semibold ${notifications ? 'text-green-500' : 'text-gray-500'}`}>
                      {notifications ? 'ENABLED' : 'DISABLED'}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    Receive alerts for account activities and transactions
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500 dark:text-gray-400">Off</span>
                    <button 
                      onClick={toggleNotifications}
                      className={`relative inline-flex h-8 w-16 cursor-pointer rounded-full transition-colors duration-300 ease-in-out ${
                        notifications ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'
                      }`}
                    >
                      <span 
                        className={`inline-block h-7 w-7 transform rounded-full bg-white shadow-lg transition duration-300 ease-in-out ${
                          notifications ? 'translate-x-9' : 'translate-x-1'
                        }`}
                        style={{ margin: '2px' }}
                      />
                    </button>
                    <span className="text-gray-500 dark:text-gray-400">On</span>
                  </div>
                </div>
                
                {/* Prominent Dark Mode Toggle */}
                <div className="p-5 bg-gray-50 dark:bg-gray-700 rounded-xl border-2 border-gray-200 dark:border-gray-600">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      {theme === 'dark' ? (
                        <Moon className="h-5 w-5 text-blue-500" />
                      ) : (
                        <Sun className="h-5 w-5 text-yellow-500" />
                      )}
                      <h3 className="font-medium text-lg dark:text-white">Theme Mode</h3>
                    </div>
                    <span className={`text-sm font-semibold ${theme === 'dark' ? 'text-blue-500' : 'text-yellow-500'}`}>
                      {theme === 'dark' ? 'DARK MODE' : 'LIGHT MODE'}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    Choose between light and dark interface theme
                  </p>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-1">
                      <Sun className="h-5 w-5 text-yellow-500" />
                      <span className={`font-medium ${theme === 'light' ? 'text-yellow-500' : 'text-gray-400'}`}>Light</span>
                    </div>
                    <button 
                      onClick={toggleTheme}
                      className="relative inline-flex h-8 w-16 cursor-pointer rounded-full bg-gradient-to-r from-yellow-400 to-blue-500 transition-all duration-300 ease-in-out"
                    >
                      <span 
                        className={`inline-block h-7 w-7 transform rounded-full bg-white shadow-lg transition duration-300 ease-in-out ${
                          theme === 'dark' ? 'translate-x-9' : 'translate-x-1'
                        }`}
                        style={{ margin: '2px' }}
                      />
                    </button>
                    <div className="flex items-center gap-1">
                      <Moon className="h-5 w-5 text-blue-500" />
                      <span className={`font-medium ${theme === 'dark' ? 'text-blue-500' : 'text-gray-400'}`}>Dark</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 transition-colors duration-300">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 dark:text-white">
                <LogOut className="h-5 w-5 text-red-500" />
                Session
              </h2>
              
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Manage your current session
              </p>
              
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SettingsPage;