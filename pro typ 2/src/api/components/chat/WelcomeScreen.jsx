import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Lightbulb, Bug, Rocket, Zap, BookOpen } from 'lucide-react';

const suggestions = [
  {
    icon: Code2,
    title: 'Code Review',
    description: 'Review my code for best practices',
    prompt: 'Can you review this code and suggest improvements?',
  },
  {
    icon: Bug,
    title: 'Debug Help',
    description: 'Help me find and fix bugs',
    prompt: 'I have a bug in my code. Can you help me debug it?',
  },
  {
    icon: Lightbulb,
    title: 'Explain Concept',
    description: 'Explain programming concepts',
    prompt: 'Can you explain how async/await works in JavaScript?',
  },
  {
    icon: Rocket,
    title: 'Best Practices',
    description: 'Learn industry standards',
    prompt: 'What are the best practices for writing clean code?',
  },
];

export default function WelcomeScreen({ onSuggestionClick }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center justify-center min-h-[60vh] px-6"
    >
      {/* Logo & Title */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.5 }}
        className="text-center mb-12"
      >
        <div className="relative inline-block mb-6">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center glow-purple">
            <Zap className="w-10 h-10 text-white" />
          </div>
          <motion.div
            className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-gradient-to-br from-blue-400 to-blue-500 flex items-center justify-center"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <BookOpen className="w-3 h-3 text-white" />
          </motion.div>
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white via-blue-100 to-violet-200 bg-clip-text text-transparent mb-4">
          Code Sensei
        </h1>
        <p className="text-slate-400 text-lg max-w-md mx-auto">
          Your personal senior software engineer. Ask anything about coding, debugging, or best practices.
        </p>
      </motion.div>

      {/* Suggestion Cards */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl w-full"
      >
        {suggestions.map((suggestion, index) => (
          <motion.button
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + index * 0.1 }}
            onClick={() => onSuggestionClick(suggestion.prompt)}
            className="glass group p-5 rounded-2xl text-left hover:bg-white/[0.08] transition-all duration-300 hover:scale-[1.02] hover:border-blue-500/30"
          >
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500/20 to-violet-500/20 flex items-center justify-center group-hover:from-blue-500/30 group-hover:to-violet-500/30 transition-all">
                <suggestion.icon className="w-5 h-5 text-blue-400" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-white mb-1 group-hover:text-blue-300 transition-colors">
                  {suggestion.title}
                </h3>
                <p className="text-sm text-slate-400">
                  {suggestion.description}
                </p>
              </div>
            </div>
          </motion.button>
        ))}
      </motion.div>

      {/* Footer hint */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="text-slate-500 text-sm mt-12"
      >
        Start typing below or click a suggestion to begin
      </motion.p>
    </motion.div>
  );
}