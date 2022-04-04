import React from 'react';

import styles from '../../styles/UI layer/Form Elements/ErrorMessage.module.scss';

export default function ErrorMessage({ errorMessage, style }) {
    return (
        <span className={styles.error__message} style={style}>
            {errorMessage}
        </span>
    );
}
