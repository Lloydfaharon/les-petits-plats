"use client";

import RecipeCard from "@/components/RecipeCard/RecipeCard";
import recipeData from "@/data/recipes.json";
import FilterDropdown from "@/components/FilterDropdown/FilterDropdown";
import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import styles from "@/app/page.module.css";
import SearchBar from "@/components/SearchBar/SearchBar";

type PageProps = {
  searchQuery?: string;
};

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();

  // --- Initialisation depuis l'URL ---
  const [filters, setFilters] = useState({
    Ingrédients: searchParams.get("ingredients")?.split(",") || [],
    Appareils: searchParams.get("appareils")?.split(",") || [],
    Ustensiles: searchParams.get("ustensiles")?.split(",") || [],
  });

  // --- Sync URL quand les filtres changent ---
  useEffect(() => {
    const params = new URLSearchParams();

    if (filters.Ingrédients.length > 0)
      params.set("ingredients", filters.Ingrédients.join(","));
    if (filters.Appareils.length > 0)
      params.set("appareils", filters.Appareils.join(","));
    if (filters.Ustensiles.length > 0)
      params.set("ustensiles", filters.Ustensiles.join(","));

    router.replace(`?${params.toString()}`);
  }, [filters, router]);

  // --- Normalisation (accents / majuscules) ---
  const normalize = (str: string) =>
    str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

  //  ÉTAPE 1 — Filtrage principal par recherche texte
  const searchFilteredRecipes = useMemo(() => {
    const normalizedQuery = normalize(searchQuery);

    // Si moins de 3 caractères → toutes les recettes
    if (normalizedQuery.length < 3) {
      return recipeData;
    }

    // Recherche dans plusieurs champs
    return recipeData.filter((recipe) => {
      return (
        normalize(recipe.name).includes(normalizedQuery) ||
        normalize(recipe.description).includes(normalizedQuery) ||
        recipe.ingredients.some((ing) =>
          normalize(ing.ingredient).includes(normalizedQuery)
        ) ||
        normalize(recipe.appliance).includes(normalizedQuery) ||
        recipe.ustensils.some((ust) => normalize(ust).includes(normalizedQuery))
      );
    });
  }, [searchQuery]);

  //  ÉTAPE 2 — Génération dynamique des filtres à partir des résultats
  const allIngredients = useMemo(
    () =>
      Array.from(
        new Set(
          searchFilteredRecipes.flatMap((r) =>
            r.ingredients.map((i) => i.ingredient.toLowerCase())
          )
        )
      ),
    [searchFilteredRecipes]
  );

  const allAppliances = useMemo(
    () =>
      Array.from(
        new Set(searchFilteredRecipes.map((r) => r.appliance.toLowerCase()))
      ),
    [searchFilteredRecipes]
  );

  const allUstensils = useMemo(
    () =>
      Array.from(
        new Set(
          searchFilteredRecipes.flatMap((r) =>
            r.ustensils.map((u) => u.toLowerCase())
          )
        )
      ),
    [searchFilteredRecipes]
  );

  // --- Gestion des filtres secondaires ---
  const toggleFilter = (category: keyof typeof filters, item: string) => {
    setFilters((prev) => ({
      ...prev,
      [category]: prev[category].includes(item)
        ? prev[category].filter((f) => f !== item)
        : [...prev[category], item],
    }));
  };

  // ÉTAPE 3 — Filtrage final (tags + recherche)
  const filteredRecipes = searchFilteredRecipes.filter((recipe) => {
    const matchIngredients =
      filters.Ingrédients.length === 0 ||
      filters.Ingrédients.every((ing) =>
        recipe.ingredients.some(
          (rIng) => rIng.ingredient.toLowerCase() === ing.toLowerCase()
        )
      );

    const matchAppliances =
      filters.Appareils.length === 0 ||
      filters.Appareils.includes(recipe.appliance.toLowerCase());

    const matchUstensils =
      filters.Ustensiles.length === 0 ||
      filters.Ustensiles.every((ust) =>
        recipe.ustensils.map((u) => u.toLowerCase()).includes(ust.toLowerCase())
      );

    return matchIngredients && matchAppliances && matchUstensils;
  });

  // --- Compteur ---
  const recipeCount = filteredRecipes.length;

  // --- Rendu ---
  return (
    <main className=" relative min-h-screen flex flex-col items-center bg-gray-100 p-8">
      {/* ✅ Message de recherche 
      {searchQuery.length > 0 && (
        <div style={{ marginBottom: "20px", textAlign: "center" }}>
          {searchQuery.length < 3 ? (
            <p style={{ color: "#f59e0b", fontWeight: 500, fontSize: "14px" }}>
              ⚠️ Entrez au moins 3 caractères pour lancer la recherche (
              {3 - searchQuery.length} restant
              {3 - searchQuery.length > 1 ? "s" : ""})
            </p>
          ) : (
            <p style={{ color: "#059669", fontWeight: 500, fontSize: "14px" }}>
              ✓ Recherche active : "{searchQuery}" –{" "}
              {searchFilteredRecipes.length} recette
              {searchFilteredRecipes.length > 1 ? "s" : ""} trouvée
            </p>
          )}
        </div>
      )}*/}

      {/* Filtres */}
      <div className={styles.searchbox} >
        <SearchBar onChange={setSearchQuery} />
      </div>
        
      <div className={styles.mainfilter}>
       
        <div className={styles.boxfilter}>
          <div>
            <FilterDropdown
              title="Ingrédients"
              options={allIngredients}
              selected={filters.Ingrédients}
              onSelect={(item) => toggleFilter("Ingrédients", item)}
              onRemove={(item) => toggleFilter("Ingrédients", item)}
            />
          </div>

          <div>
            <FilterDropdown
              title="Appareils"
              options={allAppliances}
              selected={filters.Appareils}
              onSelect={(item) => toggleFilter("Appareils", item)}
              onRemove={(item) => toggleFilter("Appareils", item)}
            />
          </div>
          <div>
            <FilterDropdown
              title="Ustensiles"
              options={allUstensils}
              selected={filters.Ustensiles}
              onSelect={(item) => toggleFilter("Ustensiles", item)}
              onRemove={(item) => toggleFilter("Ustensiles", item)}
            />
          </div>
        </div>

        <div className={styles.count}>
          <p>
            {recipeCount} recette{recipeCount > 1 ? "s" : ""}
          </p>
        </div>
      </div>

      {/* Aucune recette trouvée 
      {filteredRecipes.length === 0 && searchQuery.length >= 3 && (
        <div
          style={{
            marginTop: "20px",
            padding: "20px",
            background: "#fef2f2",
            border: "1px solid #fecaca",
            borderRadius: "8px",
            color: "#991b1b",
            textAlign: "center",
            fontSize: "14px",
          }}
        >
          Aucune recette ne correspond à votre recherche "{searchQuery}".
        </div>
      )}*/}

      {/* Cartes de recettes */}
      <div className={styles.mainpad}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredRecipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      </div>
    </main>
  );
}