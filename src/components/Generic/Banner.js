import React from "react";
import styles from "./Banner.module.css";

export default function Banner({title, className='', children}) {
    return(
        <div className={`${styles['banner-bg']} ${className}`}>
            <form className={styles.banner} onSubmit={(e) => e.preventDefault()}>
                <h3 className={styles['banner-title']}>{title}</h3>
                <div className={styles['banner-input-elements']}>
                    {children}
                </div>
            </form>
        </div>
    );
}