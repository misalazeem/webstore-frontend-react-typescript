import heroImg from '../assets/hero.webp';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from '../redux/store';
import ProductsList from '../components/ProdcutsListr';

const Home = () => {
  const products = useSelector((state: RootState) => state.product.products);
  const firstThreeProducts = products.slice(0, 3);

  return (
    <>
      <div className="hero min-h-screen mb-4" style={{ backgroundImage: `url(${heroImg})` }}>
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">Welcome to my Store</h1>
            <p className="mb-5">Browse our Latest prodcuts</p>
            <Link to="/products" className="btn btn-neutral">
              Get Started
            </Link>
          </div>
        </div>
      </div>
      <div className="flex flex-row justify-center items-center py-8 text-2xl">
        Featured Products
      </div>
      <ProductsList products={firstThreeProducts} />
    </>
  );
};

export default Home;
