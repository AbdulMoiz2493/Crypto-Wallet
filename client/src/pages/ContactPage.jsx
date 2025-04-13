
import React, { useState } from 'react';
import Layout from '../components/Layout';
import { Mail, MessageSquare, Send, Phone, MapPin } from 'lucide-react';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast.success('Your message has been sent successfully!');
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <Layout>
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 dark:text-white">Contact Us</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md flex flex-col items-center text-center">
            <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <Mail className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold text-lg mb-2 dark:text-white">Email Us</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-3">Our friendly team is here to help</p>
            <a href="mailto:support@cryptowallet.com" className="text-primary font-medium">
              support@cryptowallet.com
            </a>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md flex flex-col items-center text-center">
            <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <MapPin className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold text-lg mb-2 dark:text-white">Office</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-3">Come say hello at our office</p>
            <p className="text-gray-800 dark:text-white">
              123 Blockchain Street<br />
              San Francisco, CA 94107
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md flex flex-col items-center text-center">
            <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <Phone className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold text-lg mb-2 dark:text-white">Phone</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-3">Mon-Fri from 8am to 5pm</p>
            <a href="tel:+1-555-123-4567" className="text-primary font-medium">
              +1 (555) 123-4567
            </a>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-6 flex items-center dark:text-white">
              <MessageSquare className="h-6 w-6 mr-2 text-primary" />
              Send us a Message
            </h2>
            
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-white mb-1">
                    Your Name
                  </label>
                  <Input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-white mb-1">
                    Your Email
                  </label>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="john@example.com"
                  />
                </div>
              </div>
              
              <div className="mb-4">
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-white mb-1">
                  Subject
                </label>
                <Input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  placeholder="How can we help you?"
                />
              </div>
              
              <div className="mb-6">
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-white mb-1">
                  Your Message
                </label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  placeholder="Let us know how we can help you..."
                  className="dark:text-white"
                />
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary text-white font-medium py-3 px-4 rounded-lg hover:bg-primary/90 focus:ring-4 focus:ring-primary/50 transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="h-5 w-5" />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-6 dark:text-white">Frequently Asked Questions</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-lg mb-2 dark:text-white">How do I reset my password?</h3>
                <p className="text-gray-700 dark:text-white">
                  You can reset your password by clicking on the "Forgot Password" link on the login page. We'll send you an email with instructions.
                </p>
              </div>
              
              <div>
                <h3 className="font-medium text-lg mb-2 dark:text-white">Is my crypto secure with CryptoWallet?</h3>
                <p className="text-gray-700 dark:text-white">
                  Yes! We use industry-leading security measures including cold storage, two-factor authentication, and regular security audits.
                </p>
              </div>
              
              <div>
                <h3 className="font-medium text-lg mb-2 dark:text-white">What cryptocurrencies do you support?</h3>
                <p className="text-gray-700 dark:text-white">
                  Currently, we support Ethereum and all ERC-20 tokens. We're working on adding support for more blockchains soon.
                </p>
              </div>
              
              <div>
                <h3 className="font-medium text-lg mb-2 dark:text-white">How do I contact customer support?</h3>
                <p className="text-gray-700 dark:text-white">
                  You can reach our support team via email at support@cryptowallet.com or by phone at +1 (555) 123-4567 during business hours.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ContactPage;
