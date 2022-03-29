import React from 'react';

import Container from '../UI layer/Container';
import Card from '../UI layer/Card';

import styles from '../styles/Pages/Home.module.scss';

export default function Home({ products, states, categories }) {
    const productCards = products.map((product) => (
        <div className="col">
            <Card key={`product_card_${product.id}`} product={product} />
        </div>
    ));

    return (
        <>
            <img
                className={styles.home__heroImage}
                src="https://images-eu.ssl-images-amazon.com/images/G/02/digital/video/merch2016/Hero/Covid19/Generic/GWBleedingHero_ENG_COVIDUPDATE__XSite_1500x600_PV_en-GB._CB428684220_.jpg"
                alt="Hero"
            />
            <Container>
                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-2 row-cols-lg-3">{productCards}</div>
            </Container>
        </>
    );
}
