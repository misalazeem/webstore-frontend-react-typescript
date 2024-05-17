import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import ProductsList from '../components/ProdcutsListr';

const Products = () => {
  const products = useSelector((state: RootState) => state.product.products);
  return (
    <>
      <div className="flex flex-row justify-center items-center py-16 text-3xl font-bold">
        Products
      </div>
      <ProductsList products={products} />
    </>
  );
};

export default Products;
