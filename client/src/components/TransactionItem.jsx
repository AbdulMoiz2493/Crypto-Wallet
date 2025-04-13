
import React from 'react';
import { formatDate } from '../lib/utils';
import { ArrowUpRight, ExternalLink } from 'lucide-react';

const TransactionItem = ({ transaction }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 hover:shadow-md transition-shadow">
      <div className="flex items-center gap-4">
        <div className="bg-primary/10 text-primary p-2.5 rounded-full">
          <ArrowUpRight className="h-5 w-5" />
        </div>
        
        <div className="flex-grow">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-medium">Sent ETH</h3>
              <p className="text-sm text-gray-500">
                To: {transaction.recipientAddress.substring(0, 10)}...{transaction.recipientAddress.substring(transaction.recipientAddress.length - 8)}
              </p>
            </div>
            <p className="font-semibold">-{transaction.amount} ETH</p>
          </div>
          
          <div className="flex justify-between items-center mt-2 pt-2 border-t border-gray-100">
            <span className="text-xs text-gray-500">{formatDate(transaction.timestamp)}</span>
            <a 
              href={`https://sepolia.etherscan.io/tx/${transaction.txHash}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary text-xs flex items-center gap-1 hover:underline"
            >
              View on Etherscan
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionItem;
