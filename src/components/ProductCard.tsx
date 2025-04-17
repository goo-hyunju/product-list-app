import React from 'react';
import Image from 'next/image';
import { FaStar, FaRegStar, FaHeart } from 'react-icons/fa';
import { Product } from '@/types/product';

interface ProductCardProps {
  product: Product;
  isListView: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, isListView }) => {
  // 별점을 정수와 소수로 분리
  const fullStars = Math.floor(product.rating);
  const hasHalfStar = product.rating % 1 >= 0.5;
  
  return (
    <div 
      className={`bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 hover-scale
        ${isListView ? 'flex' : 'flex flex-col h-full'}`}
    >
      <div className={`relative ${isListView ? 'w-48 h-48 shrink-0' : 'w-full h-56'}`}>
        <Image
          src={product.thumbnail}
          alt={product.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover"
          onError={(e) => {
            e.currentTarget.src = '/placeholder-image.jpg';
          }}
        />
        <div className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-sm hover:bg-red-50 cursor-pointer transition-colors">
          <FaHeart className="text-gray-300 hover:text-red-500" />
        </div>
        {product.discountPercentage > 0 && (
          <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-md text-xs font-bold">
            -{Math.round(product.discountPercentage)}%
          </div>
        )}
      </div>

      <div className={`p-4 flex flex-col ${isListView ? 'flex-1' : ''}`}>
        <div className="flex-1">
          <p className="text-xs text-gray-500 font-medium mb-1 uppercase">{product.brand}</p>
          <h3 className="text-lg font-semibold mb-1 text-gray-800 truncate">{product.title}</h3>
          
          <div className="flex items-center mb-3">
            <div className="flex text-amber-400 mr-2">
              {[...Array(5)].map((_, i) => (
                <span key={i}>
                  {i < fullStars ? (
                    <FaStar />
                  ) : i === fullStars && hasHalfStar ? (
                    <FaStar className="text-amber-400" />
                  ) : (
                    <FaRegStar />
                  )}
                </span>
              ))}
            </div>
            <span className="font-medium text-amber-600">{product.rating.toFixed(1)}</span>
            <span className="text-gray-500 ml-2 text-sm">({Math.floor(product.stock / 2)}개 리뷰)</span>
          </div>
          
          <p className={`text-gray-600 text-sm mb-4 ${isListView ? '' : 'line-clamp-2'}`}>
            {product.description}
          </p>
        </div>
        
        <div className="flex justify-between items-center mt-2">
          <div>
            {product.discountPercentage > 0 ? (
              <div className="flex items-baseline">
                <span className="text-lg font-bold text-gray-900">${(product.price * (1 - product.discountPercentage / 100)).toFixed(2)}</span>
                <span className="ml-2 text-sm text-gray-500 line-through">${product.price.toFixed(2)}</span>
              </div>
            ) : (
              <span className="text-lg font-bold text-gray-900">${product.price.toFixed(2)}</span>
            )}
          </div>
          
          <button className="bg-blue-600 hover:bg-blue-700 text-white py-1 px-3 rounded-lg text-sm transition-colors">
            장바구니
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;