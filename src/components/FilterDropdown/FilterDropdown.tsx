"use client";

import { useState } from "react";
import { ChevronDown, Search, X } from "lucide-react";
import styles from "@/app/page.module.css";

interface FilterDropdownProps {
  title: "Ingrédients" | "Appareils" | "Ustensiles";
  options: string[];
  selected: string[];
  onSelect: (item: string) => void;
  onRemove: (item: string) => void;
}

export default function FilterDropdown({
  title,
  options,
  selected,
  onSelect,
  onRemove,
}: FilterDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");

  // Filtrer les options : exclure celles déjà sélectionnées ET filtrer par recherche
  const filteredOptions = options.filter((opt) => {
    const notSelected = !selected.includes(opt.toLowerCase());
    const matchesSearch = opt.toLowerCase().includes(search.toLowerCase());
    return notSelected && matchesSearch;
  });

  return (
    <div className={styles.dropdownContainer}>
      {/* Wrapper du bouton avec bordures conditionnelles */}
      <div className={`${styles.dropdownWrapper} ${isOpen ? styles.open : styles.closed}`}>
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className={styles.dropdownButton}
        >
          {title}
          <ChevronDown className={`${styles.chevron} ${isOpen ? styles.open : ""}`} />
        </button>

        {/* Menu déroulant */}
        {isOpen && (
          <div className={styles.dropdownMenu}>
            {/* Champ de recherche */}
            <div className={styles.searchContainer}>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className={styles.searchInput}
                autoComplete="off"
                spellCheck="false"
                aria-label="search"
              />
              {search && (
                <X onClick={() => setSearch("")} className={styles.clearIcon} />
              )}
              <Search className={styles.searchIcon} />
            </div>

            {/* Liste d'options */}
            <ul className={styles.optionsList}>
              {filteredOptions.length > 0 ? (
                filteredOptions.map((opt) => (
                  <li
                    key={opt}
                    onClick={() => {
                      onSelect(opt);
                      setSearch("");
                    }}
                    className={styles.optionItem}
                  >
                    {opt}
                  </li>
                ))
              ) : (
                <li className={styles.noResults}>Aucun résultat</li>
              )}
            </ul>
          </div>
        )}
      </div>

      {/* Tags sélectionnés */}
      {selected.length > 0 && (
        <div className={styles.tagsContainer}>
          {selected.map((item) => (
            <div key={item} className={styles.tag}>
              {item}
              <X onClick={() => onRemove(item)} className={styles.tagClose} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}