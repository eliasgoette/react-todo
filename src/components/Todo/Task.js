import React from "react";
import styles from "./Task.module.css";
import MaterialSymbolRounded from "../Generic/MaterialSymbolRounded";

export default function Task({onUpdateTask, lists, listIndex, taskIndex}) {
    const currentList = lists[listIndex];
    const currentTask = currentList.content[taskIndex];

    return(
        <div className={`${styles.task} ${currentTask.completed ? styles.completed : ''}`}>
            <h3 onClick={() => onUpdateTask(listIndex, taskIndex)}>{currentTask.title}</h3>
            <MaterialSymbolRounded name={currentTask.completed ? 'check_circle' : 'circle'} />
            <MaterialSymbolRounded name={'star'} filled={currentTask.important} />
        </div>
    );
}