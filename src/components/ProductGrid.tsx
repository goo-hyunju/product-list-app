import React from 'react';
import ProductCard from './ProductCard';
import { Product } from '@/types/product';

interface ProductGridProps {
  products: Product[];
}

const ProductGrid: React.FC<ProductGridProps> = ({ products }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {products.map(product => (
        <div key={product.id}>
          <ProductCard product={product} isListView={false} />
        </div>
      ))}
    </div>
  );
};

export default ProductGrid;