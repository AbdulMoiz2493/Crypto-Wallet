
import React from 'react';
import { formatAddress } from '../lib/utils';
import { Copy, ExternalLink } from 'lucide-react';
import { useToast } from '../hooks/use-toast';

const WalletCard = ({ address, balance = '0', className = '' }) => {
  const { toast } = useToast();

  const copyAddress = () => {
    navigator.clipboard.writeText(address);
    toast({
      title: "Address copied",
      description: "Wallet address copied to clipboard",
    });
  };

  const viewOnEtherscan = () => {
    window.open(`https://sepolia.etherscan.io/address/${address}`, '_blank');
  };

  return (
    <div className={`wallet-card p-6 rounded-xl ${className}`}>
      <div className="flex justify-between items-start mb-4">
        <div>
          <p className="text-white/70 text-sm mb-1">Your Wallet</p>
          <div className="flex items-center gap-2">
            <h3 className="font-mono text-white">{formatAddress(address)}</h3>
            <button
              onClick={copyAddress}
              className="text-white/70 hover:text-white transition-colors bg-white/10 p-1.5 rounded-md"
              aria-label="Copy address"
            >
              <Copy className="h-3.5 w-3.5" />
            </button>
            <button
              onClick={viewOnEtherscan}
              className="text-white/70 hover:text-white transition-colors bg-white/10 p-1.5 rounded-md"
              aria-label="View on Etherscan"
            >
              <ExternalLink className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>

      <div>
        <p className="text-white/70 text-sm mb-1">Balance</p>
        <h2 className="text-2xl font-bold text-white">
          {balance} <span className="text-lg">ETH</span>
        </h2>
      </div>
    </div>
  );
};

export default WalletCard;
