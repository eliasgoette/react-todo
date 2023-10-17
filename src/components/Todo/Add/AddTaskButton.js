import React from "react";
import styles from "./AddTaskButton.module.css";
import MaterialSymbolRounded from "../../Generic/MaterialSymbolRounded";

export default function AddTaskButton({clickEvent, lists, saveLists, listIndex}) {
    return(
        <button onClick={clickEvent} className={styles['add-task-button']}>
            <MaterialSymbolRounded name="add_task" />
            <strong>New Task</strong>
        </button>
    );
}