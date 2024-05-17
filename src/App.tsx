import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import Home from './pages/Home';
import Register from './pages/Auth/Register';
import Login from './pages/Auth/Login';
import Products from './pages/Products';
import Footer from './components/Footer/Footer';
import CartPage from './pages/CartPage';
import Checkout from './pages/Checkout';

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/products" element={<Products />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
