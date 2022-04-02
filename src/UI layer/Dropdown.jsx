import React, { useEffect, useRef, useState } from 'react';

import { useOnClickOutside } from '../Utils/customHooks';

import styles from '../styles/UI layer/Dropdown.module.scss';
import ArrowDown from './svg/ArrowDown';

export default function Dropdown({ options, placeholder, onSelectChnage }) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);

    const dropdownRef = useRef(null);

    const toggling = () => setIsOpen(!isOpen);

    const onOptionClicked = (option) => () => {
        setSelectedOption(option.name);
        setIsOpen(false);
        onSelectChnage(option);
    };

    useOnClickOutside(dropdownRef, () => setIsOpen(false));

    return (
        <div ref={dropdownRef} className={styles.dropdown__container}>
            <div className={styles.dropdown__header} aria-haspopup="listbox" aria-expanded={isOpen} onClick={toggling}>
                <span>{selectedOption || placeholder}</span>
                <ArrowDown fill="#3faffa" width="0.8rem" height="0.8rem" className={styles.rotatesvg} />
            </div>
            {isOpen && (
                <ul className={styles.dropdown__list} role="listbox" tabIndex={-1}>
                    {options.map((option) => (
                        <li
                            key={option.id}
                            className={styles.dropdown__list__item}
                            onClick={onOptionClicked(option)}
                            tabIndex={0}
                        >
                            {option.name}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
