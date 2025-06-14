import { motion } from 'framer-motion';

const Certifications = () => {
  const certifications = [
    {
      title: 'AWS Certified Developer',
      organization: 'Amazon Web Services',
      date: 'January 2024'
    },
    {
      title: 'Professional React Developer',
      organization: 'Meta',
      date: 'December 2023'
    },
    {
      title: 'Full Stack Development',
      organization: 'FreeCodeCamp',
      date: 'November 2023'
    }
  ];

  return (
    <section className="min-h-screen py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
          Certifications
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {certifications.map((cert, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm p-6 rounded-lg shadow-lg"
            >
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {cert.title}
              </h3>
              <p className="text-blue-600 dark:text-blue-400 mb-2">
                {cert.organization}
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                {cert.date}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications;