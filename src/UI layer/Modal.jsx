import React, { useRef } from 'react';

import Times from './svg/Times';

import { useOnClickOutside } from '../Utils/customHooks';

import styles from '../styles/UI layer/Modal.module.scss';

function Modal({ setIsModalOpen, title, children }) {
    const modalContainerRef = useRef(null);

    useOnClickOutside(modalContainerRef, () => setIsModalOpen(false));

    return (
        <div className={styles.modalBackground}>
            <div ref={modalContainerRef} className={styles.modalContainer}>
                <div className={styles.titleCloseBtn}>
                    {title && (
                        <div className={styles.title}>
                            <h1>{title}</h1>
                        </div>
                    )}
                    <button
                        onClick={() => {
                            setIsModalOpen(false);
                        }}
                    >
                        <Times fill="#000000" width="1rem" height="1rem" className="ml-2" />
                    </button>
                </div>
                {children}
            </div>
        </div>
    );
}

export default Modal;
