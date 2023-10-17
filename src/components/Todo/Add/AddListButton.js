import React from "react";
import styles from "./AddListButton.module.css";
import MaterialSymbolRounded from "../../Generic/MaterialSymbolRounded";

export default function AddListButton({ clickEvent, lists, saveLists }) {
    return (
        <button onClick={clickEvent}
            color-scheme="complementary" className={styles['add-list-button']}>
            <MaterialSymbolRounded name="list_alt_add" />
            <strong>New List</strong>
        </button>
    );
}