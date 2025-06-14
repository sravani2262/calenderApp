import { motion } from 'framer-motion';
import { Github, Linkedin, Download } from 'lucide-react';

const Home = () => {
  return (
    <section className="min-h-screen flex items-center justify-center relative py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:w-1/2 text-center lg:text-left"
          >
            <h2 className="text-xl text-blue-600 dark:text-blue-400 font-medium mb-4">
              Hello, I'm
            </h2>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              John Doe
            </h1>
            <h2 className="text-2xl md:text-3xl text-blue-600 dark:text-blue-400 mb-6">
              Full Stack Developer
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl">
              I'm a passionate Full Stack Developer based in New York, specializing in building exceptional digital experiences that are fast, accessible, and responsive.
            </p>
            
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              <motion.a
                href="/resume.pdf"
                download
                className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Download className="h-5 w-5" />
                Download CV
              </motion.a>
              
              <motion.div className="flex gap-4">
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-gray-100 dark:bg-gray-800 rounded-full text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  <Github className="h-5 w-5" />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-gray-100 dark:bg-gray-800 rounded-full text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Content - Profile Image */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:w-1/2 relative"
          >
            <div className="relative w-64 h-64 md:w-80 md:h-80 mx-auto">
              <div className="absolute inset-0 bg-blue-600 rounded-full blur-2xl opacity-20 animate-pulse"></div>
              <img
                src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&q=80&w=800"
                alt="Profile"
                className="relative z-10 w-full h-full object-cover rounded-full border-4 border-white dark:border-gray-800 shadow-xl"
              />
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-gray-400 dark:border-gray-600 rounded-full p-1">
            <div className="w-1.5 h-3 bg-gray-400 dark:bg-gray-600 rounded-full animate-bounce mx-auto"></div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Home;