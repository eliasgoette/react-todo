import React from "react";
import styles from "./MaterialButton.module.css";
import MaterialSymbolRounded from "./MaterialSymbolRounded";

export const BUTTON_COLOR_SCHEMES = {
    FILLED: 'filled',
    OUTLINED: 'outlined',
    TEXT: 'text',
    FILLED_DESTRUCTIVE: 'filled_destructive',
    OUTLINED_DESTRUCTIVE: 'outlined_destructive',
    TEXT_DESTRUCTIVE: 'text_destructive'
}

export default function MaterialButton({className='', clickEvent, colorScheme=BUTTON_COLOR_SCHEMES.OUTLINED, type='button', iconName, iconFilled=false, text=null}) {
    return(
        <button className={`${styles['material-button']} ${className}`} onClick={clickEvent} color-scheme={colorScheme} type={type}>
            <MaterialSymbolRounded name={iconName} filled={iconFilled} />
            {text !== null && <strong>{text}</strong>}
        </button>
    );
}