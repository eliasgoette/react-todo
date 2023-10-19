import React, { useState, useEffect } from "react";
import Banner from "../../Generic/Banner";
import MaterialButton, { BUTTON_COLOR_SCHEMES } from "../../Generic/MaterialButton";
import ListSelectDropdown from "../ListSelectionDropdown";
import ButtonGroup from "../../Generic/ButtonGroup";
import { ERROR_STATES } from "../../Generic/ErrorBanner";

export default function UpdateTaskBanner({ editingListIndex, editingTaskIndex, onFinishEditing, lists, saveLists, className, onError }) {
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
        if(updatedTask.title !== '' && updatedTask.title !== null && updatedTask.title !== undefined) {
            const updatedLists = [...lists];
            if(editingListIndex !== updatedListIndex) {
                console.log(updatedLists[editingListIndex].content[editingTaskIndex]);
                updatedLists[editingListIndex].content.splice(editingTaskIndex, 1);
                updatedLists[updatedListIndex].content.splice(0, 0, updatedTask);
            } else {
                updatedLists[editingListIndex].content[editingTaskIndex] = updatedTask;
            }
            saveLists(updatedLists);
            onFinishEditing();
            setDefaultValues();
        } else {
            onError(ERROR_STATES.WRONG_INPUT_TITLE);
        }
    }

    return (
        <Banner className={className} title={'Edit Task'}>
            <MaterialButton
                clickEvent={() => setUpdatedTask({ ...updatedTask, important: !updatedTask.important })}
                colorScheme={BUTTON_COLOR_SCHEMES.TEXT}
                iconName={'star'}
                iconFilled={updatedTask.important}
            />
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
            <ButtonGroup>
                <MaterialButton
                    clickEvent={resetStatesAndClose}
                    colorScheme={BUTTON_COLOR_SCHEMES.OUTLINED}
                    iconName={'cancel'}
                    text={'Cancel'}
                />
                <MaterialButton clickEvent={saveButtonClickHandler}
                    colorScheme={BUTTON_COLOR_SCHEMES.FILLED} iconName={'check'} text={'Save'} />
            </ButtonGroup>
        </Banner>
    );
}