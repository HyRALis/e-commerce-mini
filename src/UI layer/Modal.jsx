import React, { useRef } from 'react';

import { useOnClickOutside } from '../Utils/customHooks';

import styles from '../styles/UI layer/Modal.module.scss';

function Modal({ setIsModalOpen, title }) {
    const modalContainerRef = useRef(null);

    useOnClickOutside(modalContainerRef, () => setIsModalOpen(false));

    return (
        <div className={styles.modalBackground}>
            <div ref={modalContainerRef} className={styles.modalContainer}>
                <div className={styles.titleCloseBtn}>
                    <button
                        onClick={() => {
                            setIsModalOpen(false);
                        }}
                    >
                        X
                    </button>
                </div>
                {title && (
                    <div className={styles.title}>
                        <h1>{title}</h1>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Modal;
