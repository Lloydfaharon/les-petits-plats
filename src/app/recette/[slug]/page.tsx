import recipeData from "@/data/recipes.json";
import RecipeDetails from "@/components/RecipeDetail/RecipesDetail";
import { notFound } from "next/navigation";
import Header from "@/components/Header/Header";
import type { Recipe } from "@/components/RecipeDetail/RecipesDetail";

export function generateStaticParams() {
  return recipeData.map((recipe) => ({
    slug: recipe.slug,
  }));
}


export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; 

  const recipe = recipeData.find((r) => r.slug === slug);

  if (!recipe) {
    notFound();
  }

  return (
    <>
      <Header />
      <RecipeDetails recipe={recipe} />
    </>
  );
}



