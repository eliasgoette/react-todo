import React, { useState, useEffect } from "react";
import Banner from "../../Generic/Banner";
import MaterialButton, { BUTTON_COLOR_SCHEMES } from "../../Generic/MaterialButton";
import ListSelectDropdown from "../ListSelectionDropdown";

export default function UpdateTaskBanner({ editingListIndex, editingTaskIndex, setEditMode, onFinishEditing, lists, saveLists, className }) {
    const [updatedTask, setUpdatedTask] = useState({
        title: '',
        notes: '',
        completed: false,
        important: false,
        duedate: ''
    });

    const [updatedListIndex, setUpdatedListIndex] = useState(editingListIndex);

    const setDefaultValues = () => {
        if (editingListIndex !== '' && !(isNaN(editingListIndex)) && editingListIndex < lists.length)
            if (editingTaskIndex !== '' && !(isNaN(editingTaskIndex)) && editingTaskIndex < lists[editingListIndex].content.length) {
                setUpdatedTask(lists[editingListIndex].content[editingTaskIndex]);
                setUpdatedListIndex(editingListIndex);
            } else {
                setUpdatedTask({
                    title: '',
                    notes: '',
                    completed: false,
                    important: false,
                    duedate: ''
                });
                setUpdatedListIndex(0);
            }
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
        if(editingListIndex !== updatedListIndex) {
            updatedLists[editingListIndex].content.pop(editingListIndex);
            updatedLists[updatedListIndex].content.splice(0, 0, updatedTask);
        } else {
            updatedLists[editingListIndex].content[editingTaskIndex] = updatedTask;
        }
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
            <div>
                <label>Notes</label>
                <input
                    type="text"
                    value={updatedTask.notes}
                    onChange={(e) => setUpdatedTask({ ...updatedTask, notes: e.target.value })}
                    placeholder="Your notes"
                />
            </div>
            <div>
                <label>Due date</label>
                <input
                    type="date"
                    value={updatedTask.duedate}
                    onChange={(e) => setUpdatedTask({ ...updatedTask, duedate: e.target.value })}
                    placeholder="mm/dd/yyyy"
                />
            </div>
            <MaterialButton
                clickEvent={() => setUpdatedTask({ ...updatedTask, important: !updatedTask.important })}
                colorScheme={BUTTON_COLOR_SCHEMES.TEXT}
                iconName={'star'}
                iconFilled={updatedTask.important}
            />
            <ListSelectDropdown lists={lists}
                selectedListIndex={updatedListIndex}
                onSelectListIndex={setUpdatedListIndex}
            />
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