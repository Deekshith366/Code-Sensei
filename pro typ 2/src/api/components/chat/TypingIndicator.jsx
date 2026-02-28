import React from 'react';
import { motion } from 'framer-motion';
import { Bot, Sparkles } from 'lucide-react';

export default function TypingIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="flex gap-4"
    >
      {/* Avatar */}
      <div className="flex-shrink-0">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 glow-purple flex items-center justify-center">
          <Bot className="w-5 h-5 text-white" />
        </div>
      </div>

      {/* Typing bubble */}
      <div className="glass-strong rounded-2xl px-5 py-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-semibold text-violet-400">Code Sensei</span>
          <Sparkles className="w-3 h-3 text-violet-400" />
        </div>
        
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-2.5 h-2.5 rounded-full bg-gradient-to-br from-violet-400 to-purple-500"
                animate={{
                  y: [0, -8, 0],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 0.8,
                  repeat: Infinity,
                  delay: i * 0.15,
                  ease: 'easeInOut',
                }}
              />
            ))}
          </div>
          <span className="text-sm text-slate-400 ml-2">Thinking...</span>
        </div>
      </div>
    </motion.div>
  );
}