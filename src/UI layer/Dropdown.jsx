import React, { useRef, useState, useMemo } from 'react';

import ArrowDown from './svg/ArrowDown';

import { useOnClickOutside } from '../Utils/customHooks';

import styles from '../styles/UI layer/Dropdown.module.scss';

export default function Dropdown({ options, placeholder, onSelectChange, selected = null, containerStyle, hasError }) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(selected);
    const headerClass = useMemo(
        () => (!hasError ? `${styles.dropdown__header}` : `${styles.dropdown__header} ${styles.error}`),
        [hasError]
    );

    const dropdownRef = useRef(null);

    const toggling = () => setIsOpen(!isOpen);

    const onOptionClicked = (option) => () => {
        setSelectedOption(option.name);
        setIsOpen(false);
        onSelectChange(option);
    };

    useOnClickOutside(dropdownRef, () => setIsOpen(false));

    return (
        <div ref={dropdownRef} className={styles.dropdown__container} style={containerStyle}>
            <div className={headerClass} aria-haspopup="listbox" aria-expanded={isOpen} onClick={toggling}>
                <span>{selectedOption || placeholder}</span>
                <ArrowDown fill="#F3837D" width="0.8rem" height="0.8rem" className={styles.rotatesvg} />
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
