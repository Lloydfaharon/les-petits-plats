import React from 'react'
import styles from "../app/page.module.css";
import Link from "next/link";


function notFound() {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>404 :(</h1>
      <p>La page que vous demandez est introuvable.</p>
      <Link href={"/"}>
      <button className={styles.orderButton}>retour</button>
      </Link>
    </div>
  )
}

export default notFound