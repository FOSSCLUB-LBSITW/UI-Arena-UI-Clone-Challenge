import { useMemo, useState } from 'react';
import { helpCategories, helpQuestions } from '../../data/help';
import HelpSidebar from '../../components/HelpSidebar/HelpSidebar';
import FAQAccordion from '../../components/FAQAccordion/FAQAccordion';

export default function Help() {
  const [activeId, setActiveId] = useState(helpCategories[0].id);

  const questions = useMemo(
    () => helpQuestions.filter((q) => q.categoryId === activeId),
    [activeId]
  );

  const activeCategory = helpCategories.find((c) => c.id === activeId);

  return (
    <div className="pb-20">
      <div className="bg-help px-4 py-10 sm:px-6 sm:py-14">
        <div className="mx-auto max-w-[1100px]">
          <h1 className="text-3xl font-extrabold text-white sm:text-4xl">Help &amp; Support</h1>
          <p className="mt-2 text-sm text-white/80 sm:text-base">
            Let's take a step ahead and help you better.
          </p>
        </div>
      </div>

      <div className="mx-auto -mt-6 max-w-[1100px] px-4 sm:px-6">
        <div className="rounded-2xl bg-white p-4 shadow-pop sm:p-8">
          <div className="flex flex-col gap-6 sm:flex-row">
            <HelpSidebar categories={helpCategories} activeId={activeId} onSelect={setActiveId} />
            <div className="flex-1">
              <h2 className="text-lg font-bold text-ink">{activeCategory?.name}</h2>
              <div className="mt-2">
                <FAQAccordion questions={questions} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
