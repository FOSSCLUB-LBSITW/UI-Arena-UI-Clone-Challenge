import { Search } from 'lucide-react';

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBar({ value, onChange }: Props) {
  return (
    <div className="relative">
      <Search size={20} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-faint" />
      <input
        autoFocus
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search for restaurants and food"
        className="w-full rounded-lg border border-line py-3.5 pl-12 pr-4 text-base text-ink placeholder:text-ink-faint focus:border-ink-faint focus:outline-none"
      />
    </div>
  );
}
