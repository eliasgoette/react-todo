import React, { useState } from "react";
import Banner from "../../Generic/Banner";
import MaterialButton, { BUTTON_COLOR_SCHEMES } from "../../Generic/MaterialButton";
import ButtonGroup from "../../Generic/ButtonGroup";
import { ERROR_STATES } from "../../Generic/ErrorBanner";
import { analytics, logEvent } from "../../firebase";

export default function AddListBanner({ onFinishEditing, lists, saveLists, className, onError }) {
    const [newList, setNewList] = useState({ name: 'New list', content: [] });

    const resetStatesAndClose = () => {
        setNewList({ name: 'New list', content: [] });
        onFinishEditing();
    }

    const createButtonClickHandler = () => {
        if (newList.name !== '' && newList.name !== null && newList.name !== undefined) {
            const updatedLists = [newList, ...lists];
            saveLists(updatedLists);
            resetStatesAndClose();
            logEvent(analytics, 'add_list');
        } else {
            onError(ERROR_STATES.WRONG_INPUT_NAME);
        }
    }

    return (
        <Banner className={className} title={'New List'}>
            <div>
                <label>Name</label>
                <input type="text"
                    value={newList.name} onChange={(e) => setNewList({ ...newList, name: e.target.value })}
                    placeholder="New list" />
            </div>
            <ButtonGroup>
                <MaterialButton
                    clickEvent={resetStatesAndClose}
                    colorScheme={BUTTON_COLOR_SCHEMES.OUTLINED}
                    iconName={'cancel'}
                    text={'Cancel'}
                />
                <MaterialButton clickEvent={createButtonClickHandler}
                    colorScheme={BUTTON_COLOR_SCHEMES.FILLED} iconName={'list_alt_add'} text={'Create'} />
            </ButtonGroup>
        </Banner>
    );
}