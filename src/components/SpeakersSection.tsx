import { motion } from 'motion/react';
import { Linkedin, Twitter } from 'lucide-react@0.487.0';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function SpeakersSection() {
  const speakers = [
    {
      name: 'Dr. Sarah Chen',
      role: 'Chief AI Scientist',
      company: 'TechCorp AI',
      image: 'https://images.unsplash.com/photo-1762968274962-20c12e6e8ecd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNobm9sb2d5JTIwc3BlYWtlciUyMHByb2Zlc3Npb25hbHxlbnwxfHx8fDE3NjM0ODU4MzJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    },
    {
      name: 'Prof. Michael Rodriguez',
      role: 'ML Research Director',
      company: 'Stanford AI Lab',
      image: 'https://images.unsplash.com/photo-1762968274962-20c12e6e8ecd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNobm9sb2d5JTIwc3BlYWtlciUyMHByb2Zlc3Npb25hbHxlbnwxfHx8fDE3NjM0ODU4MzJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    },
    {
      name: 'Elena Volkov',
      role: 'Head of Neural Networks',
      company: 'DeepMind',
      image: 'https://images.unsplash.com/photo-1762968274962-20c12e6e8ecd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNobm9sb2d5JTIwc3BlYWtlciUyMHByb2Zlc3Npb25hbHxlbnwxfHx8fDE3NjM0ODU4MzJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    },
    {
      name: 'Dr. James Park',
      role: 'VP of AI Innovation',
      company: 'Google Brain',
      image: 'https://images.unsplash.com/photo-1762968274962-20c12e6e8ecd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNobm9sb2d5JTIwc3BlYWtlciUyMHByb2Zlc3Npb25hbHxlbnwxfHx8fDE3NjM0ODU4MzJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    },
    {
      name: 'Aisha Mohammed',
      role: 'AI Ethics Lead',
      company: 'OpenAI',
      image: 'https://images.unsplash.com/photo-1762968274962-20c12e6e8ecd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNobm9sb2d5JTIwc3BlYWtlciUyMHByb2Zlc3Npb25hbHxlbnwxfHx8fDE3NjM0ODU4MzJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    },
    {
      name: 'Dr. Kenji Tanaka',
      role: 'Robotics & AI Director',
      company: 'Sony Research',
      image: 'https://images.unsplash.com/photo-1762968274962-20c12e6e8ecd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNobm9sb2d5JTIwc3BlYWtlciUyMHByb2Zlc3Npb25hbHxlbnwxfHx8fDE3NjM0ODU4MzJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    },
    {
      name: 'Maria Garcia',
      role: 'NLP Research Lead',
      company: 'Meta AI',
      image: 'https://images.unsplash.com/photo-1762968274962-20c12e6e8ecd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNobm9sb2d5JTIwc3BlYWtlciUyMHByb2Zlc3Npb25hbHxlbnwxfHx8fDE3NjM0ODU4MzJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    },
    {
      name: 'Dr. Thomas Wright',
      role: 'Computer Vision Expert',
      company: 'NVIDIA Research',
      image: 'https://images.unsplash.com/photo-1762968274962-20c12e6e8ecd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNobm9sb2d5JTIwc3BlYWtlciUyMHByb2Zlc3Npb25hbHxlbnwxfHx8fDE3NjM0ODU4MzJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    },
  ];

  return (
    <section id="speakers" className="relative py-24 lg:py-32 bg-gradient-to-b from-black via-purple-950/10 to-black overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(rgba(168, 85, 247, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(168, 85, 247, 0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
        }} />
      </div>

      {/* Floating AI Particles */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-cyan-400 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -100, 0],
            opacity: [0, 0.6, 0],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}

      {/* Gradient Orbs */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
        }}
        className="absolute top-1/4 right-1/4 w-96 h-96 bg-purple-600 rounded-full filter blur-3xl"
      />
      <motion.div
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
        }}
        className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-cyan-600 rounded-full filter blur-3xl"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-2 bg-purple-900/30 border border-purple-500/50 rounded-full text-purple-400 mb-6"
          >
            World-Class Speakers
          </motion.div>
          <h2 className="text-4xl lg:text-5xl mb-4 text-white">
            Meet the{' '}
            <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Visionaries
            </span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Learn from the pioneers shaping the future of artificial intelligence
          </p>
        </motion.div>

        {/* Speakers Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {speakers.map((speaker, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="group relative"
            >
              {/* Neon Frame Effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-2xl opacity-0 group-hover:opacity-100 blur transition-opacity duration-500" />
              
              {/* Card */}
              <div className="relative bg-gradient-to-b from-gray-900 to-black border border-purple-500/30 rounded-2xl overflow-hidden backdrop-blur-sm group-hover:border-purple-500/60 transition-all">
                {/* Image */}
                <div className="relative aspect-square overflow-hidden">
                  <ImageWithFallback
                    src={speaker.image}
                    alt={speaker.name}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                  />
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
                  
                  {/* Social Links */}
                  <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      className="w-8 h-8 bg-purple-600/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-purple-600 transition-colors"
                    >
                      <Linkedin size={16} className="text-white" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      className="w-8 h-8 bg-cyan-600/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-cyan-600 transition-colors"
                    >
                      <Twitter size={16} className="text-white" />
                    </motion.button>
                  </div>
                </div>

                {/* Info */}
                <div className="p-6">
                  <h3 className="text-white mb-1">{speaker.name}</h3>
                  <p className="text-purple-400 text-sm mb-1">{speaker.role}</p>
                  <p className="text-gray-500 text-sm">{speaker.company}</p>
                </div>

                {/* Glow Effect */}
                <motion.div
                  animate={{
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  className="absolute inset-0 bg-gradient-to-t from-purple-600/20 to-transparent opacity-0 group-hover:opacity-100 pointer-events-none"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
