import { useState } from "react";
import { helpTopics } from "../data/restaurants";

export default function Help() {
  const [openId, setOpenId] = useState(null);

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 pb-16">
      <h1 className="text-2xl font-bold text-swiggy-dark">Help Centre</h1>
      <p className="text-swiggy-gray text-sm mt-1">
        Find answers to common questions, or reach out to us directly.
      </p>

      <div className="mt-6 space-y-3">
        {helpTopics.map((topic) => {
          const isOpen = openId === topic.id;
          return (
            <div key={topic.id} className="border border-swiggy-border rounded-xl overflow-hidden">
              <button
                onClick={() => setOpenId(isOpen ? null : topic.id)}
                className="w-full flex items-center justify-between px-5 py-4 text-left font-semibold text-swiggy-dark"
              >
                {topic.title}
                <span className={`transition-transform ${isOpen ? "rotate-180" : ""}`}>⌄</span>
              </button>
              {isOpen && (
                <ul className="px-5 pb-4 space-y-2">
                  {topic.items.map((item) => (
                    <li
                      key={item}
                      className="text-sm text-swiggy-gray hover:text-swiggy-orange cursor-pointer"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-10 bg-swiggy-lightGray rounded-xl p-6 text-center">
        <h2 className="font-bold text-swiggy-dark">Still need help?</h2>
        <p className="text-sm text-swiggy-gray mt-1">Our support team is here for you.</p>
        <button className="mt-4 bg-swiggy-orange text-white font-semibold px-6 py-2.5 rounded-lg hover:bg-swiggy-orangeDark">
          Chat with us
        </button>
      </div>
    </div>
  );
}
