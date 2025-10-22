"use client";

import { useState } from "react";
import React from "react";
import Header from "@/components/Header/Header";
import styles from "./layout.module.css";

type LayoutWrapperProps = {
  children: React.ReactNode;
};




export default function LayoutWrapper({ children }: LayoutWrapperProps) {
  
  
  return (
    <div className={styles.page}>
      <Header />

      <main className={styles.mainContent}>
        {(children)}
      </main>

      <footer className="h-[50px] bg-black text-white flex items-center justify-center">
        <p>Copyright © 2025 - Les Petits Plats</p>
      </footer>
    </div>
  );
}

