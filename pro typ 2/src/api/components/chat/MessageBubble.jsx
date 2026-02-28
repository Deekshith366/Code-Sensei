import React from 'react';
import { motion } from 'framer-motion';
import { User, Bot, Sparkles } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import CodeBlock from './CodeBlock';

export default function MessageBubble({ message, isTyping }) {
  const isUser = message.role === 'user';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className={`flex gap-4 ${isUser ? 'flex-row-reverse' : 'flex-row'} message-animate`}
    >
      {/* Avatar */}
      <div className={`flex-shrink-0 ${isUser ? 'ml-2' : 'mr-2'}`}>
        <div
          className={`w-10 h-10 rounded-xl flex items-center justify-center ${
            isUser
              ? 'bg-gradient-to-br from-blue-500 to-blue-600 glow-blue'
              : 'bg-gradient-to-br from-violet-500 to-purple-600 glow-purple'
          }`}
        >
          {isUser ? (
            <User className="w-5 h-5 text-white" />
          ) : (
            <Bot className="w-5 h-5 text-white" />
          )}
        </div>
      </div>

      {/* Message Content */}
      <div
        className={`flex-1 max-w-[85%] ${isUser ? 'flex justify-end' : ''}`}
      >
        <div
          className={`rounded-2xl px-5 py-4 ${
            isUser
              ? 'bg-gradient-to-br from-blue-500/20 to-blue-600/10 border border-blue-500/20'
              : 'glass-strong'
          }`}
        >
          {/* Label */}
          <div className="flex items-center gap-2 mb-2">
            <span className={`text-xs font-semibold ${isUser ? 'text-blue-400' : 'text-violet-400'}`}>
              {isUser ? 'You' : 'Code Sensei'}
            </span>
            {!isUser && (
              <Sparkles className="w-3 h-3 text-violet-400" />
            )}
          </div>

          {/* Content */}
          <div className={`prose prose-invert prose-sm max-w-none ${isTyping ? 'typing-cursor' : ''}`}>
            <ReactMarkdown
              components={{
                code({ node, inline, className, children, ...props }) {
                  const match = /language-(\w+)/.exec(className || '');
                  const codeContent = String(children).replace(/\n$/, '');
                  
                  if (!inline && (match || codeContent.includes('\n'))) {
                    return (
                      <CodeBlock
                        code={codeContent}
                        language={match ? match[1] : 'code'}
                      />
                    );
                  }
                  
                  return (
                    <code
                      className="bg-blue-500/15 text-blue-300 px-1.5 py-0.5 rounded text-sm font-mono"
                      {...props}
                    >
                      {children}
                    </code>
                  );
                },
                p({ children }) {
                  return <p className="mb-3 last:mb-0 leading-relaxed text-slate-200">{children}</p>;
                },
                ul({ children }) {
                  return <ul className="list-disc list-inside mb-3 space-y-1 text-slate-200">{children}</ul>;
                },
                ol({ children }) {
                  return <ol className="list-decimal list-inside mb-3 space-y-1 text-slate-200">{children}</ol>;
                },
                li({ children }) {
                  return <li className="text-slate-200">{children}</li>;
                },
                h1({ children }) {
                  return <h1 className="text-xl font-bold text-white mb-3">{children}</h1>;
                },
                h2({ children }) {
                  return <h2 className="text-lg font-bold text-white mb-2">{children}</h2>;
                },
                h3({ children }) {
                  return <h3 className="text-base font-semibold text-white mb-2">{children}</h3>;
                },
                blockquote({ children }) {
                  return (
                    <blockquote className="border-l-2 border-violet-500 pl-4 my-3 text-slate-300 italic">
                      {children}
                    </blockquote>
                  );
                },
                a({ href, children }) {
                  return (
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:text-blue-300 underline underline-offset-2"
                    >
                      {children}
                    </a>
                  );
                },
                strong({ children }) {
                  return <strong className="font-semibold text-white">{children}</strong>;
                },
                em({ children }) {
                  return <em className="text-slate-300">{children}</em>;
                },
              }}
            >
              {message.content}
            </ReactMarkdown>
          </div>
        </div>
      </div>
    </motion.div>
  );
}