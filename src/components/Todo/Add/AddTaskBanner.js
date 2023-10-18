import React, { useState, useEffect } from "react";
import Banner from "../../Generic/Banner";
import MaterialButton, { BUTTON_COLOR_SCHEMES } from "../../Generic/MaterialButton";
import ListSelectDropdown from "../ListSelectionDropdown";
import ButtonGroup from "../../Generic/ButtonGroup";
import { ERROR_STATES } from "../../Generic/ErrorBanner";

export default function AddTaskBanner({editingListIndex, onFinishEditing, className='', lists, saveLists, onError }) {
    const [selectedListIndex, setSelectedListIndex] = useState(editingListIndex);

    useEffect(() => {
        setSelectedListIndex(editingListIndex);
    }, [editingListIndex]);

    const [newTask, setNewTask] = useState({
        title: 'New task',
        notes: '',
        completed: false,
        important: false,
        duedate: ''
    });

    const handleImportantChange = () => {
        setNewTask({ ...newTask, important: !newTask.important });
    }

    const handleTitleChange = (e) => {
        setNewTask({ ...newTask, title: e.target.value });
    };

    const handleNotesChange = (e) => {
        setNewTask({ ...newTask, notes: e.target.value });
    };

    const handleDueDateChange = (e) => {
        setNewTask({ ...newTask, duedate: new Date(e.target.value).toISOString().split('T')[0] });
    };

    const resetStatesAndClose = () => {
        setSelectedListIndex(0);
        setNewTask({
            title: 'New task',
            notes: '',
            completed: false,
            important: false,
            duedate: ''
        });

        onFinishEditing();
    }

    const handleCreateButtonClick = () => {
        if(newTask.title !== '' && newTask.title !== undefined && newTask.title !== null) {
            const updatedLists = JSON.parse(JSON.stringify(lists));
            updatedLists[selectedListIndex].content.splice(0, 0, newTask);
            saveLists(updatedLists);
            resetStatesAndClose();
        } else {
            onError(ERROR_STATES.WRONG_INPUT_TITLE);
        }
    }

    return (
        <Banner className={className} title={'New Task'}>
            <MaterialButton
                clickEvent={handleImportantChange}
                colorScheme={BUTTON_COLOR_SCHEMES.TEXT}
                iconName={'star'}
                iconFilled={newTask.important}
            />
            <div>
                <label>Title</label>
                <input
                    type="text"
                    value={newTask.title}
                    onChange={handleTitleChange}
                    placeholder="New task"
                />
            </div>
            <div>
                <label>Notes</label>
                <input
                    type="text"
                    value={newTask.notes}
                    onChange={handleNotesChange}
                    placeholder="Your notes"
                />
            </div>
            <div>
                <label>Due date</label>
                <input
                    type="date"
                    value={newTask.duedate}
                    onChange={handleDueDateChange}
                    placeholder="mm/dd/yyyy"
                />
            </div>
            <ListSelectDropdown lists={lists}
                selectedListIndex={selectedListIndex}
                onSelectListIndex={setSelectedListIndex}
            />
            <ButtonGroup>
                <MaterialButton
                    clickEvent={resetStatesAndClose}
                    colorScheme={BUTTON_COLOR_SCHEMES.OUTLINED}
                    iconName={'cancel'}
                    text={'Cancel'}
                />
                <MaterialButton
                    clickEvent={handleCreateButtonClick}
                    colorScheme={BUTTON_COLOR_SCHEMES.FILLED}
                    iconName={'add_task'}
                    text={'Create'}
                />
            </ButtonGroup>
        </Banner>
    );
}