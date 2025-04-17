// hooks/useProducts.tsx 수정된 버전
import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import { Product, SearchParams } from '@/types/product';
import { fetchProducts } from '@/utils/api';

export const useProducts = () => {
  const searchParams = useSearchParams();
  
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [total, setTotal] = useState(0);
  
  // 검색 파라미터 가져오기
  const q = searchParams.get('q') || '';
  const sort = searchParams.get('sort') as 'rating' | '' || '';
  
  const [params, setParams] = useState<SearchParams>({
    q,
    sort,
    limit: 20,
    skip: 0
  });

  // 디버깅용 로그
  useEffect(() => {
    console.log('Search params changed:', { q, sort });
  }, [q, sort]);

  const loadProducts = useCallback(async (loadMore = false) => {
    try {
      setIsLoading(true);
      setError(null);
      
      const currentParams = loadMore 
        ? { ...params, skip: products.length } 
        : { ...params, skip: 0 };
      
      // 디버깅용 로그
      console.log('Fetching products with params:', currentParams);
      
      if (!loadMore) {
        setProducts([]);
      }
      
      const response = await fetchProducts(currentParams);
      
      setTotal(response.total);
      
      if (loadMore) {
        setProducts(prev => [...prev, ...response.products]);
      } else {
        setProducts(response.products);
      }
      
      setHasMore(products.length + response.products.length < response.total);
    } catch (err) {
      setError('상품을 불러오는 중 오류가 발생했습니다.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [params, products.length]);

  // 검색 파라미터 변경 시 실행
  useEffect(() => {
    setParams({
      q,
      sort,
      limit: 20,
      skip: 0
    });
  }, [q, sort]);

  // params가 변경되면 상품 새로 로드
  useEffect(() => {
    loadProducts(false);
  }, [params]);

  const loadMoreProducts = useCallback(() => {
    if (!isLoading && hasMore) {
      loadProducts(true);
    }
  }, [isLoading, hasMore, loadProducts]);

  return {
    products,
    isLoading,
    error,
    hasMore,
    total,
    loadMoreProducts,
    searchParams: params
  };
};