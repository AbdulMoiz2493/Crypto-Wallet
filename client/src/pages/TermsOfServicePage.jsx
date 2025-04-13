
import React from 'react';
import Layout from '../components/Layout';
import { FileText } from 'lucide-react';

const TermsOfServicePage = () => {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <FileText className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold">Terms of Service</h1>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <p className="text-gray-600 mb-6">Last Updated: April 11, 2025</p>
          
          <div className="prose prose-slate max-w-none">
            <p>
              Please read these Terms of Service ("Terms", "Terms of Service") carefully before using the CryptoWallet 
              website and application operated by CryptoWallet Inc. ("us", "we", or "our").
            </p>
            
            <p>
              Your access to and use of the Service is conditioned on your acceptance of and compliance with these Terms. 
              These Terms apply to all visitors, users, and others who access or use the Service.
            </p>
            
            <p>
              <strong>By accessing or using the Service you agree to be bound by these Terms. If you disagree with any part of the terms, you may not access the Service.</strong>
            </p>
            
            <h2>Accounts</h2>
            <p>
              When you create an account with us, you must provide information that is accurate, complete, and current at all times. 
              Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Service.
            </p>
            
            <p>
              You are responsible for safeguarding the password and private keys that you use to access the Service and for any activities 
              or actions under your account. We encourage you to use strong passwords and to keep your private keys secure.
            </p>
            
            <p>
              You agree not to disclose your password to any third party. You must notify us immediately upon becoming aware of any breach 
              of security or unauthorized use of your account.
            </p>
            
            <h2>Intellectual Property</h2>
            <p>
              The Service and its original content, features, and functionality are and will remain the exclusive property of CryptoWallet Inc. 
              and its licensors. The Service is protected by copyright, trademark, and other laws of both the United States and foreign countries.
            </p>
            
            <h2>Links to Other Web Sites</h2>
            <p>
              Our Service may contain links to third-party web sites or services that are not owned or controlled by CryptoWallet Inc.
            </p>
            
            <p>
              CryptoWallet Inc. has no control over, and assumes no responsibility for, the content, privacy policies, or practices of any 
              third-party web sites or services. You further acknowledge and agree that CryptoWallet Inc. shall not be responsible or liable, 
              directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection with the use of or reliance 
              on any such content, goods, or services available on or through any such web sites or services.
            </p>
            
            <h2>Termination</h2>
            <p>
              We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including 
              without limitation if you breach the Terms.
            </p>
            
            <p>
              Upon termination, your right to use the Service will immediately cease. If you wish to terminate your account, you may simply 
              discontinue using the Service.
            </p>
            
            <h2>Limitation of Liability</h2>
            <p>
              In no event shall CryptoWallet Inc., nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for 
              any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, 
              use, goodwill, or other intangible losses, resulting from (i) your access to or use of or inability to access or use the Service; 
              (ii) any conduct or content of any third party on the Service; (iii) any content obtained from the Service; and (iv) unauthorized 
              access, use, or alteration of your transmissions or content, whether based on warranty, contract, tort (including negligence), 
              or any other legal theory, whether or not we have been informed of the possibility of such damage.
            </p>
            
            <h2>Disclaimer</h2>
            <p>
              Your use of the Service is at your sole risk. The Service is provided on an "AS IS" and "AS AVAILABLE" basis. The Service is 
              provided without warranties of any kind, whether express or implied, including, but not limited to, implied warranties of 
              merchantability, fitness for a particular purpose, non-infringement, or course of performance.
            </p>
            
            <h2>Governing Law</h2>
            <p>
              These Terms shall be governed and construed in accordance with the laws of the United States, without regard to its conflict 
              of law provisions.
            </p>
            
            <p>
              Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights. If any provision 
              of these Terms is held to be invalid or unenforceable by a court, the remaining provisions of these Terms will remain in effect. 
              These Terms constitute the entire agreement between us regarding our Service, and supersede and replace any prior agreements 
              we might have between us regarding the Service.
            </p>
            
            <h2>Changes</h2>
            <p>
              We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will 
              try to provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be 
              determined at our sole discretion.
            </p>
            
            <h2>Contact Us</h2>
            <p>
              If you have any questions about these Terms, please contact us at:
            </p>
            <p>
              legal@cryptowallet.com<br />
              123 Blockchain Street<br />
              San Francisco, CA 94107
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TermsOfServicePage;
