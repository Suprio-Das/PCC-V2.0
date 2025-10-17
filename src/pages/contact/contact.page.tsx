import { Footer } from '@/components/Footer';
import { Card, CardTitle } from '@/components/HoverEffect';
import { Navbar } from '@/components/Navbar';
import { CardContent, CardHeader } from '@/components/ui/card';
import DocumentTitle from '@/lib/documentTitle';
import { Icon } from '@iconify-icon/react/dist/iconify.mjs';
import { motion } from 'framer-motion';

const ContactPage = () => {
  DocumentTitle('Contact');
  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-12 space-y-16">
        {/* Contact Information Section */}
        <section className="text-center">
          <h1 className="text-4xl font-semibold mb-4">Contact Port City International University Computer Club</h1>
          <p className="text-lg mb-8">Let us know how we can help.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { title: 'Chat to President', content: 'Email: pciucomputerclub@gmail.com' },
              { title: 'Chat to Support', content: 'Email: [support email not available]' },
              {
                title: 'Visit us',
                content: (
                  <>
                    University Campus, PCIU
                    <br />
                    <a
                      href="https://maps.app.goo.gl/Dmfs8nQtnGRAXNmn6"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: 'blue', textDecoration: 'underline' }}
                    >
                      View on Google Map
                    </a>
                  </>
                ),
              },
              {
                title: 'Call us',
                content: (
                  <>
                    Sat-Thu, 9am - 5pm
                    <br />
                    Phone: N/A
                  </>
                ),
              },
            ].map((info, index) => (
              <motion.div whileHover={{ scale: 1.05 }} key={index}>
                <Card>
                  <CardHeader>
                    <CardTitle>{info.title}</CardTitle>
                  </CardHeader>
                  <CardContent>{info.content}</CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* FAQ Section */}
        <section className="text-center">
          <h2 className="text-3xl font-semibold mb-6">Frequently Asked Questions</h2>
          <div className="max-w-2xl mx-auto">
            {[
              { question: 'Is membership free?', answer: 'No, There is a monthly fee for club membership.' },
              {
                question: 'How do I volunteer for events?',
                answer: 'Reach out to us via email or join the club’s meeting.',
              },
              { question: 'Do you offer coding workshops?', answer: 'Yes, we offer workshops every semester.' },
              { question: 'How can I update my contact details?', answer: 'Email us your updated information.' },
            ].map((faq, index) => (
              <motion.div
                key={index}
                className="border-b border-gray-300 py-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <details className="group">
                  <summary className="flex justify-between items-center cursor-pointer text-lg font-medium">
                    {faq.question}
                    <span className="group-open:rotate-180 transition-transform text-gray-400">
                      <Icon icon={'mingcute:down-line'} />
                    </span>
                  </summary>
                  <p className="mt-2 text-gray-400">{faq.answer}</p>
                </details>
              </motion.div>
            ))}
          </div>
        </section>
        <Footer />
      </div>
    </>
  );
};

export default ContactPage;
