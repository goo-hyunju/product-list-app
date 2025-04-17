import React from 'react';
import ProductCard from './ProductCard';
import { Product } from '@/types/product';

interface ProductListViewProps {
  products: Product[];
}

const ProductListView: React.FC<ProductListViewProps> = ({ products }) => {
  return (
    <div className="space-y-4">
      {products.map(product => (
        <div key={product.id}>
          <ProductCard product={product} isListView={true} />
        </div>
      ))}
    </div>
  );
};

export default ProductListView;