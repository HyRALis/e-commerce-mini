import React, { useMemo } from 'react';

import styles from '../../styles/UI layer/Form Elements/TextInput.module.scss';

export default function TextInput({ type, value, minLength, maxLength, onInput, onChange, hasError }) {
    const inputClass = useMemo(() => (!hasError ? `${styles.input}` : `${styles.input} ${styles.error}`), [hasError]);

    return (
        <input
            type={type}
            className={inputClass}
            value={value}
            minLength={minLength}
            maxLength={maxLength}
            onInput={onInput}
            onChange={(e) => onChange(e.target.value)}
        />
    );
}
