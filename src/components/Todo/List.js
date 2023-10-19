import React from "react";
import styles from "./List.module.css";
import Task from "./Task";
import MaterialButton, { BUTTON_COLOR_SCHEMES } from "../Generic/MaterialButton";

export default function List({ onUpdateList, onAddTask, onUpdateTask, lists, saveLists, index }) {
    const { name, content } = lists[index];

    return (
        <div className={styles.list}>
            <h2 onClick={() => onUpdateList(index)}>{name}</h2>
            <div>
                <MaterialButton className={styles['add-task-button']}
                    clickEvent={() => onAddTask(index)}
                    colorScheme={BUTTON_COLOR_SCHEMES.OUTLINED}
                    text={'New Task'} iconName={'add_task'} />
                {content.map((task, i) => (
                    <Task onUpdateTask={onUpdateTask} lists={lists} saveLists={saveLists} listIndex={index} taskIndex={i} key={`${i}: ${task.title}`} />
                ))}
            </div>
        </div>
    );
}