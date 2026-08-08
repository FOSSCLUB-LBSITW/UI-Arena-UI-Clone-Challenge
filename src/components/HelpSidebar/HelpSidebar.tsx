import type { HelpCategory } from '../../types';

interface Props {
  categories: HelpCategory[];
  activeId: string;
  onSelect: (id: string) => void;
}

export default function HelpSidebar({ categories, activeId, onSelect }: Props) {
  return (
    <nav className="rounded-xl bg-surface p-2 sm:w-64 sm:shrink-0">
      <ul className="flex gap-1 overflow-x-auto sm:flex-col sm:overflow-visible">
        {categories.map((cat) => (
          <li key={cat.id} className="shrink-0 sm:shrink">
            <button
              onClick={() => onSelect(cat.id)}
              className={`w-full whitespace-nowrap rounded-lg px-4 py-3 text-left text-sm font-medium transition ${
                activeId === cat.id ? 'bg-white text-ink shadow-card' : 'text-ink-light hover:text-ink'
              }`}
            >
              {cat.name}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
