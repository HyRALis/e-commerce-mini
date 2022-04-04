import React, { useState } from 'react';

import Container from '../UI layer/Container';
import Card from '../UI layer/Card';
import Dropdown from '../UI layer/Dropdown';
import Plus from '../UI layer/svg/Plus';

import styles from '../styles/Pages/Home.module.scss';
import heroImage from '../Assets/Hero.jpg';
import Modal from '../UI layer/Modal';
import AddProductForm from '../Components/AddProductForm';

export default function Home({ products, states, categories, onAddProduct }) {
    const [selectedSortingState, setSelectedSortingState] = useState(null);
    const [selectedSortingCategory, setSelectedSortingCategory] = useState(null);
    const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);

    const productCards = products.map((product) => (
        <div className="col mb-4">
            <Card key={`product_card_${product.id}`} product={product} />
        </div>
    ));

    return (
        <>
            <main className="mb-5">
                <img className={styles.home__heroImage} src={heroImage} alt="Hero" />
                <Container classes={'position-relative'}>
                    <div className={styles.actions__container}>
                        <div className={styles.sorting__container}>
                            <Dropdown
                                options={states}
                                placeholder="Sort by state"
                                onSelectChnage={setSelectedSortingState}
                            />
                            <Dropdown
                                options={categories}
                                placeholder="Sort by category"
                                onSelectChnage={setSelectedSortingCategory}
                            />
                        </div>
                        <button className="custom__button" onClick={() => setIsAddProductModalOpen(true)}>
                            Add Product
                            <Plus fill="#ffffff" width="0.8rem" height="0.8rem" className="ml-2" />
                        </button>
                    </div>
                    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-2 row-cols-lg-3">{productCards}</div>
                </Container>
            </main>
            {isAddProductModalOpen && (
                <Modal title="Add product form" setIsModalOpen={setIsAddProductModalOpen}>
                    <AddProductForm states={states} categories={categories} onAddProduct={onAddProduct} />{' '}
                </Modal>
            )}
        </>
    );
}
