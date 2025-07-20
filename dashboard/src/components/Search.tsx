import { useState, useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "@/data/mockData";
import type { Product } from "@/types";
import { debounce } from "lodash";

export interface SearchResult {
  type: "product";
  data: Product;
  displayText: string;
}

interface SearchProps {
  onSelect?: (suggestion: SearchResult) => void;
}

function Search({ onSelect }: SearchProps) {
  const [searchQueryInput, setSearchQueryInput] = useState("");
  const [searchQuery, setSearchQuery] = useState(searchQueryInput);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  const { data: products = [], isLoading } = useQuery({
    queryKey: ["products", searchQuery],
    queryFn: () => getProducts({ query: searchQuery }),
    gcTime: 1000,
  });

  const suggestions = searchQuery.length
    ? products.slice(0, 10).map((product) => ({
        type: "product" as const,
        data: product,
        displayText: `${product.name} - $${product.price}`,
      }))
    : [];

  const debouncedHandleSearchQueryChange = useRef(
    debounce((query: string) => {
      setSearchQuery(query);
    }, 300)
  ).current;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSuggestionClick = (suggestion: SearchResult) => {
    setSearchQuery(suggestion.displayText);
    setShowSuggestions(false);
    onSelect?.(suggestion);
  };

  return (
    <div className="relative" ref={searchRef}>
      <input
        type="text"
        placeholder="Search products..."
        value={searchQueryInput}
        onChange={(e) => {
          setSearchQueryInput(e.target.value);
          setShowSuggestions(true);
          debouncedHandleSearchQueryChange(e.target.value);
        }}
        onFocus={() => setShowSuggestions(true)}
        className="w-full px-3 py-2 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
      />
      {showSuggestions && (
        <div className="absolute top-full left-0 w-[400px] bg-gray-700 rounded-md shadow-lg z-50 max-h-60 overflow-y-auto">
          {isLoading ? (
            <div className="px-4 py-2 text-gray-400 text-sm">Loading...</div>
          ) : suggestions.length ? (
            <ul>
              {suggestions.map((suggestion, index) => (
                <li key={`${suggestion.type}-${index}`}>
                  <button
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="w-full px-4 py-2 text-left hover:bg-gray-600 transition-colors flex items-center">
                    <span className="text-xs px-2 py-1 rounded mr-2 bg-green-500 text-white">
                      📦
                    </span>
                    <span className="text-sm">{suggestion.displayText}</span>
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <div className="px-4 py-2 text-gray-400 text-sm">
              No products found
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Search;
