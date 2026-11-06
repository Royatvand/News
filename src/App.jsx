import './App.css';
import Home from './pages/home/home';
import About from './pages/about/about';
import Contact from './pages/contact/contact';
import { Routes, Route } from 'react-router-dom';
import ArticleDetails from './pages/articleDetails/articleDetails';


function App() {
  return (
    <div>
      <Routes>
      <Route path="/article/:id" element={<ArticleDetails />} />
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </div>
  );
}

export default App;
