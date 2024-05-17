import { useDispatch } from 'react-redux';
import { addToCart } from "../redux/Cart/CartActions";
import { AppDispatch } from '../redux/store';

type Product = {
  _id: string;
  name: string;
  description: string;
  image: string;
  price: number;
}

type ProductsListProps = {
  products: Product[];
}

const ProductsList: React.FC<ProductsListProps> = ({ products }) => {
  const dispatch:AppDispatch = useDispatch();
  return (
    <div className="flex flex-wrap gap-4 px-24 items-center md:gap-16 lg:gap-16">
      {products?.map((product) => (
        <div key={product._id} className="card w-96 bg-base-100 shadow-xl">
          <figure><img src={product.image} alt={product.name} className="h-[300px]"/></figure>
          <div className="card-body">
            <h2 className="card-title">{product.name}</h2>
            <p>{product.description}</p>
            <p><b>${product.price}</b></p> 
            <div className="card-actions justify-end">
              <button onClick={() => dispatch(addToCart(product))} className="btn btn-primary">Add to Cart</button>
            </div>
          </div>
        </div>
      ))}
  </div>
  );
}

export default ProductsList;