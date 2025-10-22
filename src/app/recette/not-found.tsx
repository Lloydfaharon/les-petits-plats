import React from "react";
import Image from "next/image";
import styles from "../../app/page.module.css";
import Link from "next/link";
import backg from "../../../public/images/backg.jpg"; // ✅ renommé pour clarté

export default function NotFound() {
  return (
    <div className="relative h-screen w-full">
      {/* ✅ Image plein écran */}
      <Image
        src={backg}
        alt="Image d'un plat asiatique"
        fill
        priority
        className="object-cover brightness-50" // brightness pour effet foncé
      />

      {/* ✅ Texte centré au milieu */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center space-y-4">
        <h1 className="text-6xl text-amber-400 font-bold">404 :(</h1>
        <p className="text-lg  text-amber-400">La page que vous demandez est introuvable.</p>
        <Link href="/">
          <button className={styles.orderButton}>Retour</button>
        </Link>
      </div>
    </div>
  );
}
