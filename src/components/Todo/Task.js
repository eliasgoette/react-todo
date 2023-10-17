import React from "react";
import styles from "./Task.module.css";

export default function Task({onUpdateTask, lists, listIndex, taskIndex}) {
    const currentList = lists[listIndex];
    const currentTask = currentList.content[taskIndex];

    return(
        <div className={styles.task}>
            <h3 onClick={() => onUpdateTask(listIndex, taskIndex)}>{currentTask.title}</h3>
        </div>
    );
}