"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";


type HeaderProps = {
  onSearchChange?: (value: string) => void;
};

export default function Header({ onSearchChange }: HeaderProps) {
  const pathname = usePathname();
  const isRecipePage = pathname.startsWith("/recette/");
  const isNotFoundPage = pathname === "/not-found"; 

  return (
    <header
      className={`header ${
        isRecipePage ? "header--small" : isNotFoundPage ? "header--full" : ""
      }`}
    >
      {/* Titre + Logo */}
      <Link href="/">
        <div className="logo text-white text-2xl flex flex-row ">
          <h1 className="flex justify-center items-center text-white">
            Les petits plats
            <span aria-hidden="true" className="ml-2">
              <svg
                width="15"
                height="15"
                viewBox="0 0 23 23"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M23.0001 11.4096C23.0001 17.2779 18.0634 22.0351 11.9737 22.0351C5.88392 22.0351 0.947205 17.2779 0.947205 11.4096C0.947205 5.54129 5.88392 0.784088 11.9737 0.784088C18.0634 0.784088 23.0001 5.54129 23.0001 11.4096Z"
                  fill="white"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M11.9737 20.4312C17.2342 20.4312 21.3963 16.3366 21.3963 11.4096C21.3963 6.48255 17.2342 2.38794 11.9737 2.38794C6.71319 2.38794 2.55105 6.48255 2.55105 11.4096C2.55105 16.3366 6.71319 20.4312 11.9737 20.4312ZM11.9737 22.0351C18.0634 22.0351 23.0001 17.2779 23.0001 11.4096C23.0001 5.54129 18.0634 0.784088 11.9737 0.784088C5.88392 0.784088 0.947205 5.54129 0.947205 11.4096C0.947205 17.2779 5.88392 22.0351 11.9737 22.0351Z"
                  fill="black"
                />
                <path
                  d="M19.3915 11.4096C19.3915 15.5063 16.0704 18.8274 11.9737 18.8274C7.87691 18.8274 4.55585 15.5063 4.55585 11.4096C4.55585 7.31286 7.87691 3.99179 11.9737 3.99179C16.0704 3.99179 19.3915 7.31286 19.3915 11.4096Z"
                  fill="white"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M11.9737 17.2236C15.1846 17.2236 17.7876 14.6206 17.7876 11.4096C17.7876 8.19864 15.1846 5.59564 11.9737 5.59564C8.76269 5.59564 6.1597 8.19864 6.1597 11.4096C6.1597 14.6206 8.76269 17.2236 11.9737 17.2236ZM11.9737 18.8274C16.0704 18.8274 19.3915 15.5063 19.3915 11.4096C19.3915 7.31286 16.0704 3.99179 11.9737 3.99179C7.87691 3.99179 4.55585 7.31286 4.55585 11.4096C4.55585 15.5063 7.87691 18.8274 11.9737 18.8274Z"
                  fill="black"
                />
              </svg>
            </span>
          </h1>
        </div>
      </Link>
    </header>
  );
}
