import React from "react";
import styles from "./Banner.module.css";

export const BANNER_COLOR_SCHEMES = {
    NORMAL: 'normal',
    ERROR: 'error'
}

export default function Banner({title, className='', colorScheme=BANNER_COLOR_SCHEMES.NORMAL, children}) {
    const errorClass = colorScheme === BANNER_COLOR_SCHEMES.ERROR ? ` ${styles.error}` : ''

    return(
        <div className={`${styles['banner-bg']} ${className}`}>
            <form className={`${styles.banner}${errorClass}`} onSubmit={(e) => e.preventDefault()}>
                <h3 className={styles['banner-title']}>{title}</h3>
                <div className={styles['banner-input-elements']}>
                    {children}
                </div>
            </form>
        </div>
    );
}