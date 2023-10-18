import React from "react";
import styles from "./AddListButton.module.css";
import MaterialSymbolRounded from "../../Generic/MaterialSymbolRounded";
import MaterialButton, { BUTTON_COLOR_SCHEMES } from "../../Generic/MaterialButton";

export default function AddListButton({ clickEvent }) {
    return (
        <MaterialButton className={styles['add-list-button']}
        clickEvent={clickEvent}
        colorScheme={BUTTON_COLOR_SCHEMES.OUTLINED}
        text={'New List'} iconName={'list_alt_add'} />
    );
}