import React from "react";
import styles from "./Banner.module.css";
import MaterialSymbolRounded from "./MaterialSymbolRounded";

export default function Banner({title, className, children}) {
    return(
        <div className={`${className} ${styles['banner-bg']}`}>
            <form className={styles.banner}>
                <h3 className={styles['banner-title']}>{title}</h3>
                <div className={styles['banner-input-elements']}>
                    {children}
                </div>
            </form>
        </div>
    );
}