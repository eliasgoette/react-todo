import React from "react";
import styles from "./MaterialSymbolRounded.module.css";

export default function MaterialSymbolRounded({ name, filled=false }) {
  // Define the class name based on the 'filled' prop
  const className = `material-symbols-rounded ${styles['material-symbols-rounded']} ${filled ? styles.filled : ''}`;

  return (
    <div className={styles['symbol-container']}>
      <span className={className}>{name}</span>
    </div>
  );
}