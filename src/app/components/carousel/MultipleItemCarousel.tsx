'use client';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/app/redux/store';
import {
  setCurrentIndex,
  setItemsToShow,
  setIsAnimating,
} from '@/app/redux/slice/carouselSlice';
import LoadingSpinner from '../LoadingSpinner';
import { getItemsToShow } from '@/app/utils/function';

interface MultipleItemCarouselProps {
  list: any[];
  ItemComponent: React.ComponentType<any>;
  itemProps?: any;
  mobile: number;
  tablet: number;
  notbook: number;
  desktop: number;
  desktopSidebar: number;
  large: number;
}

const MultipleItemCarousel: React.FC<MultipleItemCarouselProps> = ({
  list,
  ItemComponent,
  itemProps,
  mobile,
  tablet,
  notbook,
  desktop,
  desktopSidebar,
  large,
}) => {
  const dispatch = useDispatch();
  const sidebarClick = useSelector((state: RootState) => state.utility.sidebarClick);
  const { currentIndex, itemsToShow, isAnimating } = useSelector((state: RootState) => state.carousel);

  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchEndX, setTouchEndX] = useState<number | null>(null);

  // Duplicate awal dan akhir elemen untuk infinite loop
  const extendedList = [
    ...list.slice(-itemsToShow),
    ...list,
    ...list.slice(0, itemsToShow),
  ];

  useEffect(() => {
    const handleResize = () => {
      const newItemsToShow = getItemsToShow(
        sidebarClick,
        mobile,
        tablet,
        notbook,
        desktop,
        large,
        desktopSidebar
      );
      dispatch(setItemsToShow(newItemsToShow));
      dispatch(setCurrentIndex(newItemsToShow));
    };

    // Set initial itemsToShow
    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [dispatch]);

  const setSlide = (index: number) => {
    dispatch(setCurrentIndex(index * itemsToShow + itemsToShow));
  };

  const handleTransitionEnd = () => {
    dispatch(setIsAnimating(false));
    if (currentIndex >= extendedList.length - itemsToShow) {
      dispatch(setCurrentIndex(itemsToShow));
    } else if (currentIndex < itemsToShow) {
      dispatch(setCurrentIndex(extendedList.length - itemsToShow * 2));
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEndX(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStartX || !touchEndX) return;
  
    const swipeDistance = touchStartX - touchEndX;
    const minSwipeDistance = 50; // Minimum swipe distance to be considered a swipe
  
    if (swipeDistance > minSwipeDistance) {
      // Swipe left
      dispatch(setCurrentIndex(currentIndex + itemsToShow));
      dispatch(setIsAnimating(true));
    } else if (swipeDistance < -minSwipeDistance) {
      // Swipe right
      dispatch(setCurrentIndex(currentIndex - itemsToShow));
      dispatch(setIsAnimating(true));
    }
  
    // Reset swipe positions
    setTouchStartX(null);
    setTouchEndX(null);
  };  

  return (
    <div className="relative w-full h-full" onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd}>
      {list ? (
        <>
          <div className="overflow-hidden">
            <ul
              className={`h-full flex transition-transform duration-500 ease-in-out ${isAnimating ? 'transform' : ''}`}
              style={{ transform: `translateX(-${(currentIndex * 100) / itemsToShow}%)` }}
              onTransitionEnd={handleTransitionEnd}
            >
              {extendedList.map((item: any, index: number) => (
                <li key={`${item?.id}-${index}`} className="flex-none w-full p-2" style={{ width: `${100 / itemsToShow}%` }}>
                  <ItemComponent manga={item} {...itemProps} />
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-[10px] flex justify-center space-x-2">
            {Array(Math.ceil(list.length / itemsToShow))
              .fill(null)
              .map((_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full focus:outline-none ${index === Math.floor((currentIndex - itemsToShow) / itemsToShow) ? 'bg-lightOrange' : 'bg-gray-300'}`}
                  onClick={() => setSlide(index)}
                />
              ))}
          </div>
        </>
      ) : (
        <div className="flex items-center justify-center w-full">
          <LoadingSpinner width="30px" height="30px" />
        </div>
      )}
    </div>
  );
};

export default MultipleItemCarousel;
