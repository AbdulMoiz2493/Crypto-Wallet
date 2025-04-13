
import React from 'react';
import Layout from '../components/Layout';
import { Shield } from 'lucide-react';

const PrivacyPolicyPage = () => {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <Shield className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold">Privacy Policy</h1>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <p className="text-gray-600 mb-6">Last Updated: April 11, 2025</p>
          
          <div className="prose prose-slate max-w-none">
            <p>
              At CryptoWallet, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, 
              and safeguard your information when you use our wallet service and website. Please read this privacy policy carefully.
            </p>
            
            <h2>Information We Collect</h2>
            <p>
              We collect information that you provide directly to us when you:
            </p>
            <ul>
              <li>Create an account</li>
              <li>Contact our customer support</li>
              <li>Participate in surveys or promotions</li>
              <li>Use our wallet services</li>
            </ul>
            
            <p>
              The types of information we may collect include:
            </p>
            <ul>
              <li>Contact information (such as name, email address)</li>
              <li>Authentication information (password, security questions)</li>
              <li>Public blockchain data (transaction history associated with your public wallet addresses)</li>
              <li>Device information and logs</li>
            </ul>
            
            <h2>How We Use Your Information</h2>
            <p>
              We use the information we collect to:
            </p>
            <ul>
              <li>Provide, maintain, and improve our services</li>
              <li>Process transactions and send notices about your transactions</li>
              <li>Resolve disputes and troubleshoot problems</li>
              <li>Prevent potentially prohibited or illegal activities</li>
              <li>Enforce our terms of service</li>
              <li>Personalize and improve your experience</li>
              <li>Communicate with you about products, services, and events</li>
            </ul>
            
            <h2>Information Sharing and Disclosure</h2>
            <p>
              We may share your information with:
            </p>
            <ul>
              <li>Service providers who perform services on our behalf</li>
              <li>Law enforcement or other third parties when required by law or to protect our rights</li>
              <li>In connection with a merger, sale, or acquisition</li>
            </ul>
            
            <p>
              We do not sell your personal information to third parties for marketing purposes.
            </p>
            
            <h2>Security</h2>
            <p>
              We implement appropriate security measures to protect your personal information from unauthorized access, 
              alteration, disclosure, or destruction. These measures include internal reviews of our data collection, 
              storage, and processing practices and security measures, as well as physical security measures to guard 
              against unauthorized access to systems where we store personal data.
            </p>
            
            <h2>Your Choices</h2>
            <p>
              You can access, update, or correct your account information at any time by logging into your account settings. 
              You may also opt out of receiving promotional communications from us by following the instructions in those communications.
            </p>
            
            <h2>Cookies and Tracking Technologies</h2>
            <p>
              We use cookies and similar tracking technologies to track activity on our website and hold certain information. 
              You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
            </p>
            
            <h2>Children's Privacy</h2>
            <p>
              Our services are not intended for individuals under the age of 18, and we do not knowingly collect personal 
              information from children under 18.
            </p>
            
            <h2>Changes to This Privacy Policy</h2>
            <p>
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new 
              Privacy Policy on this page and updating the "Last Updated" date.
            </p>
            
            <h2>Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at:
            </p>
            <p>
              privacy@cryptowallet.com<br />
              123 Blockchain Street<br />
              San Francisco, CA 94107
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PrivacyPolicyPage;
