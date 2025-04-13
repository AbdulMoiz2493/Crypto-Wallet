import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Layout from '../components/Layout';
import WalletCard from '../components/WalletCard';
import { useAuth } from '../context/AuthContext';
import { formatDate, formatAmount } from '../lib/utils';
import { ArrowUpRight, ArrowDownLeft, Clock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getWalletBalance, getTransactionHistory } from '../services/api';

const DashboardPage = () => {
  const { user } = useAuth();
  const [recentTransactions, setRecentTransactions] = useState([]);

  const { data: balanceData, isLoading: balanceLoading } = useQuery({
    queryKey: ['walletBalance'],
    queryFn: getWalletBalance,
  });

  const { data: transactionsData, isLoading: transactionsLoading } = useQuery({
    queryKey: ['transactionHistory'],
    queryFn: getTransactionHistory,
  });

  useEffect(() => {
    if (transactionsData?.data && Array.isArray(transactionsData.data)) {
      // Sort transactions by timestamp (newest first) and take only the 5 most recent
      const sorted = [...transactionsData.data].sort(
        (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
      ).slice(0, 5);
      
      setRecentTransactions(sorted);
    }
  }, [transactionsData]);

  return (
    <Layout>
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
        
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="md:col-span-2">
            <WalletCard 
              address={user?.walletAddress} 
              balance={balanceLoading ? "Loading..." : formatAmount(balanceData?.data?.balance)}
            />
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-6 flex flex-col justify-between">
            <div>
              <h3 className="font-medium mb-2">Quick Actions</h3>
              <div className="grid grid-cols-2 gap-3">
                <Link 
                  to="/send" 
                  className="bg-primary/10 text-primary hover:bg-primary/20 p-4 rounded-lg flex flex-col items-center text-center transition-colors"
                >
                  <ArrowUpRight className="h-6 w-6 mb-2" />
                  <span>Send ETH</span>
                </Link>
                <a 
                  href={`https://sepoliafaucet.com/`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-secondary/10 text-secondary hover:bg-secondary/20 p-4 rounded-lg flex flex-col items-center text-center transition-colors"
                >
                  <ArrowDownLeft className="h-6 w-6 mb-2" />
                  <span>Get Test ETH</span>
                </a>
              </div>
            </div>
            <div className="mt-4">
              <h3 className="font-medium mb-2">Network</h3>
              <div className="flex items-center gap-2 bg-gray-100 p-3 rounded-lg">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-black dark:text-black">Sepolia Testnet</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Recent Transactions</h2>
            <Link to="/transactions" className="text-primary text-sm hover:underline flex items-center gap-1">
              View All <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          
          {transactionsLoading ? (
            <div className="py-8 text-center text-gray-500">
              <Clock className="h-8 w-8 mx-auto mb-2 animate-pulse" />
              <p>Loading transactions...</p>
            </div>
          ) : recentTransactions.length > 0 ? (
            <div className="divide-y divide-gray-100">
              {recentTransactions.map((tx) => (
                <div key={tx.txHash} className="py-4 flex items-center">
                  <div className="bg-primary/10 text-primary p-2 rounded-full mr-4">
                    <ArrowUpRight className="h-5 w-5" />
                  </div>
                  <div className="flex-grow">
                    <p className="font-medium">Sent ETH</p>
                    <div className="flex items-center text-sm text-gray-500">
                      <span>To: {tx.recipientAddress.slice(0, 8)}...{tx.recipientAddress.slice(-6)}</span>
                      <span className="mx-2">•</span>
                      <span>{formatDate(tx.timestamp)}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">-{tx.amount} ETH</p>
                    <a 
                      href={`https://sepolia.etherscan.io/tx/${tx.txHash}`} 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-primary hover:underline"
                    >
                      View
                    </a>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-8 text-center text-gray-500">
              <p>No transactions yet</p>
              <Link to="/send" className="text-primary hover:underline mt-2 inline-block">
                Send your first transaction
              </Link>
            </div>
          )}
        </div>
        
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Market Information</h2>
          <p className="text-gray-500 mb-4">
            Follow the latest market trends and analysis for Ethereum and related assets.
          </p>
          <div className="bg-gray-100 rounded-lg p-4 text-center">
            <p className="text-sm text-gray-500">
              Market data integration coming soon. Stay tuned for price charts and analysis tools.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DashboardPage;