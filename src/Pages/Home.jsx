import React from 'react';
import styles from '../styles/Pages/Home.module.scss';
import Container from '../UI layer/Container';

export default function Home() {
    return (
        <main>
            <img
                className={styles.home__heroImage}
                src="https://images-eu.ssl-images-amazon.com/images/G/02/digital/video/merch2016/Hero/Covid19/Generic/GWBleedingHero_ENG_COVIDUPDATE__XSite_1500x600_PV_en-GB._CB428684220_.jpg"
                alt="Hero"
            />
            <Container></Container>
        </main>
    );
}
