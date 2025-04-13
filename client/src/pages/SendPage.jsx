
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Layout from '../components/Layout';
import WalletCard from '../components/WalletCard';
import { useAuth } from '../context/AuthContext';
import { formatAmount } from '../lib/utils';
import { sendETH, getWalletBalance } from '../services/api';
import { useToast } from '../hooks/use-toast';
import { SendHorizonal, AlertCircle, CheckCircle2, Loader2 } from 'lucide-react';

const SendPage = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [recipientAddress, setRecipientAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [txHash, setTxHash] = useState('');

  const { data: balanceData, isLoading: balanceLoading, refetch: refetchBalance } = useQuery({
    queryKey: ['walletBalance'],
    queryFn: getWalletBalance,
  });

  const validateInputs = () => {
    setError('');
    if (!recipientAddress) {
      setError('Recipient address is required');
      return false;
    }
    
    if (!recipientAddress.startsWith('0x') || recipientAddress.length !== 42) {
      setError('Invalid Ethereum address format');
      return false;
    }
    
    if (!amount || isNaN(amount) || parseFloat(amount) <= 0) {
      setError('Please enter a valid amount');
      return false;
    }
    
    const balance = balanceData?.data?.balance || 0;
    if (parseFloat(amount) > parseFloat(balance)) {
      setError(`Insufficient funds. Your balance is ${balance} ETH`);
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateInputs()) return;
    
    setIsLoading(true);
    setError('');
    setTxHash('');
    
    try {
      const response = await sendETH({
        recipientAddress,
        amountInEther: amount
      });
      
      setTxHash(response.data.txHash);
      toast({
        title: "Transaction sent",
        description: "Your transaction has been submitted to the network",
      });
      
      // Reset form
      setRecipientAddress('');
      setAmount('');
      
      // Refetch balance after transaction
      setTimeout(() => {
        refetchBalance();
      }, 5000); // Give some time for transaction to be processed
      
    } catch (err) {
      console.error('Transaction error:', err);
      setError(err.response?.data?.message || 'Failed to send transaction. Please try again.');
      toast({
        variant: "destructive",
        title: "Transaction failed",
        description: err.response?.data?.message || 'Failed to send transaction',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Send ETH</h1>
        
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div>
            <WalletCard 
              address={user?.walletAddress} 
              balance={balanceLoading ? "Loading..." : formatAmount(balanceData?.data?.balance)}
            />
            
            <div className="bg-white rounded-xl shadow-md p-6 mt-6">
              <h2 className="text-lg font-semibold mb-4">Transaction Tips</h2>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <AlertCircle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                  <span>Double-check the recipient address before sending.</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertCircle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                  <span>Transactions cannot be reversed once confirmed.</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertCircle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                  <span>Leave enough ETH for transaction fees.</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-6">
            {txHash ? (
              <div className="text-center py-8">
                <div className="bg-green-100 text-green-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="h-8 w-8" />
                </div>
                <h2 className="text-xl font-semibold mb-2">Transaction Sent!</h2>
                <p className="text-gray-600 mb-4">Your transaction has been submitted to the network.</p>
                <div className="bg-gray-50 p-4 rounded-lg mb-4">
                  <p className="text-sm text-gray-600 mb-1">Transaction Hash:</p>
                  <p className="font-mono text-sm break-all">{txHash}</p>
                </div>
                <div className="flex justify-center space-x-3">
                  <a 
                    href={`https://sepolia.etherscan.io/tx/${txHash}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    View on Etherscan
                  </a>
                  <button 
                    onClick={() => setTxHash('')}
                    className="text-gray-600 hover:underline"
                  >
                    Send Another
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <h2 className="text-xl font-semibold mb-4">Send Transaction</h2>
                
                <div className="mb-4">
                  <label htmlFor="recipient" className="block text-sm font-medium text-gray-700 mb-1">
                    Recipient Address
                  </label>
                  <input
                    id="recipient"
                    type="text"
                    value={recipientAddress}
                    onChange={(e) => setRecipientAddress(e.target.value)}
                    placeholder="0x..."
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                    disabled={isLoading}
                  />
                </div>
                
                <div className="mb-6">
                  <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
                    Amount (ETH)
                  </label>
                  <div className="relative">
                    <input
                      id="amount"
                      type="text"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="0.0"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                      disabled={isLoading}
                    />
                    {balanceData?.data?.balance && (
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-primary"
                        onClick={() => setAmount(balanceData.data.balance)}
                      >
                        MAX
                      </button>
                    )}
                  </div>
                  {balanceData?.data?.balance && (
                    <p className="text-xs text-gray-500 mt-1">
                      Available: {formatAmount(balanceData.data.balance)} ETH
                    </p>
                  )}
                </div>
                
                {error && (
                  <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg flex items-center gap-2">
                    <AlertCircle className="h-5 w-5 flex-shrink-0" />
                    <p className="text-sm">{error}</p>
                  </div>
                )}
                
                <button
                  type="submit"
                  className="w-full bg-primary text-white font-medium py-3 px-4 rounded-lg hover:bg-primary/90 focus:ring-4 focus:ring-primary/50 transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
                  disabled={isLoading || balanceLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <SendHorizonal className="h-5 w-5" />
                      Send ETH
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SendPage;
