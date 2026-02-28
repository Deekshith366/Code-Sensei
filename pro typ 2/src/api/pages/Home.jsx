import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { base44 } from '@/api/base44Client';
import ChatHeader from '@/components/chat/ChatHeader';
import ChatInput from '@/components/chat/ChatInput';
import MessageBubble from '@/components/chat/MessageBubble';
import TypingIndicator from '@/components/chat/TypingIndicator';
import WelcomeScreen from '@/components/chat/WelcomeScreen';
import Footer from '@/components/chat/Footer';

const SYSTEM_PROMPT = `You are an expert Senior Software Engineer and Code Mentor with 15+ years of experience across multiple programming languages and frameworks. Your role is to:

1. **Explain concepts clearly**: Break down complex topics into understandable pieces with real-world analogies when helpful.

2. **Provide clean, production-ready code examples**: Always write well-documented, maintainable code following best practices and industry standards.

3. **Debug effectively**: When reviewing code, identify issues systematically and explain the root cause, not just the fix.

4. **Encourage best practices**: Guide towards SOLID principles, clean code, proper error handling, security considerations, and performance optimization.

5. **Be supportive and encouraging**: Remember that everyone is learning. Be patient and constructive.

Format your responses using markdown:
- Use \`inline code\` for variable names, function names, etc.
- Use code blocks with language specification for code examples
- Use bullet points for lists
- Use bold for emphasis on important points
- Use headings to organize longer responses

Always provide context for why something is done a certain way, not just how.`;

export default function Home() {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [conversationId] = useState(() => `conv_${Date.now()}`);
  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSendMessage = async (content) => {
    const userMessage = { role: 'user', content };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      // Build conversation history for context
      const conversationHistory = messages.map((msg) => ({
        role: msg.role,
        content: msg.content,
      }));

      // Create the prompt with conversation context
      const contextPrompt = conversationHistory.length > 0
        ? `Previous conversation:\n${conversationHistory.map((m) => `${m.role}: ${m.content}`).join('\n')}\n\nUser's new question: ${content}`
        : content;

      const response = await base44.integrations.Core.InvokeLLM({
        prompt: `${SYSTEM_PROMPT}\n\n${contextPrompt}`,
        add_context_from_internet: false,
      });

      const assistantMessage = {
        role: 'assistant',
        content: response,
      };

      setMessages((prev) => [...prev, assistantMessage]);

      // Save messages to database
      await base44.entities.ChatMessage.bulkCreate([
        { conversation_id: conversationId, role: 'user', content },
        { conversation_id: conversationId, role: 'assistant', content: response },
      ]);
    } catch (error) {
      const errorMessage = {
        role: 'assistant',
        content: "I apologize, but I encountered an error processing your request. Please try again. If the issue persists, try refreshing the page.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearChat = () => {
    setMessages([]);
  };

  const handleSuggestionClick = (prompt) => {
    handleSendMessage(prompt);
  };

  return (
    <div className="gradient-bg min-h-screen flex flex-col relative overflow-hidden">
      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 8}s`,
              animationDuration: `${8 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      {/* Header */}
      <ChatHeader onClearChat={handleClearChat} messageCount={messages.length} />

      {/* Main Chat Area */}
      <main className="flex-1 flex flex-col max-w-4xl w-full mx-auto">
        {/* Messages Container */}
        <div
          ref={chatContainerRef}
          className="flex-1 overflow-y-auto custom-scrollbar px-4 md:px-6 py-6"
        >
          {messages.length === 0 ? (
            <WelcomeScreen onSuggestionClick={handleSuggestionClick} />
          ) : (
            <div className="space-y-6">
              <AnimatePresence mode="popLayout">
                {messages.map((message, index) => (
                  <MessageBubble
                    key={index}
                    message={message}
                    isTyping={false}
                  />
                ))}
              </AnimatePresence>

              {/* Typing Indicator */}
              <AnimatePresence>
                {isLoading && <TypingIndicator />}
              </AnimatePresence>

              {/* Scroll anchor */}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="border-t border-white/5 bg-gradient-to-t from-black/20 to-transparent">
          <ChatInput onSend={handleSendMessage} isLoading={isLoading} />
        </div>
      </main>

      <Footer />

      {/* Decorative gradient orbs */}
      <div className="fixed top-1/4 -left-32 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="fixed bottom-1/4 -right-32 w-64 h-64 bg-violet-500/20 rounded-full blur-3xl pointer-events-none" />
    </div>
  );
}