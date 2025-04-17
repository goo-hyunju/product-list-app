import React, { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useSearchParams } from 'next/navigation';
import { useViewMode } from '@/hooks/useViewMode';
import { useProducts } from '@/hooks/useProducts';
import ProductGrid from './ProductGrid';
import ProductListView from './ProductListView';
import SearchFilter from './SearchFilter';
import LoadingIndicator from './LoadingIndicator';
import { FaBoxOpen, FaSearch } from 'react-icons/fa';

const ProductList: React.FC = () => {
  const searchParams = useSearchParams();
  const [viewMode, setViewMode] = useViewMode();
  const { ref, inView } = useInView();
  
  const {
    products,
    isLoading,
    error,
    hasMore,
    total,
    loadMoreProducts
  } = useProducts();

  // 스크롤 감지 시 추가 로딩
  useEffect(() => {
    if (inView) {
      loadMoreProducts();
    }
  }, [inView, loadMoreProducts]);

  const searchQuery = searchParams.get('q') || '';

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold mb-2 text-gray-800">상품 카탈로그</h1>
          <p className="text-gray-600">최고의 상품들을 만나보세요</p>
        </header>
        
        <SearchFilter 
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          initialSearchQuery={searchParams.get('q') || ''}
          initialSortBy={searchParams.get('sort') || ''}
          totalItems={total}
        />
        
        {error && (
          <div className="bg-red-50 text-red-700 p-4 rounded-xl mb-6 flex items-center">
            <div className="bg-red-100 p-2 rounded-full mr-3">
              <FaSearch className="text-red-500" />
            </div>
            <div>
              <h3 className="font-medium">오류가 발생했습니다</h3>
              <p className="text-sm">{error}</p>
            </div>
          </div>
        )}
        
        {searchQuery && (
          <div className="mb-6 bg-blue-50 text-blue-700 p-4 rounded-xl">
            <p>
              <span className="font-medium">"{searchQuery}"</span>에 대한 검색 결과입니다.
            </p>
          </div>
        )}
        
        {products.length === 0 && !isLoading ? (
          <div className="text-center py-16 bg-gray-50 rounded-xl">
            <div className="flex justify-center mb-4">
              <FaBoxOpen className="text-5xl text-gray-300" />
            </div>
            <h3 className="text-xl font-medium text-gray-800 mb-2">일치하는 결과가 없습니다.</h3>
            <p className="text-gray-600">다른 검색어로 시도해보세요.</p>
          </div>
        ) : (
          <>
            <div className="mb-6 fade-in">
              {viewMode === 'grid' ? (
                <ProductGrid products={products} />
              ) : (
                <ProductListView products={products} />
              )}
            </div>
          </>
        )}
        
        {isLoading && <LoadingIndicator />}
        
        {!isLoading && !hasMore && products.length > 0 && (
          <div className="text-center text-gray-500 py-6 border-t mt-8">
            <p className="font-medium">더 이상 불러올 상품이 없습니다.</p>
            <p className="text-sm mt-1">총 {total}개의 상품을 모두 확인하셨습니다.</p>
          </div>
        )}
        
        {/* 무한 스크롤 감지 엘리먼트 */}
        <div ref={ref} className="h-10" />
      </div>
    </div>
  );
};

export default ProductList;