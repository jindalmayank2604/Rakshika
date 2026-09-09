import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles, Shield, AlertCircle, Compass, ShieldCheck } from 'lucide-react';
import { GlassCard } from '../ui/GlassCard';
import { Button } from '../ui/Button';
import { apiService } from '../../services/api';
import { AiCompanion3D, Shield3D } from '../ui/Illustrations3D';

export const RakshikaAIChat = ({ className = '' }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: 'assistant',
      content: `Hello! I am **WeSafe AI**, your 24/7 proactive personal safety and travel companion.

I can help you:
• **Evaluate Safe Routes**: Check lighting, hazard density, and police presence before heading out
• **Prepare Late-Night Journeys**: Cab verification checklist and live tracking guidance
• **De-escalate Uncomfortable Situations**: Actionable steps if you feel followed or uneasy
• **Understand Community Reports**: Analysis of recent hazards filed near your location

*How can I help protect and empower your journey today?*`
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const chatBottomRef = useRef(null);

  const presetQuestions = [
    'How safe is my late-night transit route?',
    'What should I check before entering a ride-share cab?',
    'What should I do if I suspect I am being followed?',
    'Explain the WeSafe community safety index.'
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
          content: 'I had a momentary connection issue. For immediate emergencies, please dial **112** (National Emergency) or hold down your WeSafe SOS button for 3 seconds.'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const formatMessageContent = (content) => {
    return content.split('\n').map((line, idx) => {
      if (line.startsWith('### ')) {
        return <h4 key={idx} className="font-extrabold text-sm text-wine-plum dark:text-bone mt-2 mb-1">{line.replace('### ', '')}</h4>;
      }
      if (line.startsWith('- ') || line.startsWith('• ')) {
        return (
          <li key={idx} className="ml-4 list-disc text-xs text-wine-plum/90 dark:text-bone/90 leading-relaxed my-0.5">
            {line.replace(/^[-•]\s*/, '')}
          </li>
        );
      }
      if (line.match(/^\d+\.\s/)) {
        return (
          <p key={idx} className="text-xs text-wine-plum/90 dark:text-bone/90 leading-relaxed my-1 font-medium">
            {line}
          </p>
        );
      }
      return (
        <p key={idx} className="text-xs text-wine-plum/90 dark:text-bone/90 leading-relaxed my-1">
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
                    ? 'bg-gradient-to-tr from-wine-plum to-smoky-rose text-bone'
                    : 'bg-gradient-to-tr from-accent to-dust-grey-dark text-bone'
                }`}
              >
                {isAssistant ? <Bot className="w-5 h-5" /> : <User className="w-5 h-5" />}
              </div>

              <div
                className={`max-w-[85%] sm:max-w-[78%] rounded-3xl p-4 shadow-warm-sm ${
                  isAssistant
                    ? 'glass-card border border-dust-grey/60 dark:border-smoky-rose/30 text-wine-plum dark:text-bone'
                    : 'bg-wine-plum text-bone shadow-md'
                }`}
              >
                {isAssistant ? (
                  formatMessageContent(msg.content)
                ) : (
                  <p className="text-xs text-bone leading-relaxed">{msg.content}</p>
                )}
              </div>
            </div>
          );
        })}

        {loading && (
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-2xl bg-wine-plum text-bone flex items-center justify-center">
              <Bot className="w-5 h-5" />
            </div>
            <div className="glass-card border border-dust-grey/60 dark:border-smoky-rose/30 rounded-3xl p-4 flex items-center gap-2 text-xs text-wine-plum dark:text-bone">
              <Sparkles className="w-4 h-4 text-accent animate-spin" />
              <span>WeSafe Gemini AI is evaluating situational safety heuristics...</span>
            </div>
          </div>
        )}

        <div ref={chatBottomRef} />
      </div>

      {/* Preset Suggestions */}
      <div className="pt-3 pb-2">
        <p className="text-[11px] font-bold text-dust-grey-dark dark:text-silver mb-1.5 px-1">Common Safety Inquiries:</p>
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {presetQuestions.map((q, i) => (
            <button
              key={i}
              onClick={() => handleSend(q)}
              className="px-3 py-1.5 rounded-xl glass-card-subtle hover:bg-powder-petal/50 text-wine-plum dark:text-bone border border-dust-grey/60 dark:border-smoky-rose/30 text-xs font-medium whitespace-nowrap shadow-xs transition-colors"
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
          placeholder="Ask WeSafe AI for proactive guidance or route safety prep..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 glass-input rounded-2xl px-4 py-3 text-xs sm:text-sm shadow-sm"
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
