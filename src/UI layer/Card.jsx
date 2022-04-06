import React from 'react';

import styles from '../styles/UI layer/Card.module.scss';

export default function Card({ product, onClick }) {
    const { title, price, picture } = product;

    return (
        <div className={styles.card} onClick={onClick}>
            <div className={styles.imgBox}>
                <img src={picture} alt={title} className={styles.productImage} />
            </div>
            <div className={styles.contentBox}>
                <h3>{title}</h3>
                <h2 className={styles.price}>{price}€</h2>
                <a href="#" className={styles.buy}>
                    Buy Now
                </a>
            </div>
        </div>
    );
}
