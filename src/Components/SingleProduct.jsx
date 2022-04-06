import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';

import styles from '../styles/Components/SingleProduct.module.scss';

export default function SingleProduct() {
    const selectedProduct = useSelector(({ global }) => global.selectedProduct);
    const categories = useSelector(({ global }) => global.categories);

    const productCategory = useMemo(
        () => categories.find((category) => category.id === selectedProduct.categoryId),
        [selectedProduct, categories]
    );

    return (
        <div className={styles.card}>
            <div className={styles.card__body}>
                <div className={styles.half}>
                    <div className={styles.featured_text}>
                        <h1>{selectedProduct.title}</h1>
                        <p className={styles.sub}>{productCategory.name}</p>
                        <p className={styles.price}>${selectedProduct.price}</p>
                    </div>
                    <div className={styles.image}>
                        <img src={selectedProduct.picture} alt={`${selectedProduct.title}`} />
                    </div>
                </div>
                <div className={styles.half}>
                    <div className={styles.description}>
                        <p>{selectedProduct.description}</p>
                    </div>
                    {selectedProduct.stock !== undefined && (
                        <span className={styles.stock}>
                            <i className="fa fa-pen"></i>
                            {selectedProduct.stock === true ? 'In stock' : 'Unavailable'}
                        </span>
                    )}
                </div>
            </div>
            <div className={styles.card__footer}>
                <div className={styles.recommend}>
                    <p>Recommended by</p>
                    <h3>Andrew Palmer</h3>
                </div>
                <div className={styles.action}>
                    <button type="button">Add to cart</button>
                </div>
            </div>
        </div>
    );
}
