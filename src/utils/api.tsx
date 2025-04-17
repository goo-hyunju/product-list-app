// utils/api.ts의 수정된 버전
import axios from 'axios';
import { ProductsResponse, SearchParams } from '@/types/product';

const BASE_URL = 'https://dummyjson.com/products';

export const fetchProducts = async (params: SearchParams): Promise<ProductsResponse> => {
  try {
    const { q, sort, limit, skip } = params;
    
    // 검색어가 있으면 search API 사용
    if (q && q.trim() !== '') {
      // 여기가 문제일 수 있습니다. DummyJSON API의 search 엔드포인트 확인
      const response = await axios.get(`${BASE_URL}/search`, { 
        params: { q, limit, skip } 
      });
      
      // API 응답 확인용 로그
      console.log('Search API response:', response.data);
      
      // 정렬 적용 (API가 직접 지원하지 않을 경우)
      let products = response.data.products;
      if (sort === 'rating') {
        products = products.sort((a: any, b: any) => b.rating - a.rating);
      }
      
      return {
        ...response.data,
        products
      };
    }

    // 기본 API 사용
    const url = `${BASE_URL}`;
    const response = await axios.get(url, { 
      params: { limit, skip } 
    });
    
    let products = response.data.products;
    
    // 별점에 따른 정렬 적용
    if (sort === 'rating') {
      products = products.sort((a: any, b: any) => b.rating - a.rating);
    }
    
    return {
      ...response.data,
      products
    };
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};