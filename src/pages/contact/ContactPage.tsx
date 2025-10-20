import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import DocumentTitle from '@/lib/documentTitle';
import { Icon } from '@iconify-icon/react/dist/iconify.mjs';
import { motion } from 'framer-motion';
import { useState } from 'react';

const ContactPage = () => {
  DocumentTitle('Contact');
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Message sent!');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-16 space-y-16">
        {/* Contact Info Card */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-10 text-center">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <h3 className="text-5xl md:text-6xl drop-shadow-md bg-gradient-to-r from-primary to-black dark:to-white text-transparent bg-clip-text mb-4">
              Contact Us
            </h3>
            <p className="mt-6 text-gray-700 dark:text-gray-200 text-lg max-w-2xl mx-auto leading-relaxed mb-10">
              Have questions or need assistance? We are here to help!
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Email */}
            <div className="p-4">
              <div className="w-14 h-14 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-3">
                <Icon icon="fa-solid:envelope" className="text-green-500 text-xl" />
              </div>
              <p className="text-gray-600 dark:text-gray-300">pciucomputerclub@gmail.com</p>
            </div>
            {/* Phone */}
            <div className="p-4">
              <div className="w-14 h-14 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-3">
                <Icon icon="fa-solid:phone" className="text-green-500 text-xl" />
              </div>
              <p className="text-gray-600 dark:text-gray-300">+008 01234567890</p>
            </div>
            {/* Address */}
            <div className="p-4">
              <div className="w-14 h-14 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-3">
                <Icon icon="fa-solid:map-marker-alt" className="text-green-500 text-xl" />
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                Nikunja Housing Society, South Khulshi Chattogram, Bangladesh
              </p>
            </div>
          </div>
        </div>

        {/* Two Column Grid: Contact Form + FAQ */}
        <div className="grid md:grid-cols-2 gap-10">
          {/* Contact Form */}
          <motion.div
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-6 text-center">
              Send Us a Message
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 dark:bg-gray-700 dark:text-white"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 dark:bg-gray-700 dark:text-white"
                required
              />
              <textarea
                name="message"
                placeholder="Your Message"
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 dark:bg-gray-700 dark:text-white resize-none"
                rows={5}
                required
              />
              <button type="submit" className="w-full join-pcc-btn">
                Send Message
              </button>
            </form>
          </motion.div>

          {/* FAQ Section */}
          <motion.div
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-6 text-center">
              Frequently Asked Questions
            </h3>
            <div className="space-y-4">
              {[
                { question: 'Is membership free?', answer: 'No, there is a monthly fee for club membership.' },
                {
                  question: 'How do I volunteer for events?',
                  answer: 'Reach out to us via email or join the club’s meeting.',
                },
                { question: 'Do you offer coding workshops?', answer: 'Yes, we offer workshops every semester.' },
                { question: 'How can I update my contact details?', answer: 'Email us your updated information.' },
              ].map((faq, index) => (
                <details
                  key={index}
                  className="group border border-gray-200 dark:border-gray-700 rounded-lg p-4 cursor-pointer"
                >
                  <summary className="flex justify-between items-center text-gray-800 dark:text-gray-100 font-medium">
                    {faq.question}
                    <span className="group-open:rotate-180 transition-transform text-gray-400 dark:text-gray-400">
                      <Icon icon="mingcute:down-line" />
                    </span>
                  </summary>
                  <p className="mt-2 text-gray-600 dark:text-gray-300">{faq.answer}</p>
                </details>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
      {/* Google Map Section */}
      <section className="mt-16 w-full">
        <h2 className="text-3xl font-semibold text-center mb-6 text-gray-800 dark:text-gray-100">Find Us on Map</h2>
        <div className="w-full h-96 md:h-[500px] rounded-xl overflow-hidden shadow-lg">
          <iframe
            title="PCIU Computer Club Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3670.123456789!2d91.8100!3d22.3456!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30acd123456789ab%3A0xabcdef1234567890!2sNikunja%20Housing%20Society%2C%20South%20Khulshi%2C%20Chattogram%2C%20Bangladesh!5e0!3m2!1sen!2sbd!4v1699999999999!5m2!1sen!2sbd"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default ContactPage;
