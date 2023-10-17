import React, { useState } from "react";
import styles from "./Todo.module.css";
import List from "./List";
import AddListButton from "./Add/AddListButton";
import AddListBanner from "./Add/AddListBanner";
import AddTaskBanner from "./Add/AddTaskBanner"
import UpdateListBanner from "./Update/UpdateListBanner";
import UpdateTaskBanner from "./Update/UpdateTaskBanner";

export const TODO_EDIT_MODE = {
    EDIT_OFF: 'edit_off',
    ADD_LIST: 'add_list',
    ADD_TASK: 'add_task',
    UPDATE_LIST: 'update_list',
    UPDATE_TASK: 'update_task'
}

export default function Todo({ lists, saveLists }) {
    const [editMode, setEditMode] = useState(TODO_EDIT_MODE.EDIT_OFF);
    const [editingListIndex, setEditingListIndex] = useState('');
    const [editingTaskIndex, setEditingTaskIndex] = useState('');

    const setEditStates = (mode, listIndex, taskIndex) => {
        setEditMode(mode);
        setEditingListIndex(listIndex);
        setEditingTaskIndex(taskIndex);
    }

    const finishEditing = () => {
        setEditMode(TODO_EDIT_MODE.EDIT_OFF);
        setEditingListIndex('');
        setEditingTaskIndex('');
    }

    return (
        <div className={styles.todo}>
            <AddListButton
                clickEvent={() => setEditStates(TODO_EDIT_MODE.ADD_LIST, lists.length, '')}
                lists={lists} saveLists={saveLists} />
            {lists.map((list, i) => (
                <List
                    onUpdateList={(listIndex) => setEditStates(TODO_EDIT_MODE.UPDATE_LIST, listIndex, '')}
                    onAddTask={(listIndex) => setEditStates(TODO_EDIT_MODE.ADD_TASK, listIndex, lists[listIndex].content.length)}
                    onUpdateTask={(listIndex, taskIndex) => setEditStates(TODO_EDIT_MODE.UPDATE_TASK, listIndex, taskIndex)}
                    editingListIndex={editingListIndex} editingTaskIndex={editingTaskIndex}
                    lists={lists} saveLists={saveLists} index={i} key={`${i}: ${list.name}`} />
            ))}
            <AddListBanner className={editMode !== TODO_EDIT_MODE.ADD_LIST && styles.hidden}
                lists={lists} saveLists={saveLists} onFinishEditing={finishEditing} />
            <AddTaskBanner className={editMode !== TODO_EDIT_MODE.ADD_TASK && styles.hidden}
                editingListIndex={editingListIndex} onFinishEditing={finishEditing}
                lists={lists} saveLists={saveLists} />
            <UpdateListBanner className={editMode !== TODO_EDIT_MODE.UPDATE_LIST && styles.hidden}
                lists={lists} saveLists={saveLists}
                editingListIndex={editingListIndex}
                onFinishEditing={finishEditing} />
            <UpdateTaskBanner className={editMode !== TODO_EDIT_MODE.UPDATE_TASK && styles.hidden}
                lists={lists} saveLists={saveLists}
                editingListIndex={editingListIndex} editingTaskIndex={editingTaskIndex}
                setEditMode={setEditMode} onFinishEditing={finishEditing} />
        </div>
    );
}