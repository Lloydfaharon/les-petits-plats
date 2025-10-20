"use client";

import RecipeCard from "@/components/RecipeCard/RecipeCard";
import recipeData from "@/data/recipes.json";
import FilterDropdown from "@/components/FilterDropdown/FilterDropdown";
import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation"; // 🔹 AJOUT
import styles from "@/app/page.module.css";

export default function Home() {
  const router = useRouter(); // 🔹 AJOUT
  const searchParams = useSearchParams(); // 🔹 AJOUT

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

  // --- Générer les listes uniques ---
  const allIngredients = useMemo(
    () =>
      Array.from(
        new Set(
          recipeData.flatMap((r) =>
            r.ingredients.map((i) => i.ingredient.toLowerCase())
          )
        )
      ),
    []
  );

  const allAppliances = useMemo(
    () => Array.from(new Set(recipeData.map((r) => r.appliance.toLowerCase()))),
    []
  );

  const allUstensils = useMemo(
    () =>
      Array.from(
        new Set(
          recipeData.flatMap((r) => r.ustensils.map((u) => u.toLowerCase()))
        )
      ),
    []
  );

  // --- Gestion des filtres ---
  const toggleFilter = (category: keyof typeof filters, item: string) => {
    setFilters((prev) => ({
      ...prev,
      [category]: prev[category].includes(item)
        ? prev[category].filter((f) => f !== item)
        : [...prev[category], item],
    }));
  };

  // --- Filtrage des recettes ---
  const filteredRecipes = recipeData.filter((recipe) => {
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

  // --- Gestion du count ---
  const recipeCount = filteredRecipes.length;

  // --- Rendu ---
  return (
    <main className="min-h-screen flex flex-col items-center bg-gray-100 p-8">
      {/* Filtres */}
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
          <p>{recipeCount} recette{recipeCount > 1 ? "s" : ""} </p>
        </div>
      </div>

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
