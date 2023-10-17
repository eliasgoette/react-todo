import React from "react";
import MaterialSymbolRounded from "./MaterialSymbolRounded";

export const BUTTON_COLOR_SCHEMES = {
    FILLED: 'filled',
    OUTLINED: 'outlined',
    TEXT: 'text',
    FILLED_DESTRUCTIVE: 'filled_destructive',
    TEXT_DESTRUCTIVE: 'text_destructive'
}

export default function MaterialButton({clickEvent, colorScheme, type='button', iconName, iconFilled=false, text}) {
    return(
        <button onClick={clickEvent} color-scheme={colorScheme} type={type}>
            <MaterialSymbolRounded name={iconName} filled={iconFilled} />
            {text !== undefined && <strong>{text}</strong>}
        </button>
    );
}