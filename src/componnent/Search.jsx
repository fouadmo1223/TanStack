import { useEffect, useState } from "react";

const Search = ({ onSearch }) => {
  const [value, setValue] = useState("");

  useEffect(() => {
    // Debounce search to avoid hitting API on every keystroke
    const timer = setTimeout(() => {
      onSearch(value);
    }, 400);

    return () => clearTimeout(timer);
  }, [value, onSearch]);

  return (
    <div className="relative">
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search content..."
        className="w-full md:w-72 px-5 py-2.5 rounded-[8px] bg-white/[0.03]
                   text-white text-sm border border-white/10
                   placeholder-gray-500 focus:border-blue-500/50 
                   focus:bg-white/[0.06] outline-none transition-all"
      />
      {value && (
        <button
          onClick={() => setValue("")}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
        >
          ✕
        </button>
      )}
    </div>
  );
};

export default Search;
