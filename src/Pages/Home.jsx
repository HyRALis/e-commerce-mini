import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
    setIsAddProductModalOpen,
    setSortByName,
    setSortByPrice,
    setIsSingleProductModalOpen
} from '../Store/Actions/homeActions';
import { setSelectedProduct } from '../Store/Actions/mainActions';
import { sortingOptions } from '../Utils/consts';

import Container from '../UI layer/Container';
import Card from '../UI layer/Card';
import Dropdown from '../UI layer/Dropdown';
import Plus from '../UI layer/svg/Plus';
import Modal from '../UI layer/Modal';
import AddProductForm from '../Components/AddProductForm';
import SingleProduct from '../Components/SingleProduct';

import styles from '../styles/Pages/Home.module.scss';
import heroImage from '../Assets/Hero.jpg';

export default function Home() {
    const dispatch = useDispatch();

    const products = useSelector(({ global }) => global.products);
    const isAddProductModalOpen = useSelector(({ home }) => home.isAddProductModalOpen);
    const isSingleProductModalOpen = useSelector(({ home }) => home.isSingleProductModalOpen);
    const sortByName = useSelector(({ home }) => home.sortByName);
    const sortByPrice = useSelector(({ home }) => home.sortByPrice);

    const onCardClick = (product) => {
        dispatch(setSelectedProduct(product));
        dispatch(setIsSingleProductModalOpen(true));
    };

    const onSingleProductModalClose = () => {
        dispatch(setIsSingleProductModalOpen(false));
        dispatch(setSelectedProduct(null));
    };

    const sortProducts = () => {
        const property = sortByName && sortByName.id ? 'title' : sortByPrice && sortByPrice.id ? 'price' : '';
        const order = (sortByName && sortByName.id) || (sortByPrice && sortByPrice.id);

        return sortBy(products, property, order);
    };

    const sortBy = (array, property, order) => {
        if (array.length <= 1) return array;
        return array.sort((firstElement, secondElement) => {
            if (typeof firstElement[property] === 'string' && typeof secondElement[property] === 'string') {
                const el1 = firstElement[property].toLowerCase();
                const el2 = secondElement[property].toLowerCase();
                return order < 1 ? el1 > el2 : el1 < el2;
            }
            if (typeof firstElement[property] === 'number' && typeof secondElement[property] === 'number') {
                if (order < 1) {
                    return firstElement[property] > secondElement[property];
                }
                return firstElement[property] < secondElement[property];
            }

            return 1;
        });
    };

    const sortedProducts = sortProducts();

    const productCards = sortedProducts.map((product) => (
        <div key={`product_card_${product.id}`} className="col mb-4">
            <Card product={product} onClick={() => onCardClick(product)} />
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
                                onSelectChange={(sortingMethod) => {
                                    dispatch(setSortByName(sortingMethod));
                                    sortByPrice && dispatch(setSortByPrice(null));
                                }}
                            />
                            <Dropdown
                                options={sortingOptions}
                                placeholder="Sort by category"
                                onSelectChange={(sortingMethod) => {
                                    sortByName && dispatch(setSortByName(null));
                                    dispatch(setSortByPrice(sortingMethod));
                                }}
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
            {isSingleProductModalOpen && (
                <Modal setIsModalOpen={() => onSingleProductModalClose()}>
                    <SingleProduct />
                </Modal>
            )}
        </>
    );
}
