import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setIsAddProductModalOpen, setSortByState, setSortByCategory } from '../Store/Actions/homeActions';
import { sortingOptions } from '../Utils/consts';

import Container from '../UI layer/Container';
import Card from '../UI layer/Card';
import Dropdown from '../UI layer/Dropdown';
import Plus from '../UI layer/svg/Plus';
import Modal from '../UI layer/Modal';
import AddProductForm from '../Components/AddProductForm';

import styles from '../styles/Pages/Home.module.scss';
import heroImage from '../Assets/Hero.jpg';

export default function Home() {
    const dispatch = useDispatch();

    const products = useSelector(({ global }) => global.products);
    const isAddProductModalOpen = useSelector(({ home }) => home.isAddProductModalOpen);
    const sortByState = useSelector(({ global }) => global.sortByState);
    const sortByPrice = useSelector(({ global }) => global.sortByPrice);

    const productCards = products.map((product) => (
        <div key={`product_card_${product.id}`} className="col mb-4">
            <Card product={product} />
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
                                options={sortingOptions}
                                placeholder="Sort by state"
                                onSelectChange={(sortingMethod) => dispatch(setSortByState(sortingMethod))}
                            />
                            <Dropdown
                                options={sortingOptions}
                                placeholder="Sort by category"
                                onSelectChange={(sortingMethod) => dispatch(setSortByCategory(sortingMethod))}
                            />
                        </div>
                        <button className="custom__button" onClick={() => dispatch(setIsAddProductModalOpen(true))}>
                            Add Product
                            <Plus fill="#ffffff" width="0.8rem" height="0.8rem" className="ml-2" />
                        </button>
                    </div>
                    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-2 row-cols-lg-3">{productCards}</div>
                </Container>
            </main>
            {isAddProductModalOpen && (
                <Modal title="Add product form" setIsModalOpen={(isOpen) => dispatch(setIsAddProductModalOpen(isOpen))}>
                    <AddProductForm />{' '}
                </Modal>
            )}
        </>
    );
}
