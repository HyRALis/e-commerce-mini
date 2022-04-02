import React, { useState } from 'react';

import styles from '../styles/UI layer/Dropdown.module.scss';

export default function Dropdown({ options }) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);

    const toggling = () => setIsOpen(!isOpen);

    const onOptionClicked = (value) => () => {
        setSelectedOption(value);
        setIsOpen(false);
        console.log(selectedOption);
    };

    return (
        <div className={styles.main}>
            <h1>Custom Select/dropdown</h1>
            <div className={styles.dropdown__container}>
                <div className={styles.dropdown__container} onClick={toggling}>
                    {selectedOption || 'Mangoes'}
                </div>
                {isOpen && (
                    <div>
                        <ul className={styles.dropdown__list}>
                            {options.map((option) => (
                                <li
                                    className={styles.dropdown__list__item}
                                    onClick={onOptionClicked(option)}
                                    key={Math.random()}
                                >
                                    {option.name}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
}
