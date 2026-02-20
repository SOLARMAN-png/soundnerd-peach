import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import HomePage from "./components/Home"
import Headphones from './components/Headphones'
import Speakers from './components/Speakers'
import Earphones from './components/Earphones'
import ProductDetails from './components/productDetails'
import CheckoutPage from './components/checkout'
import ThankYouPage from './components/ThankYou'
import { CartProvider } from './context/CartContext'




function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/headphones" element={<Headphones />} />
          <Route path="/speakers" element={<Speakers />} />
          <Route path="/earphones" element={<Earphones />} />
          <Route path="/productDetails/:id" element={<ProductDetails />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/thankyou" element={<ThankYouPage />} />
        </Routes>
      </Router>
    </CartProvider>
  )
}

export default App
