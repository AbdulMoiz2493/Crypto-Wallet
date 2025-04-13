
import React from 'react';
import Layout from '../components/Layout';

const AboutPage = () => {
  return (
    <Layout>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 dark:text-white">About CryptoWallet</h1>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6 transition-colors duration-300">
          <h2 className="text-2xl font-semibold mb-4 dark:text-white">Our Mission</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            At CryptoWallet, our mission is to provide a secure, user-friendly platform for managing your cryptocurrency assets.
            We believe in the power of blockchain technology to transform the financial landscape and empower individuals with
            greater control over their digital assets.
          </p>
          <p className="text-gray-700 dark:text-gray-300">
            Founded in 2023, we've been at the forefront of cryptocurrency innovation, building tools that make digital asset
            management accessible to everyone, from beginners to experienced traders.
          </p>
        </div>
        
        
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-colors duration-300">
          <h2 className="text-2xl font-semibold mb-4 dark:text-white">Our Values</h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
            <li><span className="font-medium">Security First:</span> We prioritize the security of your assets above all else.</li>
            <li><span className="font-medium">Transparency:</span> We believe in being open about how our platform works.</li>
            <li><span className="font-medium">User Empowerment:</span> We build tools that give you control over your digital future.</li>
            <li><span className="font-medium">Innovation:</span> We continuously improve our platform to stay ahead of the curve.</li>
            <li><span className="font-medium">Accessibility:</span> We make cryptocurrency management accessible to everyone.</li>
          </ul>
        </div>
      </div>
    </Layout>
  );
};

export default AboutPage;
