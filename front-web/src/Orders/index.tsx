import './styles.css';
import StepsHeader from './StepsHeader';
import ProductsList from './ProductsList';
import { useEffect, useState } from 'react';
import { Product } from './types';
import { OrderLocationdata } from './types';
import { fetchProducts } from '../api';
import  OrderLocation  from '../Orders/OrderLocation';

function Orders(){
    
    const [products, setProducts] = useState<Product[]>([]);
    const [orderLocation, setOrderLocation] = useState<OrderLocationdata>(); 
    
    useEffect(() => {
        fetchProducts()
        .then(response => setProducts(response.data))
        .catch(err => console.log(err))
    }, []);

    return (
      <div>
          <h1 className="orders-container">
              <StepsHeader />
              <ProductsList products= {products} />
              <OrderLocation onChangeLocation={location => setOrderLocation(location)} />
          </h1>
      </div>
    )
}

export default Orders;