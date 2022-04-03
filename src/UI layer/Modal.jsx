import React from 'react';
import styles from '../styles/UI layer/Modal.module.scss';

function Modal({ setIsModalOpen, title }) {
    return (
        <div
            className={styles.modalBackground}
            onClick={() => {
                setIsModalOpen(false);
            }}
        >
            <div className={styles.modalContainer}>
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
