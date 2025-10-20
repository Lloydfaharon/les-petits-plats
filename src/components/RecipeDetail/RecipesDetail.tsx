'use client';

import React from "react";
import Image from "next/image";
import styles from "@/app/RecipeDetails.module.css";

export type Ingredient = {
  ingredient: string;
  quantity?: number | string;
  unit?: string;
};

export type Recipe = {
  name: string;
  time: number;
  image: string;
  slug: string;
  ingredients: Ingredient[];
  ustensils: string[];
  appliance: string;
  description: string;
};

type Props = {
  recipe: Recipe;
};

export default function RecipeDetails({ recipe }: Props) {
  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <Image
          src={`/images/${recipe.image}`}
          alt={recipe.name}
          width={500}
          height={500}
          className={styles.image}
        />
      </div>

      <div className={styles.details}>
        <h1 className={styles.title}>{recipe.name}</h1>

        <div className={styles.section}>
          <h3>Temps de préparation</h3>
          <span className={styles.badge}>{recipe.time}min</span>
        </div>

        <div className={styles.section}>
          <h3>Ingrédients</h3>
          <div className={styles.grid}>
            {recipe.ingredients.map((item, index) => (
              <div key={index}>
                <strong>{item.ingredient}</strong>
                <div className={styles.gray}>
                  {item.quantity ?? ""} {item.unit ?? ""}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.section}>
          <h3>Ustensiles nécessaires</h3>
          <ul>
            {recipe.ustensils.map((ust, i) => (
              <li key={i}>{ust}</li>
            ))}
          </ul>
        </div>

        <div className={styles.section}>
          <h3>Appareil utilisé</h3>
          <div>{recipe.appliance}</div>
        </div>

        <div className={styles.section}>
          <h3>Recette</h3>
          <p>{recipe.description}</p>
        </div>
      </div>
    </div>
  );
}
