import React from "react";
import styles from "./ErrorBanner.module.css";
import Banner, { BANNER_COLOR_SCHEMES } from "./Banner";
import MaterialButton, { BUTTON_COLOR_SCHEMES } from "./MaterialButton";
import MaterialSymbolRounded from "./MaterialSymbolRounded";

export const ERROR_STATES = {
    CLEAR: 'clear',
    WRONG_INPUT_TITLE: 'wrong input title',
    WRONG_INPUT_NAME: 'wrong input name'
}

export default function ErrorBanner({errorState, onClearErrors}) {
    let errorText;

    switch(errorState) {
        case ERROR_STATES.CLEAR:
            errorText = '';
            break;

        case ERROR_STATES.WRONG_INPUT_TITLE:
            errorText = 'Please provide valid title.';
            break;

        case ERROR_STATES.WRONG_INPUT_NAME:
            errorText = 'Please provide valid name.';
            break;

        default:
            errorText = 'Something went wrong...';
            break;
    }

    return (
        <div className={errorState === ERROR_STATES.CLEAR && styles.hidden}>
            <Banner title="Error" className="error" colorScheme={BANNER_COLOR_SCHEMES.ERROR}>
                <strong className={styles['error-message']}>
                    <MaterialSymbolRounded name="error" />
                    <span>{errorText}</span>
                </strong>
                <MaterialButton clickEvent={onClearErrors}
                    colorScheme={BUTTON_COLOR_SCHEMES.FILLED}
                    iconName={'check'} text={'Dimiss'} />
            </Banner>
        </div>
    );
}