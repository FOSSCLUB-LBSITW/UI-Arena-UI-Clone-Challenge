import React, { useState } from 'react';
import { HELP_FAQS } from '../data/mockData';
import { HelpCircle, ChevronDown, ChevronUp, MessageSquare, PhoneCall, Send, X, Bot } from 'lucide-react';

export const HelpPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('Orders');
  const [openFaqId, setOpenFaqId] = useState<string | null>('f1');
  const [liveChatOpen, setLiveChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<Array<{ sender: 'bot' | 'user'; text: string }>>([
    { sender: 'bot', text: 'Hello! I am Swiggy Support Bot. How can I help with your order today?' }
  ]);
  const [chatInput, setChatInput] = useState('');

  const categories = ['Orders', 'Payment & Swiggy Money', 'Account & Swiggy One', 'General Enquiries'];

  const filteredFaqs = HELP_FAQS.filter(f => f.category === selectedCategory);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userText = chatInput;
    setChatMessages(prev => [...prev, { sender: 'user', text: userText }]);
    setChatInput('');

    setTimeout(() => {
      setChatMessages(prev => [
        ...prev,
        {
          sender: 'bot',
          text: `Thanks for writing. Our support executive is reviewing your query regarding "${userText}". Refunds or updates will reflect automatically.`
        }
      ]);
    }, 1000);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 pb-28">
      
      {/* Top Banner */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 mb-8 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-orange-400 uppercase tracking-wider mb-2">
            <HelpCircle className="w-4 h-4" />
            <span>Swiggy Help Desk</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Help & Support Center
          </h1>
          <p className="text-xs text-slate-300 mt-1">
            Let's help you with your order issues, payments or general enquiries.
          </p>
        </div>

        <button
          onClick={() => setLiveChatOpen(true)}
          className="px-6 py-3.5 bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-xs uppercase tracking-wider rounded-2xl shadow-lg shadow-orange-500/25 transition-all cursor-pointer flex items-center gap-2 shrink-0"
        >
          <MessageSquare className="w-4 h-4" />
          <span>Chat with Support</span>
        </button>
      </div>

      {/* Main Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        
        {/* Sidebar Categories */}
        <div className="md:col-span-4 space-y-2">
          <h3 className="font-extrabold text-slate-900 text-sm mb-3">Support Categories</h3>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`w-full p-4 rounded-2xl text-left font-bold text-xs transition-all cursor-pointer border ${
                selectedCategory === cat
                  ? 'bg-orange-50 border-orange-500 text-orange-600 shadow-2xs'
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* FAQs Accordions */}
        <div className="md:col-span-8 bg-white rounded-3xl p-6 border border-slate-200/80 shadow-2xs">
          <h2 className="text-xl font-black text-slate-900 mb-4">{selectedCategory} FAQs</h2>
          
          <div className="divide-y divide-slate-100">
            {filteredFaqs.map(faq => {
              const isOpen = openFaqId === faq.id;
              return (
                <div key={faq.id} className="py-4">
                  <button
                    onClick={() => setOpenFaqId(isOpen ? null : faq.id)}
                    className="w-full flex items-center justify-between text-left group cursor-pointer"
                  >
                    <span className="font-extrabold text-slate-900 text-sm group-hover:text-orange-600 transition-colors">
                      {faq.question}
                    </span>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-orange-500 shrink-0 ml-2" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-400 shrink-0 ml-2" />
                    )}
                  </button>

                  {isOpen && (
                    <p className="text-xs text-slate-600 mt-3 leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-200/60">
                      {faq.answer}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* Live Chat Support Modal */}
      {liveChatOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-100 overflow-hidden relative flex flex-col h-[500px]">
            
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center">
                  <Bot className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-extrabold text-slate-900 text-sm">Swiggy Live Support</h3>
                  <p className="text-[10px] text-emerald-600 font-bold">● Online • Responds instantly</p>
                </div>
              </div>
              <button
                onClick={() => setLiveChatOpen(false)}
                className="p-1.5 rounded-full hover:bg-slate-100 text-slate-500 hover:text-slate-900"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto py-4 space-y-3 pr-1">
              {chatMessages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl text-xs ${
                      msg.sender === 'user'
                        ? 'bg-orange-500 text-white font-medium rounded-tr-none'
                        : 'bg-slate-100 text-slate-800 font-medium rounded-tl-none'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Chat Input */}
            <form onSubmit={handleSendMessage} className="pt-3 border-t border-slate-100 flex gap-2">
              <input
                type="text"
                placeholder="Type your message..."
                value={chatInput}
                onChange={e => setChatInput(e.target.value)}
                className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-hidden focus:border-orange-500"
              />
              <button
                type="submit"
                className="p-2.5 bg-orange-500 hover:bg-orange-600 text-white rounded-xl cursor-pointer"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>

          </div>
        </div>
      )}

    </div>
  );
};
