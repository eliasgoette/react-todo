import React, { useState } from "react";
import styles from "./Task.module.css";
import MaterialButton, { BUTTON_COLOR_SCHEMES } from "../Generic/MaterialButton";

export default function Task({ onUpdateTask, lists, saveLists, listIndex, taskIndex }) {
    const currentList = lists[listIndex];
    const currentTask = currentList.content[taskIndex];

    const [completed, setCompleted] = useState(currentTask.completed);
    const [important, setImportant] = useState(currentTask.important);

    const toggleCompleted = () => {
        const newCompleted = !completed;
        setCompleted(newCompleted);
        updateTask('completed', newCompleted);
    }

    const toggleImportant = () => {
        const newImportant = !important;
        setImportant(newImportant);
        updateTask('important', newImportant);
    }

    const updateTask = (key, value) => {
        const updatedLists = [...lists];
        updatedLists[listIndex].content[taskIndex] = {
            ...updatedLists[listIndex].content[taskIndex],
            [key]: value
        }
        saveLists(updatedLists);
    }

    return (
        <div className={`${styles.task} ${currentTask.completed ? styles.completed : ''}`}>
            <h3 onClick={() => onUpdateTask(listIndex, taskIndex)}>{currentTask.title}</h3>
            <MaterialButton clickEvent={toggleCompleted}
                colorScheme={BUTTON_COLOR_SCHEMES.TEXT}
                iconName={currentTask.completed ? 'check_circle' : 'circle'} />
            <MaterialButton clickEvent={toggleImportant}
                colorScheme={BUTTON_COLOR_SCHEMES.TEXT}
                iconName={'star'} iconFilled={currentTask.important} />
        </div>
    );
}