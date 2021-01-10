import './styles.css';
import StepsHeader from './StepsHeader';
import ProductsList from './ProductsList';
import { useEffect, useState } from 'react';
import { Product } from './types';
import { OrderLocationData } from './types';
import { fetchProducts, saveOrder } from '../api';
import OrderLocation from '../Orders/OrderLocation';
import OrderSummary from './OrderSummary';
import Footer from '../Footer';
import { checkIsSelected } from './helpers';
import { toast } from 'react-toastify';

function Orders() {

    const [products, setProducts] = useState<Product[]>([]);
    const [orderLocation, setOrderLocation] = useState<OrderLocationData>();
    const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
    const totalPrice = selectedProducts.reduce((sum, item) => {
        return sum + item.price;
    },0)

    useEffect(() => {
        fetchProducts()
            .then(response => setProducts(response.data))
            .catch(err => console.log(err))
    }, []);

    const handleSelectProduct = (product: Product) => {
        const isAlreadySelected = checkIsSelected(selectedProducts, product)
      
        if (isAlreadySelected) {
          const selected = selectedProducts.filter(item => item.id !== product.id);
          setSelectedProducts(selected);
        } else {
          setSelectedProducts(previous => [...previous, product]);
        }
      }

      const handleSubmit = () => {
        const productsIds = selectedProducts.map(({ id }) => ({ id }));
        const payload = {
          ...orderLocation!,
          products: productsIds
        }
      
        saveOrder(payload).then((response) => {
          toast.error(`Pedido enviado com sucesso! Nº ${response.data.id}`);
          setSelectedProducts([]);
        })
          .catch(() => {
            toast.warning('Erro ao enviar pedido');
          })
      }

    return (
        <>
            <div>
                <div className="orders-container">
                    <StepsHeader />
                    <ProductsList selectedProducts={selectedProducts} onSelectProduct={handleSelectProduct} products={products} />
                    <OrderLocation onChangeLocation={location => setOrderLocation(location)} />
                    <OrderSummary onSubmit={handleSubmit} amount={selectedProducts.length} totalPrice={totalPrice} />
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Orders;