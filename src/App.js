import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { getDatabase } from './Utils/ajaxRequests';

import Navbar from './Components/Navbar';
import Home from './Pages/Home';
import SingleProductPage from './Pages/SingleProductPage';

import './styles/styles.scss';

function App() {
    const [products, setProducts] = useState([]);
    const [states, setStates] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);

    useEffect(() => {
        const fetchDatabase = async () => {
            const database = await getDatabase();

            setProducts(database.products);
            setStates(database.states);
            setCategories(database.categories);
        };

        fetchDatabase();
    }, []);

    const addNewProduct = (newProduct) => {
        setProducts([...products, newProduct]);
    };

    return (
        <Router>
            <Navbar />
            <Routes>
                <Route
                    exact
                    path="/"
                    element={
                        <Home
                            products={products}
                            states={states}
                            categories={categories}
                            onAddProduct={addNewProduct}
                        />
                    }
                />
                <Route
                    exact
                    path="/product/:productId"
                    element={<SingleProductPage selectedProduct={selectedProduct} />}
                />
            </Routes>
        </Router>
    );
}

export default App;
