import Footer from './Component/footer/footer'
import './App.css'
import Home from './pages/home/home'
import { Routes, Route } from 'react-router-dom';
import about from './pages/about/about'
import Contact from './pages/contact/contact'

function App() {
    return (
       
        <div>
        
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<about />} /> 
            <Route path="/contact" element={<Contact />} />
        </Routes>
       
        </div>
    )
}

export default App