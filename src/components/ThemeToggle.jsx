import { motion } from 'framer-motion';
import { FaSun, FaMoon } from 'react-icons/fa';
import { useTheme } from '../contexts/ThemeContext';

const ThemeToggle = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <motion.button
      onClick={toggleTheme}
      className="relative h-10 w-10 rounded-xl glass flex items-center justify-center text-white/80 hover:text-white transition-colors"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <motion.div
        initial={false}
        animate={{ rotate: isDark ? 0 : 180 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        {isDark ? (
          <FaSun size={18} className="text-yellow-400" />
        ) : (
          <FaMoon size={18} className="text-blue-300" />
        )}
      </motion.div>
      
      {/* Glow effect */}
      <motion.div
        className="absolute inset-0 rounded-xl"
        initial={false}
        animate={{
          background: isDark 
            ? 'radial-gradient(circle, rgba(255, 193, 7, 0.2) 0%, transparent 70%)'
            : 'radial-gradient(circle, rgba(59, 130, 246, 0.2) 0%, transparent 70%)'
        }}
        transition={{ duration: 0.3 }}
      />
    </motion.button>
  );
};

export default ThemeToggle;
