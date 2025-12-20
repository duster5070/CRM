import { useMemo, useState } from "react";
import * as FaIcons from "react-icons/fa";
import { IconType } from "react-icons";

type IconName = keyof typeof FaIcons;

interface IconInputProps {
  value?: IconName;
  onChange: (icon: IconName) => void;
}

export default function IconInput({ value, onChange }: IconInputProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  const icons = useMemo(
    () =>
      (Object.keys(FaIcons) as IconName[]).filter((name) =>
        name.toLowerCase().includes(query.toLowerCase())
      ),
    [query]
  );

  const SelectedIcon: IconType | null = value ? FaIcons[value] : null;

  return (
    <div className="relative inline-block">
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 rounded border px-3 py-2 text-sm hover:bg-gray-100"
      >
        {SelectedIcon ? <SelectedIcon size={18} /> : "Add icon"}
      </button>

      {open && (
        <div className="absolute z-50 mt-2 w-72 rounded border bg-white p-3 shadow-lg">
          <input
            type="text"
            placeholder="Search icon..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="mb-2 w-full rounded border px-2 py-1 text-sm focus:outline-none focus:ring"
          />

          <div className="grid max-h-52 grid-cols-6 gap-2 overflow-auto">
            {icons.map((iconName) => {
              const Icon = FaIcons[iconName];
              return (
                <button
                  key={iconName}
                  type="button"
                  onClick={() => {
                    onChange(iconName);
                    setOpen(false);
                    setQuery("");
                  }}
                  className="rounded p-2 hover:bg-gray-100"
                >
                  <Icon size={18} />
                </button>
              );
            })}
          </div>

          <button
            type="button"
            onClick={() => setOpen(false)}
            className="mt-2 w-full text-xs text-gray-500 hover:text-black"
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
}
