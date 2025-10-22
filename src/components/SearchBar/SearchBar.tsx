"use client";

import { useState, useEffect, useCallback } from "react";
import debounce from "lodash.debounce";

type SearchBarProps = {
  onChange: (value: string) => void;
};

export default function SearchBar({ onChange }: SearchBarProps) {
  const [inputValue, setInputValue] = useState<string>("");

  //  Débounce avec useCallback (plus sûr)
  const debouncedChange = useCallback(
    debounce((value: string) => {
      onChange(value);
    }, 300),
    []
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    debouncedChange(value);
  };

  const clearSearch = () => {
    setInputValue("");     // ← Vide le champ immédiatement
    debouncedChange.cancel(); // ← Annule tout debounce en cours
    onChange("");          // ← Met à jour immédiatement aussi
  };

  //  Nettoyage à la destruction du composant
  useEffect(() => {
    return () => {
      debouncedChange.cancel();
    };
  }, [debouncedChange]);


  return (
    <div className="research">
      <h2 className="text-amber-300 text-center">
        DÉCOUVREZ NOS RECETTES <br />
        DU QUOTIDIEN, SIMPLES ET DÉLICIEUSES
      </h2>

      <div className="mt-8 flex w-[954px] justify-center">
        <div className="text-[15px] w-full flex p-2 rounded-lg overflow-hidden shadow-lg bg-white">
          <input
            value={inputValue} 
            type="text"
            placeholder="Rechercher une recette, un ingrédient, ..."
            className="h-11 flex-grow px-4 py-3 text-black placeholder-gray-500 focus:outline-none"
            onChange={handleChange}
          />
             {inputValue && (
            <button
              onClick={clearSearch}
              className="  text-gray-500 hover:text-gray-800"
              aria-label="Effacer la recherche"
            >
              &#10005;
            </button>
          )}
          <button className="btn group" aria-label="rechercher">
            <svg
              width="49"
              height="49"
              viewBox="0 0 51 53"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                y="0.421875"
                width="51"
                height="52"
                rx="10"
                className="group-hover:fill-yellow-400 fill-black transition"
              />
              <circle
                cx="22"
                cy="22.4219"
                r="9.5"
                className="group-hover:stroke-black stroke-white transition"
              />
              <line
                x1="30.3536"
                y1="31.0683"
                x2="39.3536"
                y2="40.0683"
                className="group-hover:stroke-black stroke-white transition"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}