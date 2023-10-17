import React from "react";
import styles from "./AddTaskButton.module.css";
import MaterialSymbolRounded from "../../Generic/MaterialSymbolRounded";
import MaterialButton, { BUTTON_COLOR_SCHEMES } from "../../Generic/MaterialButton";

export default function AddTaskButton({ clickEvent, lists, saveLists, listIndex }) {
    return (
        <MaterialButton className={styles['add-task-button']}
            clickEvent={clickEvent}
            colorScheme={BUTTON_COLOR_SCHEMES.OUTLINED}
            text={'New Task'} iconName={'add_task'} />
    );
}