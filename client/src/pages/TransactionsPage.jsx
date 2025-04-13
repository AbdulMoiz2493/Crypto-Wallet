import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Layout from '../components/Layout';
import TransactionItem from '../components/TransactionItem';
import { getTransactionHistory } from '../services/api';
import { Loader2, Search, Filter, Clock, Info } from 'lucide-react';

const TransactionsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('newest');

  const { data, isLoading, isError } = useQuery({
    queryKey: ['transactionHistory'],
    queryFn: getTransactionHistory,
  });

  // Ensure transactions is always an array
  const transactions = data?.data || [];

  // Only process transactions if we have an array
  const filteredTransactions = Array.isArray(transactions) 
    ? transactions.filter(tx => 
        tx.recipientAddress.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tx.txHash.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  // Only sort if we have filtered transactions as an array
  const sortedTransactions = Array.isArray(filteredTransactions) 
    ? [...filteredTransactions].sort((a, b) => {
        const dateA = new Date(a.timestamp);
        const dateB = new Date(b.timestamp);
        return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
      })
    : [];

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === 'newest' ? 'oldest' : 'newest');
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Transaction History</h1>
        
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <Loader2 className="h-12 w-12 text-primary animate-spin mb-4" />
            <p className="text-gray-600">Loading transaction history...</p>
          </div>
        ) : isError ? (
          <div className="bg-red-50 text-red-600 p-6 rounded-lg flex items-center justify-center">
            <Info className="h-6 w-6 mr-2" />
            <p>Error loading transaction history. Please try again later.</p>
          </div>
        ) : (
          <>
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search by address or hash..."
                  value={searchTerm}
                  onChange={handleSearch}
                  className="pl-10 p-3 w-full border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                />
              </div>
              <button
                onClick={toggleSortOrder}
                className="flex items-center gap-2 p-3 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                <Filter className="h-5 w-5 text-gray-500" />
                <span>{sortOrder === 'newest' ? 'Newest First' : 'Oldest First'}</span>
              </button>
            </div>
            
            {sortedTransactions.length > 0 ? (
              <div className="space-y-4 mb-8">
                {sortedTransactions.map((transaction) => (
                  <TransactionItem key={transaction.txHash} transaction={transaction} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-md p-12 text-center">
                <Clock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-medium mb-2">No Transactions Found</h3>
                <p className="text-gray-600 mb-6">
                  {searchTerm
                    ? "No transactions match your search criteria."
                    : "Your transaction history will appear here once you start sending ETH."}
                </p>
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="text-primary hover:underline"
                  >
                    Clear search and show all transactions
                  </button>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </Layout>
  );
};

export default TransactionsPage;