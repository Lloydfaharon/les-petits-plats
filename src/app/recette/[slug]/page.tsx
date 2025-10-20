import recipeData from "@/data/recipes.json";
import RecipeDetails from "@/components/RecipeDetail/RecipesDetail";
import { notFound } from "next/navigation";
import { Recipe } from "@/components/RecipeDetail/RecipesDetail"; // Assure-toi que ce fichier existe

// Génère les chemins statiques : /recette/slug
export function generateStaticParams() {
  return recipeData.map((recipe) => ({
    slug: recipe.slug,
  }));
}

// Page dynamique
export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = params;

  const recipe = await new Promise<Recipe | undefined>((resolve) => {
    const found = recipeData.find((r) => r.slug === slug);
    resolve(found);
  });

  if (!recipe) {
    notFound();
  }

  return <RecipeDetails recipe={recipe} />;
}


