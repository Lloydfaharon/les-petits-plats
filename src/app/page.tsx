"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import RecipeCard from "@/components/RecipeCard/RecipeCard";
import FilterDropdown from "@/components/FilterDropdown/FilterDropdown";
import SearchBar from "@/components/SearchBar/SearchBar";
import Header from "@/components/Header/Header";

import recipeData from "@/data/recipes.json";
import styles from "@/app/page.module.css";

function HomeContent() {
  const [searchQuery, setSearchQuery] = useState("");

  const router = useRouter();
  const searchParams = useSearchParams();

  // Initialisation des filtres depuis l'URL
  const [filters, setFilters] = useState({
    Ingrédients: searchParams.get("ingredients")?.split(",") || [],
    Appareils: searchParams.get("appareils")?.split(",") || [],
    Ustensiles: searchParams.get("ustensiles")?.split(",") || [],
  });

  // Synchronisation des filtres avec l'URL
  useEffect(() => {
    const params = new URLSearchParams();

    if (filters.Ingrédients.length > 0) {
      params.set("ingredients", filters.Ingrédients.join(","));
    }

    if (filters.Appareils.length > 0) {
      params.set("appareils", filters.Appareils.join(","));
    }

    if (filters.Ustensiles.length > 0) {
      params.set("ustensiles", filters.Ustensiles.join(","));
    }

    const queryString = params.toString();

    router.replace(queryString ? `?${queryString}` : "?");
  }, [filters, router]);

  // Normalisation des textes
  const normalize = (str: string) =>
    str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();

  // Filtrage principal par recherche
  const searchFilteredRecipes = useMemo(() => {
    const normalizedQuery = normalize(searchQuery);

    // Moins de 3 caractères = toutes les recettes
    if (normalizedQuery.length < 3) {
      return recipeData;
    }

    return recipeData.filter((recipe) => {
      return (
        normalize(recipe.name).includes(normalizedQuery) ||
        normalize(recipe.description).includes(normalizedQuery) ||
        recipe.ingredients.some((ing) =>
          normalize(ing.ingredient).includes(normalizedQuery)
        ) ||
        normalize(recipe.appliance).includes(normalizedQuery) ||
        recipe.ustensils.some((ust) =>
          normalize(ust).includes(normalizedQuery)
        )
      );
    });
  }, [searchQuery]);

  // Liste des ingrédients disponibles
  const allIngredients = useMemo(
    () =>
      Array.from(
        new Set(
          searchFilteredRecipes.flatMap((recipe) =>
            recipe.ingredients.map((ingredient) =>
              ingredient.ingredient.toLowerCase()
            )
          )
        )
      ),
    [searchFilteredRecipes]
  );

  // Liste des appareils disponibles
  const allAppliances = useMemo(
    () =>
      Array.from(
        new Set(
          searchFilteredRecipes.map((recipe) =>
            recipe.appliance.toLowerCase()
          )
        )
      ),
    [searchFilteredRecipes]
  );

  // Liste des ustensiles disponibles
  const allUstensils = useMemo(
    () =>
      Array.from(
        new Set(
          searchFilteredRecipes.flatMap((recipe) =>
            recipe.ustensils.map((ustensil) => ustensil.toLowerCase())
          )
        )
      ),
    [searchFilteredRecipes]
  );

  // Gestion des filtres
  const toggleFilter = (
    category: keyof typeof filters,
    item: string
  ) => {
    setFilters((previousFilters) => ({
      ...previousFilters,
      [category]: previousFilters[category].includes(item)
        ? previousFilters[category].filter((filter) => filter !== item)
        : [...previousFilters[category], item],
    }));
  };

  // Filtrage final
  const filteredRecipes = searchFilteredRecipes.filter((recipe) => {
    const matchIngredients =
      filters.Ingrédients.length === 0 ||
      filters.Ingrédients.every((ingredient) =>
        recipe.ingredients.some(
          (recipeIngredient) =>
            recipeIngredient.ingredient.toLowerCase() ===
            ingredient.toLowerCase()
        )
      );

    const matchAppliances =
      filters.Appareils.length === 0 ||
      filters.Appareils.includes(recipe.appliance.toLowerCase());

    const matchUstensils =
      filters.Ustensiles.length === 0 ||
      filters.Ustensiles.every((ustensil) =>
        recipe.ustensils
          .map((recipeUstensil) => recipeUstensil.toLowerCase())
          .includes(ustensil.toLowerCase())
      );

    return matchIngredients && matchAppliances && matchUstensils;
  });

  const recipeCount = filteredRecipes.length;

  return (
    <>
      <Header />

      <main className="relative min-h-screen flex flex-col items-center bg-gray-100 p-8">
        <div className={styles.searchbox}>
          <SearchBar onChange={setSearchQuery} />
        </div>

        <div className={styles.mainfilter}>
          <div className={styles.boxfilter}>
            <div>
              <FilterDropdown
                title="Ingrédients"
                options={allIngredients}
                selected={filters.Ingrédients}
                onSelect={(item) =>
                  toggleFilter("Ingrédients", item)
                }
                onRemove={(item) =>
                  toggleFilter("Ingrédients", item)
                }
              />
            </div>

            <div>
              <FilterDropdown
                title="Appareils"
                options={allAppliances}
                selected={filters.Appareils}
                onSelect={(item) =>
                  toggleFilter("Appareils", item)
                }
                onRemove={(item) =>
                  toggleFilter("Appareils", item)
                }
              />
            </div>

            <div>
              <FilterDropdown
                title="Ustensiles"
                options={allUstensils}
                selected={filters.Ustensiles}
                onSelect={(item) =>
                  toggleFilter("Ustensiles", item)
                }
                onRemove={(item) =>
                  toggleFilter("Ustensiles", item)
                }
              />
            </div>
          </div>

          <div className={styles.count}>
            <p className="count">
              {recipeCount} recette
              {recipeCount > 1 ? "s" : ""}
            </p>
          </div>
        </div>

        <div className={styles.mainpad}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredRecipes.map((recipe) => (
              <RecipeCard
                key={recipe.id}
                recipe={recipe}
              />
            ))}
          </div>
        </div>
      </main>
    </>
  );
}

export default function Home() {
  return (
    <Suspense fallback={null}>
      <HomeContent />
    </Suspense>
  );
}