import React from 'react';

import styles from '../../styles/UI layer/TextInput.module.scss';

export default function TextInput({ type, value, minLength, maxLength, onInput, onChange }) {
    return (
        <input
            type={type}
            className={styles.input}
            value={value}
            minLength={minLength}
            maxLength={maxLength}
            onInput={onInput}
            onChange={(e) => onChange(e.target.value)}
        />
    );
}
