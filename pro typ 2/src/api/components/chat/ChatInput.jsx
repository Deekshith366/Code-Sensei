import React, { useState, useRef, useEffect } from 'react';
import { Send, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

export default function ChatInput({ onSend, isLoading }) {
  const [message, setMessage] = useState('');
  const textareaRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 200) + 'px';
    }
  }, [message]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() && !isLoading) {
      onSend(message.trim());
      setMessage('');
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-4 md:p-6"
    >
      <form onSubmit={handleSubmit} className="relative max-w-4xl mx-auto">
        <div className="glass-strong rounded-2xl p-2 transition-all duration-300 focus-within:ring-2 focus-within:ring-blue-500/30">
          <div className="flex items-end gap-3">
            <textarea
              ref={textareaRef}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask me anything about coding..."
              disabled={isLoading}
              rows={1}
              className="flex-1 bg-transparent border-0 text-white placeholder-slate-500 resize-none focus:outline-none focus:ring-0 px-4 py-3 max-h-[200px] custom-scrollbar text-base"
            />
            <Button
              type="submit"
              disabled={!message.trim() || isLoading}
              className="h-12 w-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 btn-glow flex-shrink-0"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Send className="w-5 h-5" />
              )}
            </Button>
          </div>
        </div>
        
        {/* Helper text */}
        <p className="text-center text-xs text-slate-500 mt-3">
          Press <span className="text-slate-400 font-medium">Enter</span> to send, <span className="text-slate-400 font-medium">Shift + Enter</span> for new line
        </p>
      </form>
    </motion.div>
  );
}