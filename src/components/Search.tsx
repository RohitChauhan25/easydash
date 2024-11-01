import React from "react"; // Make sure to import React
import { IoMdSearch } from "react-icons/io";

interface SearchProps {
  callback: (searchQuery: string) => void; // Change to accept a string
}

const Search: React.FC<SearchProps> = ({ callback }) => {
  /* Debounce function */
  function debounce<F extends (...args: any[]) => void>(
    func: F,
    delay: number
  ): (...args: Parameters<F>) => void {
    let timeout: ReturnType<typeof setTimeout> | null = null;

    return (...args: Parameters<F>) => {
      if (timeout) clearTimeout(timeout);

      timeout = setTimeout(() => {
        func(...args);
        timeout = null; // Reset timeout to allow future calls
      }, delay);
    };
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Call the debounced callback with the input value
    const value = event.target.value;
    debouncedCallback(value);
  };

  const debouncedCallback = debounce(callback, 1000); // Create debounced version of the callback

  return (
    <div className="search-wrapper">
      <IoMdSearch size={20} />
      <input type="text" onChange={handleInputChange} placeholder="Search..." />
    </div>
  );
};

export default Search;
