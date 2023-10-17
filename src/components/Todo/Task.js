import React from "react";
import styles from "./Task.module.css";

export default function Task({onEditTask, lists, listIndex, taskIndex}) {
    const currentList = lists[listIndex];
    const currentTask = currentList.content[taskIndex];

    return(
        <div className={styles.task}>
            <h3 onClick={() => onEditTask(listIndex, taskIndex)}>{currentTask.title}</h3>
        </div>
    );
}