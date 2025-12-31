'use client';

import { motion } from 'framer-motion';

export default function AnimatedBox() {
  return (
    <motion.div
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      Hello, I slid in from the left!
    </motion.div>
  );
}