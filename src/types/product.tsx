export interface Product {
    id: number;
    title: string;
    description: string;
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
    brand: string;
    category: string;
    thumbnail: string;
    images: string[];
  }
  
  export interface ProductsResponse {
    products: Product[];
    total: number;
    skip: number;
    limit: number;
  }
  
  export type ViewMode = 'list' | 'grid';
  
  export interface SearchParams {
    q?: string;
    sort?: 'rating' | '';
    limit: number;
    skip: number;
  }