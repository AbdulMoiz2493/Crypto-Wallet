import React, { useState } from 'react';
import Layout from '../components/Layout';
import { Code, Copy, Check, GitBranch, Key, Lock } from 'lucide-react';

const ApiPage = () => {
  const [copied, setCopied] = useState(false);
  // Define a sample address to use in the API example
  const sampleAddress = '0x742d35Cc6634C0532925a3b844Bc454e4438f44e';

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const sampleCode = `// Initialize the CryptoWallet API client
const client = new CryptoWalletAPI({
  apiKey: 'YOUR_API_KEY',
  environment: 'testnet' // or 'mainnet' for production
});

// Get wallet balance
const balance = await client.getBalance('${sampleAddress}');
console.log(balance);

// Send a transaction
const transaction = await client.sendTransaction({
  from: '${sampleAddress}',
  to: '0x1234567890123456789012345678901234567890',
  amount: '0.1', // ETH
  gasLimit: '21000'
});

// Get transaction status
const status = await client.getTransactionStatus(transaction.hash);`;

  return (
    <Layout>
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 dark:text-white">API Documentation</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 flex flex-col items-center text-center">
            <div className="h-12 w-12 bg-primary/10 dark:bg-primary/20 rounded-full flex items-center justify-center mb-4">
              <Key className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold text-lg mb-2 dark:text-white">API Keys</h3>
            <p className="text-gray-700 dark:text-gray-300">
              Generate API keys to authenticate your requests to the CryptoWallet API.
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 flex flex-col items-center text-center">
            <div className="h-12 w-12 bg-primary/10 dark:bg-primary/20 rounded-full flex items-center justify-center mb-4">
              <Code className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold text-lg mb-2 dark:text-white">Documentation</h3>
            <p className="text-gray-700 dark:text-gray-300">
              Comprehensive guides and reference materials for integrating with our API.
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 flex flex-col items-center text-center">
            <div className="h-12 w-12 bg-primary/10 dark:bg-primary/20 rounded-full flex items-center justify-center mb-4">
              <GitBranch className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold text-lg mb-2 dark:text-white">SDK & Libraries</h3>
            <p className="text-gray-700 dark:text-gray-300">
              Client libraries for JavaScript, Python, and other popular languages.
            </p>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4 dark:text-white">Getting Started</h2>
          
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-2 dark:text-white">Step 1: Create an API Key</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              To use the CryptoWallet API, you'll need to generate an API key. API keys are available to registered users with verified accounts.
            </p>
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg border border-gray-200 dark:border-gray-600">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium dark:text-white">Your API Key</p>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">Use this key to authenticate requests</p>
                </div>
                <button 
                  className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
                  onClick={() => {}}
                >
                  Generate Key
                </button>
              </div>
            </div>
          </div>
          
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-2 dark:text-white">Step 2: Install the SDK</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              We recommend using our official SDK for the simplest integration experience.
            </p>
            <div className="bg-gray-900 text-gray-200 p-4 rounded-lg overflow-x-auto">
              <code>npm install cryptowallet-sdk</code>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-2 dark:text-white">Step 3: Make Your First API Call</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Here's a simple example of how to use the CryptoWallet API with our JavaScript SDK:
            </p>
            <div className="relative">
              <div className="absolute top-2 right-2">
                <button
                  onClick={() => copyToClipboard(sampleCode)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  {copied ? <Check className="h-5 w-5 text-green-500" /> : <Copy className="h-5 w-5" />}
                </button>
              </div>
              <pre className="bg-gray-900 text-gray-200 p-4 rounded-lg overflow-x-auto">
                <code className="text-sm">{sampleCode}</code>
              </pre>
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-6 dark:text-white">Available Endpoints</h2>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead>
                <tr>
                  <th className="px-6 py-3 bg-gray-50 dark:bg-gray-700 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Endpoint</th>
                  <th className="px-6 py-3 bg-gray-50 dark:bg-gray-700 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Method</th>
                  <th className="px-6 py-3 bg-gray-50 dark:bg-gray-700 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Description</th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-primary">/api/v1/wallets</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">GET</td>
                  <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">Get a list of wallets associated with your account</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-primary">/api/v1/wallets/{'{walletAddress}'}/balance</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">GET</td>
                  <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">Get the balance of a specific wallet address</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-primary">/api/v1/transactions</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">POST</td>
                  <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">Create and send a new transaction</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-primary">/api/v1/transactions/{'{txHash}'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">GET</td>
                  <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">Get details of a specific transaction</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-primary">/api/v1/gas-price</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">GET</td>
                  <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">Get current gas price estimates</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <div className="flex items-center gap-3 mb-4">
            <Lock className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-semibold dark:text-white">Rate Limits & Authentication</h2>
          </div>
          
          <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg border border-gray-200 dark:border-gray-600 mb-6">
            <h3 className="font-medium text-lg mb-2 dark:text-white">Rate Limits</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              To ensure service stability, API calls are subject to rate limiting:
            </p>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1">
              <li>Free tier: 100 requests per day</li>
              <li>Developer tier: 1,000 requests per day</li>
              <li>Business tier: 10,000 requests per day</li>
              <li>Enterprise tier: Custom limits</li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium text-lg mb-2 dark:text-white">Authentication</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              All API requests must include your API key in the request headers:
            </p>
            <div className="bg-gray-900 text-gray-200 p-4 rounded-lg overflow-x-auto">
              <code>X-API-Key: your_api_key_here</code>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ApiPage;