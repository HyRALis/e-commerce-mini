import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { fetchDatabase } from './Store/Actions/mainActions';

import Navbar from './Components/Navbar';
import Home from './Pages/Home';
import SingleProductPage from './Pages/SingleProductPage';

import './styles/styles.scss';

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchDatabase());
    }, [dispatch]);

    return (
        // Check if there are products in the store
        // if false => dispatch(getProducts())
        // get the ID from location => products.find((element) => element.id === ID)
        <Router>
            <Navbar />
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route exact path="/product/:productId" element={<SingleProductPage />} />
            </Routes>
        </Router>
    );
}

export default App;
