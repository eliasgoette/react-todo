import React, { useEffect, useState } from "react";
import Banner from "../../Generic/Banner";
import MaterialButton, { BUTTON_COLOR_SCHEMES } from "../../Generic/MaterialButton";
import ButtonGroup from "../../Generic/ButtonGroup";
import { ERROR_STATES } from "../../Generic/ErrorBanner";

export default function UpdateListBanner({ onFinishEditing, lists, saveLists, editingListIndex, className, onError }) {
    const [updatedList, setUpdatedList] = useState({name: '', content: []});

    const setDefaultValues = () => {
        if(editingListIndex !== '' && !(isNaN(editingListIndex)) && editingListIndex < lists.length)
            setUpdatedList(lists[editingListIndex]);
        else 
            setUpdatedList({name: '', content: []});
    }

    useEffect(() => {
        setDefaultValues();
    }, [editingListIndex]);

    const resetStatesAndClose = () => {
        onFinishEditing();
        setDefaultValues();
    }

    const deleteButtonClickHandler = () => {
        const updatedLists = lists.filter((_, index) => index !== editingListIndex);
        saveLists(updatedLists);
        onFinishEditing();
        setDefaultValues();
    }

    const saveButtonClickHandler = () => {
        if(updatedList.name !== '' && updatedList.name !== null && updatedList.name !== undefined) {
            const updatedLists = [...lists];
            updatedLists[editingListIndex] = updatedList;
            saveLists(updatedLists);
            onFinishEditing();
            setDefaultValues();
        } else {
            onError(ERROR_STATES.WRONG_INPUT_NAME);
        }
    }

    return (
        <Banner className={className} title={'Edit List'}>
            <div>
                <label>Name</label>
                <input type="text"
                    value={updatedList.name} onChange={(e) => setUpdatedList({ ...updatedList, name: e.target.value })}
                    placeholder="New list" />
            </div>
            <MaterialButton 
                clickEvent={deleteButtonClickHandler} 
                colorScheme={BUTTON_COLOR_SCHEMES.FILLED_DESTRUCTIVE}
                iconName={'delete'}
                text={'Delete list'}
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