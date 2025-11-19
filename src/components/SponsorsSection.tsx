import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function SponsorForm({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ name, email, company });
    onClose();
    setName('');
    setEmail('');
    setCompany('');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-black rounded-2xl p-6 sm:p-8 w-11/12 max-w-md border border-purple-500/50 shadow-lg"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.8 }}
          >
            <h3 className="text-2xl text-white mb-4 text-center">Become a Sponsor</h3>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="p-3 rounded-lg bg-purple-900/30 text-white border border-purple-500/50 placeholder-gray-400"
                required
              />
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="p-3 rounded-lg bg-purple-900/30 text-white border border-purple-500/50 placeholder-gray-400"
                required
              />
              <input
                type="text"
                placeholder="Company Name"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="p-3 rounded-lg bg-purple-900/30 text-white border border-purple-500/50 placeholder-gray-400"
                required
              />
              <div className="flex justify-end gap-4 mt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-2 rounded-full border border-purple-500 text-purple-400 hover:bg-purple-500/20 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-full bg-gradient-to-r from-purple-600 to-cyan-500 text-white hover:shadow-lg transition-shadow"
                >
                  Submit
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}


export function SponsorsSection() {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const sponsors = {
    platinum: [
      { name: 'TechCorp', color: 'from-purple-600 to-pink-600' },
      { name: 'AI Ventures', color: 'from-cyan-600 to-blue-600' },
    ],
    gold: [
      { name: 'DeepMind Labs', color: 'from-yellow-600 to-orange-600' },
      { name: 'Neural Systems', color: 'from-purple-600 to-cyan-600' },
      { name: 'Quantum AI', color: 'from-green-600 to-teal-600' },
    ],
    silver: [
      { name: 'DataFlow', color: 'from-gray-600 to-gray-500' },
      { name: 'CloudAI', color: 'from-blue-600 to-indigo-600' },
      { name: 'BrainTech', color: 'from-pink-600 to-purple-600' },
      { name: 'NeuralNet Pro', color: 'from-cyan-600 to-purple-600' },
      { name: 'AI Solutions', color: 'from-orange-600 to-red-600' },
      { name: 'SmartLearn', color: 'from-teal-600 to-cyan-600' },
    ],
  };

  return (
    <section id="sponsors" className="relative py-24 lg:py-32 bg-black overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-600 rounded-full filter blur-3xl"
        />
        <motion.div
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-600 rounded-full filter blur-3xl"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-2 bg-purple-900/30 border border-purple-500/50 rounded-full text-purple-400 mb-6"
          >
            Our Supporters
          </motion.div>
          <h2 className="text-4xl lg:text-5xl mb-4 text-white">
            Partners &{' '}
            <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">Sponsors</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">Powered by industry leaders and innovative companies</p>
        </motion.div>

        {/* Sponsors Sections */}
        {['platinum', 'gold', 'silver'].map((tier) => (
          <div key={tier} className="mb-16">
            <motion.h3
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className={`text-center mb-8 ${
                tier === 'platinum'
                  ? 'text-2xl text-purple-300'
                  : tier === 'gold'
                  ? 'text-xl text-yellow-400'
                  : 'text-lg text-gray-400'
              }`}
            >
              {tier.charAt(0).toUpperCase() + tier.slice(1)} Sponsors
            </motion.h3>
            <div
              className={`grid gap-6 ${
                tier === 'platinum'
                  ? 'md:grid-cols-2 max-w-4xl mx-auto'
                  : tier === 'gold'
                  ? 'sm:grid-cols-2 lg:grid-cols-3'
                  : 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-6'
              }`}
            >
              {sponsors[tier as keyof typeof sponsors].map((sponsor, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: tier === 'silver' ? 0 : 30, scale: tier === 'silver' ? 0.8 : 1 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="relative group"
                >
                  {/* Glow effect */}
                  <motion.div
                    animate={{ opacity: [0.1, 0.3, 0.1] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: index * 0.1 }}
                    className={`absolute -inset-1 bg-gradient-to-r ${sponsor.color} rounded-lg blur opacity-30 group-hover:opacity-60 transition-opacity`}
                  />
                  <div
                    className={`relative flex items-center justify-center backdrop-blur-sm border rounded-lg ${
                      tier === 'platinum'
                        ? 'h-32 bg-gradient-to-br from-gray-900 to-black border-2 border-purple-500/50 rounded-2xl'
                        : tier === 'gold'
                        ? 'h-24 bg-gradient-to-br from-gray-900 to-black border border-purple-500/30 rounded-xl'
                        : 'h-20 p-2 bg-gradient-to-br from-gray-900 to-black border border-purple-500/20 rounded-lg'
                    }`}
                  >
                    <span
                      className={`${
                        tier === 'platinum'
                          ? 'text-3xl'
                          : tier === 'gold'
                          ? 'text-xl'
                          : 'text-xs text-center'
                      } bg-gradient-to-r ${sponsor.color} bg-clip-text text-transparent`}
                    >
                      {sponsor.name}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        ))}

        {/* Become a Sponsor CTA */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mt-16">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsFormOpen(true)}
            className="px-8 py-4 bg-gradient-to-r from-purple-600 to-cyan-500 rounded-full text-white shadow-lg shadow-purple-500/50 hover:shadow-purple-500/80 transition-shadow"
          >
            Become a Sponsor
          </motion.button>
        </motion.div>

        {/* Form Modal */}
        <SponsorForm isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} />
      </div>
    </section>
  );
}
// ...existing code...
