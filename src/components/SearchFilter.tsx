import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FaSearch, FaListUl, FaThLarge, FaFilter, FaTimes } from 'react-icons/fa';
import { ViewMode } from '@/types/product';

interface SearchFilterProps {
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  initialSearchQuery?: string;
  initialSortBy?: string;
  totalItems: number;
}

const SearchFilter: React.FC<SearchFilterProps> = ({
  viewMode, 
  onViewModeChange,
  initialSearchQuery = '',
  initialSortBy = '',
  totalItems = 0
}) => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  const [sortBy, setSortBy] = useState(initialSortBy);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    setSearchQuery(initialSearchQuery);
    setSortBy(initialSortBy);
  }, [initialSearchQuery, initialSortBy]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // URL에 검색 파라미터 적용
    const params = new URLSearchParams();
    
    if (searchQuery) {
      params.set('q', searchQuery);
    }
    
    if (sortBy) {
      params.set('sort', sortBy);
    }
    
    router.push(`/?${params.toString()}`);
  };

  const clearSearch = () => {
    setSearchQuery('');
    if (initialSearchQuery) {
      router.push('/');
    }
  };

  return (
    <div className="mb-6">
      <form onSubmit={handleSubmit} className="relative">
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="relative flex-1">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="검색어를 입력하세요..."
              className="w-full p-4 text-gray-600 pl-12 border border-gray-200 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            />
            <div className="absolute left-4 top-4 text-gray-400">
              <FaSearch />
            </div>
            {searchQuery && (
              <button
                type="button"
                onClick={clearSearch}
                className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
              >
                <FaTimes />
              </button>
            )}
          </div>
          
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="p-4 border border-gray-200 rounded-xl shadow-sm hover:bg-gray-50 flex items-center gap-2"
            >
              <FaFilter className="text-gray-600" />
              <span className="hidden md:inline text-gray-600 ">필터</span>
            </button>
            
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="p-4 text-gray-600 border border-gray-200 rounded-xl shadow-sm hover:bg-gray-50 min-w-[120px]"
            >
              <option value="" >추천순</option>
              <option value="rating">별점 높은순</option>
              <option value="price-desc">가격 높은순</option>
              <option value="price-asc">가격 낮은순</option>
            </select>
            
            <button 
              type="submit"
              className="bg-blue-600 text-white px-6 py-4 rounded-xl hover:bg-blue-700 shadow-sm transition-colors font-medium min-w-[100px]"
            >
              검색
            </button>
          </div>
        </div>
        
        {isFilterOpen && (
          <div className="p-4 bg-white border border-gray-200 rounded-xl mb-4 shadow-sm">
            <h3 className="font-medium mb-3">추가 필터</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">카테고리</label>
                <select className="w-full p-2 border border-gray-200 rounded-lg">
                  <option value="">모든 카테고리</option>
                  <option value="electronics">전자제품</option>
                  <option value="clothing">의류</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">브랜드</label>
                <select className="w-full p-2 border border-gray-200 rounded-lg">
                  <option value="">모든 브랜드</option>
                  <option value="apple">Apple</option>
                  <option value="samsung">Samsung</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">가격 범위</label>
                <div className="flex gap-2">
                  <input type="number" placeholder="최소" className="w-full p-2 border border-gray-200 rounded-lg" />
                  <input type="number" placeholder="최대" className="w-full p-2 border border-gray-200 rounded-lg" />
                </div>
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">할인 상품</label>
                <select className="w-full p-2 border border-gray-200 rounded-lg">
                  <option value="">모든 상품</option>
                  <option value="discount">할인 상품만</option>
                </select>
              </div>
            </div>
          </div>
        )}
      </form>
      
      <div className="flex justify-between items-center mt-6">
        <div className="text-gray-600">
          총 <span className="font-medium">{totalItems}</span>개 상품
        </div>
        
        <div className="flex items-center">
          <span className="mr-3 text-gray-600">뷰 모드:</span>
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button 
              onClick={() => onViewModeChange('grid')}
              className={`p-2 rounded-md transition ${viewMode === 'grid' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-500'}`}
            >
              <FaThLarge />
            </button>
            <button 
              onClick={() => onViewModeChange('list')}
              className={`p-2 rounded-md transition ${viewMode === 'list' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-500'}`}
            >
              <FaListUl />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchFilter;