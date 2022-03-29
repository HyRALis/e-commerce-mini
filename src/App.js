import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Navbar from './Components/Navbar';
import Home from './Pages/Home';
import SingleProductPage from './Pages/SingleProductPage';

function App() {
    return (
        <div>
            <Router>
                <Navbar />
                <Routes>
                    <Route exact path="/" element={<Home />} />
                    <Route exact path="/product/:productId" element={<SingleProductPage />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
