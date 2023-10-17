import React, { useState, useEffect } from "react";
import Banner from "../../Generic/Banner";
import MaterialButton, { BUTTON_COLOR_SCHEMES } from "../../Generic/MaterialButton";

export default function UpdateTaskBanner({ editingListIndex, editingTaskIndex, onFinishEditing, lists, saveLists, className }) {
    const [updatedTask, setUpdatedTask] = useState({
        title: '',
        notes: '',
        completed: false,
        important: false,
        duedate: ''
    });

    const setDefaultValues = () => {
        if (editingListIndex !== '' && !(isNaN(editingListIndex)) && editingListIndex < lists.length)
            if (editingTaskIndex !== '' && !(isNaN(editingTaskIndex)) && editingTaskIndex < lists[editingListIndex].content.length)
                setUpdatedTask(lists[editingListIndex].content[editingTaskIndex]);
            else
                setUpdatedTask({
                    title: '',
                    notes: '',
                    completed: false,
                    important: false,
                    duedate: ''
                });
    }

    useEffect(() => {
        setDefaultValues();
    }, [editingListIndex]);

    useEffect(() => {
        setDefaultValues();
    }, [editingTaskIndex]);

    const resetStatesAndClose = () => {
        onFinishEditing();
        setDefaultValues();
    }

    const deleteButtonClickHandler = () => {
        const updatedLists = [...lists];
        updatedLists[editingListIndex].content = updatedLists[editingListIndex].content.filter((_, index) => index !== editingTaskIndex)
        saveLists(updatedLists);
        onFinishEditing();
        setDefaultValues();
    }

    const saveButtonClickHandler = () => {
        const updatedLists = [...lists];
        updatedLists[editingListIndex].content[editingTaskIndex] = updatedTask;
        saveLists(updatedLists);
        onFinishEditing();
        setDefaultValues();
    }

    return (
        <Banner className={className} title={'Edit Task'}>
            <div>
                <label>Title</label>
                <input type="text"
                    value={updatedTask.title} onChange={(e) => setUpdatedTask({ ...updatedTask, title: e.target.value })}
                    placeholder="New task" />
            </div>
            <MaterialButton
                clickEvent={deleteButtonClickHandler}
                colorScheme={BUTTON_COLOR_SCHEMES.FILLED_DESTRUCTIVE}
                iconName={'delete'}
                text={'Delete task'}
            />
            <MaterialButton
                clickEvent={resetStatesAndClose}
                colorScheme={BUTTON_COLOR_SCHEMES.OUTLINED}
                iconName={'cancel'}
                text={'Cancel'}
            />
            <MaterialButton clickEvent={saveButtonClickHandler}
                colorScheme={BUTTON_COLOR_SCHEMES.FILLED} iconName={'check'} text={'Save'} />
        </Banner>
    );
}