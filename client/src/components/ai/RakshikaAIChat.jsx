import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles, Shield, AlertCircle, Compass, ShieldCheck } from 'lucide-react';
import { GlassCard } from '../ui/GlassCard';
import { Button } from '../ui/Button';
import { apiService } from '../../services/api';
import { AIAssistantIllustration } from '../../assets/illustrations/3DIllustrations';

export const RakshikaAIChat = ({ className = '' }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: 'assistant',
      content: `Hello! I am **Rakshika AI**, your 24/7 personal safety and travel companion.

I can help you:
• Prepare for late-night journeys & cab safety checklists
• Guide you if you feel followed or uncomfortable
• Explain community safety reports and high-risk zones
• Share proactive situational awareness tips

*How can I help support your journey today?*`
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const chatBottomRef = useRef(null);

  const presetQuestions = [
    'What should I do if I feel followed?',
    'Help me prepare for a late-night journey.',
    'Is this area reported as unsafe?',
    'How are community reports verified?'
  ];

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const handleSend = async (textToSend) => {
    const text = textToSend || input;
    if (!text.trim()) return;

    const userMessage = { id: Date.now(), role: 'user', content: text };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const reply = await apiService.askAI(text, messages);
      setMessages(prev => [...prev, { id: Date.now() + 1, role: 'assistant', content: reply }]);
    } catch (e) {
      setMessages(prev => [
        ...prev,
        {
          id: Date.now() + 1,
          role: 'assistant',
          content: 'I had a momentary connection issue. For immediate emergencies, please dial **112** or activate your SOS button.'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const formatMessageContent = (content) => {
    // Basic Markdown bullet and bold formatting helper
    return content.split('\n').map((line, idx) => {
      if (line.startsWith('### ')) {
        return <h4 key={idx} className="font-extrabold text-sm text-slate-900 mt-2 mb-1">{line.replace('### ', '')}</h4>;
      }
      if (line.startsWith('- ') || line.startsWith('• ')) {
        return (
          <li key={idx} className="ml-4 list-disc text-xs text-slate-700 leading-relaxed my-0.5">
            {line.replace(/^[-•]\s*/, '')}
          </li>
        );
      }
      if (line.match(/^\d+\.\s/)) {
        return (
          <p key={idx} className="text-xs text-slate-700 leading-relaxed my-1 font-medium">
            {line}
          </p>
        );
      }
      return (
        <p key={idx} className="text-xs text-slate-700 leading-relaxed my-1">
          {line}
        </p>
      );
    });
  };

  return (
    <div className={`flex flex-col h-full ${className}`}>
      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto space-y-4 pr-1 p-2">
        {messages.map((msg) => {
          const isAssistant = msg.role === 'assistant';
          return (
            <div
              key={msg.id}
              className={`flex items-start gap-3 ${isAssistant ? '' : 'flex-row-reverse'}`}
            >
              <div
                className={`w-9 h-9 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-sm ${
                  isAssistant
                    ? 'bg-gradient-to-tr from-primary-600 to-indigo-500 text-white'
                    : 'bg-gradient-to-tr from-teal-500 to-emerald-600 text-white'
                }`}
              >
                {isAssistant ? <Bot className="w-5 h-5" /> : <User className="w-5 h-5" />}
              </div>

              <div
                className={`max-w-[85%] sm:max-w-[78%] rounded-3xl p-4 shadow-sm ${
                  isAssistant
                    ? 'bg-white/95 border border-slate-200/80 text-slate-800'
                    : 'bg-primary-600 text-white shadow-primary-500/20'
                }`}
              >
                {isAssistant ? (
                  formatMessageContent(msg.content)
                ) : (
                  <p className="text-xs text-white leading-relaxed">{msg.content}</p>
                )}
              </div>
            </div>
          );
        })}

        {loading && (
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-2xl bg-primary-600 text-white flex items-center justify-center">
              <Bot className="w-5 h-5" />
            </div>
            <div className="bg-white/95 border border-slate-200/80 rounded-3xl p-4 flex items-center gap-2 text-xs text-slate-500">
              <Sparkles className="w-4 h-4 text-primary-600 animate-spin" />
              <span>Rakshika AI is evaluating safety guidelines...</span>
            </div>
          </div>
        )}

        <div ref={chatBottomRef} />
      </div>

      {/* Preset Suggestions */}
      <div className="pt-3 pb-2">
        <p className="text-[11px] font-bold text-slate-400 mb-1.5 px-1">Common Safety Inquiries:</p>
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {presetQuestions.map((q, i) => (
            <button
              key={i}
              onClick={() => handleSend(q)}
              className="px-3 py-1.5 rounded-xl bg-white/80 hover:bg-white text-slate-700 hover:text-primary-700 border border-slate-200/70 text-xs font-medium whitespace-nowrap shadow-xs transition-colors"
            >
              {q}
            </button>
          ))}
        </div>
      </div>

      {/* Input Box */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="pt-2 flex items-center gap-2"
      >
        <input
          type="text"
          placeholder="Ask Rakshika AI for guidance or journey prep..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 bg-white/90 border border-slate-200 rounded-2xl px-4 py-3 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 shadow-sm"
        />
        <Button
          type="submit"
          variant="primary"
          disabled={!input.trim() || loading}
          className="rounded-2xl px-4 py-3"
        >
          <Send className="w-4 h-4" />
        </Button>
      </form>
    </div>
  );
};
