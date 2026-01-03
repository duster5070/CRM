import { Search } from "lucide-react";
import React, { useState } from "react";

export default function SearchBar({
  data,
  onSearch,
  setIsSearch,
}: {
  data: any[];
  onSearch: any;
  setIsSearch: any;
}) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    const filteredData = data.filter((item: any) =>
      Object.values(item).some(
        (value: any) =>
          value && value.toString().toLowerCase().includes(e.target.value.toLowerCase()),
      ),
    );
    setIsSearch(true);
    onSearch(filteredData);
  };
  return (
    <div className="flex w-full items-center justify-between gap-8">
      <div className="relativeclea mt-2">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <Search className="h-4 w-4 text-slate-300" />
        </div>
        <input
          id="search"
          name="search"
          type="text"
          placeholder="Search Projects"
          autoComplete="search"
          value={searchTerm}
          onChange={handleSearch}
          className="block w-full rounded-md border-0 py-1.5 pl-8 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 dark:bg-black dark:ring-[#292929] dark:focus:ring-white sm:text-sm sm:leading-6"
        />
      </div>
    </div>
  );
}
