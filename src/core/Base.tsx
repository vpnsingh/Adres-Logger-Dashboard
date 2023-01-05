import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from '../components/Header';
import Dashboard from '../pages/Dashboard';

const Base = () => {
    return (
        <main>
            <BrowserRouter>
                <header>
                    <Header />
                </header>
                <section className='container-fluid'>
                    <Routes>
                        <Route path='' element={<Dashboard />} />
                        <Route path='/home' element={<Dashboard />} />
                        <Route path='/home/:searchData' element={<Dashboard />} />
                    </Routes>    
                </section>
            </BrowserRouter>
        </main>
    )
}

export default Base;