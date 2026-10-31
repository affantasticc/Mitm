import React, { useState } from 'react';
import { useTranslation } from '../i18n/context';
import { chatWithMandiAI } from '../services/gemini';
import { speakText, stopSpeaking } from '../services/speech';
import { Bot, Send, Volume2, X, Sparkles, User, RefreshCw } from 'lucide-react';

interface AIAssistantDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Message {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
}

export const AIAssistantDrawer: React.FC<AIAssistantDrawerProps> = ({ isOpen, onClose }) => {
  const { language, t } = useTranslation();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'init-1',
      sender: 'ai',
      text: language === 'kn'
        ? 'ನಮಸ್ಕಾರ! ನಾನು ಮಂಡಿ AI ಕೃಷಿ ಸಹಾಯಕ. ನಿಮ್ಮ ಬೆಳೆ ಆಯ್ಕೆ, ಮಂಡಿ ದರಗಳು, ರೋಗ ಪತ್ತೆ ಅಥವಾ ಸಾರಿಗೆ ಹಂಚಿಕೆ ಬಗ್ಗೆ ಏನಾದರೂ ಕೇಳಿ.'
        : language === 'hi'
        ? 'नमस्ते! मैं मंडी AI कृषि सहायक हूँ। अपनी फसल, लाइव मंडी भाव, मूल्य पूर्वानुमान या रोग उपचार के बारे में कोई भी प्रश्न पूछें।'
        : 'Welcome! I am your Mandi AI Agronomy & Market Realization Advisor. How can I assist your farm today?',
      timestamp: 'Just now'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const quickQuestions = [
    t.ai.suggested1,
    t.ai.suggested2,
    t.ai.suggested3
  ];

  const handleSend = async (textToSend?: string) => {
    const query = (textToSend || inputText).trim();
    if (!query || isLoading) return;

    const userMsg: Message = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsLoading(true);

    try {
      const history = messages.map(m => ({
        role: m.sender === 'user' ? ('user' as const) : ('model' as const),
        parts: [{ text: m.text }]
      }));

      const reply = await chatWithMandiAI(query, language, history);
      const aiMsg: Message = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, aiMsg]);
    } catch (err) {
      console.error(err);
      const errorMsg: Message = {
        id: `ai-err-${Date.now()}`,
        sender: 'ai',
        text: 'Sorry, I encountered an issue processing your query. Please retry.',
        timestamp: 'Just now'
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSpeech = (text: string) => {
    speakText(text, language);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full sm:w-96 md:w-[440px] bg-white shadow-2xl border-l border-slate-200 flex flex-col">
      {/* Drawer Header */}
      <div className="px-5 py-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-emerald-700 flex items-center justify-center text-white shadow-xs">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 text-sm">{t.ai.assistantTitle}</h3>
            <div className="flex items-center gap-1.5 text-xs text-slate-500">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              <span>Grounded in AGMARKNET & ICAR</span>
            </div>
          </div>
        </div>
        <button
          onClick={() => {
            stopSpeaking();
            onClose();
          }}
          className="text-slate-400 hover:text-slate-700 p-1.5 rounded-lg hover:bg-slate-200 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4">
        {messages.map(msg => (
          <div
            key={msg.id}
            className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {msg.sender === 'ai' && (
              <div className="w-7 h-7 rounded-lg bg-emerald-700 text-white flex items-center justify-center shrink-0 text-xs mt-1">
                <Bot className="w-4 h-4" />
              </div>
            )}
            <div
              className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                msg.sender === 'user'
                  ? 'bg-emerald-700 text-white rounded-br-none'
                  : 'bg-slate-100 text-slate-800 rounded-bl-none border border-slate-200/60'
              }`}
            >
              <div className="whitespace-pre-line">{msg.text}</div>
              <div
                className={`mt-1.5 text-[10px] flex items-center justify-between gap-3 ${
                  msg.sender === 'user' ? 'text-emerald-100' : 'text-slate-400'
                }`}
              >
                <span>{msg.timestamp}</span>
                {msg.sender === 'ai' && (
                  <button
                    onClick={() => handleSpeech(msg.text)}
                    className="flex items-center gap-1 hover:text-emerald-700 font-medium cursor-pointer"
                    title="Read aloud"
                  >
                    <Volume2 className="w-3 h-3" />
                    <span>Listen</span>
                  </button>
                )}
              </div>
            </div>
            {msg.sender === 'user' && (
              <div className="w-7 h-7 rounded-lg bg-slate-800 text-white flex items-center justify-center shrink-0 text-xs mt-1">
                <User className="w-4 h-4" />
              </div>
            )}
          </div>
        ))}

        {isLoading && (
          <div className="flex gap-2.5 items-center text-slate-500 text-xs py-2">
            <RefreshCw className="w-4 h-4 animate-spin text-emerald-600" />
            <span>Consulting APMC price trends & agricultural research...</span>
          </div>
        )}
      </div>

      {/* Suggested prompt chips */}
      <div className="px-4 py-2 border-t border-slate-100 bg-slate-50 flex flex-col gap-1.5">
        <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
          Suggested Questions:
        </span>
        <div className="flex flex-col gap-1">
          {quickQuestions.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(q)}
              className="text-left text-xs text-slate-700 hover:text-emerald-800 hover:bg-emerald-50 px-2 py-1.5 rounded transition-colors truncate border border-slate-200 bg-white cursor-pointer"
            >
              {q}
            </button>
          ))}
        </div>
      </div>

      {/* Input bar */}
      <div className="p-3 border-t border-slate-200 bg-white">
        <form
          onSubmit={e => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            value={inputText}
            onChange={e => setInputText(e.target.value)}
            placeholder={t.ai.placeholder}
            className="flex-1 px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white"
          />
          <button
            type="submit"
            disabled={!inputText.trim() || isLoading}
            className="p-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white disabled:opacity-50 transition-colors shadow-xs cursor-pointer"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
