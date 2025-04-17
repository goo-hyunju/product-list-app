import { useState, useEffect } from 'react';
import { ViewMode } from '@/types/product';

export const useViewMode = (): [ViewMode, (mode: ViewMode) => void] => {
  const [viewMode, setViewMode] = useState<ViewMode>('grid');

  useEffect(() => {
    const savedMode = localStorage.getItem('viewMode');
    const savedTimestamp = localStorage.getItem('viewModeTimestamp');
    const currentTime = new Date().getTime();
    
    // 저장된 모드가 있고, 24시간이 지나지 않았다면 저장된 모드 사용
    if (savedMode && savedTimestamp) {
      const timeDiff = currentTime - parseInt(savedTimestamp);
      const hoursDiff = timeDiff / (1000 * 60 * 60);
      
      // 24시간 이내라면 저장된 모드 적용
      if (hoursDiff < 24) {
        setViewMode(savedMode as ViewMode);
        return;
      }
    }
    
    // 새로운 모드 설정 (50% 확률로 결정)
    const randomMode = Math.random() > 0.5 ? 'grid' : 'list';
    setViewMode(randomMode);
    localStorage.setItem('viewMode', randomMode);
    localStorage.setItem('viewModeTimestamp', currentTime.toString());
  }, []);

  const changeViewMode = (mode: ViewMode) => {
    setViewMode(mode);
    localStorage.setItem('viewMode', mode);
    localStorage.setItem('viewModeTimestamp', new Date().getTime().toString());
  };

  return [viewMode, changeViewMode];
};