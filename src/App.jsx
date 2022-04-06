import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { fetchDatabase } from './Store/Actions/mainActions';

import Navbar from './Components/Navbar';
import Home from './Pages/Home';

import './styles/styles.scss';

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchDatabase());
    }, [dispatch]);

    return (
        <Router>
            <Navbar />
            <Routes>
                <Route exact path="/" element={<Home />} />
            </Routes>
        </Router>
    );
}

export default App;
