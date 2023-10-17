import React from "react";
import styles from "./ButtonGroup.module.css";

export default function ButtonGroup({children}) {
    return(
        <div className={styles['button-group']}>
            {children}
        </div>
    );
}