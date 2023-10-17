import React from "react";
import styles from "./List.module.css";
import Task from "./Task";
import AddTaskButton from "./Add/AddTaskButton";

export default function List({
    onUpdateList, onAddTask, onUpdateTask,
    lists, saveLists, index
}) {
    const { name, content } = lists[index];

    return (
        <div className={styles.list}>
            <h2 onClick={() => onUpdateList(index)}>{name}</h2>
            <div>
                <AddTaskButton clickEvent={() => onAddTask(index)} lists={lists} saveLists={saveLists} listIndex={index} />
                {content.map((task, i) => <Task onUpdateTask={onUpdateTask} lists={lists} listIndex={index} taskIndex={i} key={`${i}: ${task.title}`} />)}
            </div>
        </div>
    );
}