"use client";
import styles from "@/app/page.module.css";
import Link from "next/link";
import React from "react";
import Image from "next/image";

export type Recipe = {
  id: number;
  name: string;
  image: string;
  time: number;
  description: string;
  ingredients: Ingredient[];
  slug: string;
};
export type Ingredient = {
  ingredient: string;
  quantity?: string | number;
  unit?: string;
};

export default function RecipeCard({ recipe }: { recipe: Recipe }) {
  return (
    <Link href={`/recette/${recipe.slug}`}>
      <div className="bg-white rounded-[24px] overflow-hidden shadow-md w-[380px] h-[731px]">
        <div className="relative">
          <Image
            src={`/images/${recipe.image}`}
            alt={recipe.name}
            width={512}
            height={300}
            className="w-full h-64 object-cover"
          />
          <span className=" badge absolute top-6 right-5 bg-yellow-300 text-black  text-center text-size rounded-full w-[63px] h-[26px]">
            {recipe.time}min
          </span>
        </div>

        <div className={styles.description}>
          <h2 className="text-xl font-bold ">{recipe.name}</h2>

          <h3 className="uppercase text-gray-500 font-semibold text-sm mb-1">
            Recette
          </h3>
          <p className="text-sm mb-4 line-clamp-3">{recipe.description}</p>

          <h3 className="uppercase text-gray-500 font-semibold text-sm mb-1">
            Ingrédients
          </h3>
          <div className="grid grid-cols-2 gap-y-5 text-sm">
            {recipe.ingredients.map((item, index) => (
              <div key={index}>
                <div className="font-semibold">{item.ingredient}</div>
                <div className="text-gray-500">
                  {item.quantity ?? ""} {item.unit ?? ""}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}
