import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import type { HelpQuestion } from '../../types';

export default function FAQAccordion({ questions }: { questions: HelpQuestion[] }) {
  const [openId, setOpenId] = useState<string | null>(questions[0]?.id ?? null);

  return (
    <div className="flex-1">
      {questions.map((q) => {
        const isOpen = openId === q.id;
        return (
          <div key={q.id} className="border-b border-line">
            <button
              onClick={() => setOpenId(isOpen ? null : q.id)}
              className="flex w-full items-center justify-between gap-4 py-4 text-left"
            >
              <span className="text-[15px] font-medium text-ink">{q.question}</span>
              <ChevronDown
                size={18}
                className={`shrink-0 text-ink-light transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
              />
            </button>
            {isOpen && (
              <p className="animate-slide-up pb-4 text-sm font-medium text-brand">{q.answer}</p>
            )}
          </div>
        );
      })}
    </div>
  );
}
