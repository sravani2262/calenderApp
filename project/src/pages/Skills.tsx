import { motion } from 'framer-motion';
import { Code, Terminal, Database, Briefcase } from 'lucide-react';

const Skills = () => {
  const skills = [
    { category: 'Frontend', icon: <Code />, items: ['React', 'TypeScript', 'Tailwind CSS', 'Next.js'] },
    { category: 'Backend', icon: <Terminal />, items: ['Node.js', 'Python', 'Java', 'Express'] },
    { category: 'Database', icon: <Database />, items: ['MongoDB', 'PostgreSQL', 'Redis', 'Firebase'] },
    { category: 'Tools', icon: <Briefcase />, items: ['Git', 'Docker', 'AWS', 'CI/CD'] }
  ];

  return (
    <section className="min-h-screen py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
          Technical Skills
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm p-6 rounded-lg shadow-lg"
            >
              <div className="text-blue-600 dark:text-blue-400 mb-4">
                {skill.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                {skill.category}
              </h3>
              <ul className="space-y-2">
                {skill.items.map((item, i) => (
                  <li key={i} className="text-gray-600 dark:text-gray-300">{item}</li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;