'use client';
import React from 'react';
import MobileTabs from './MobileTabs';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/app/redux/store';
import { toggleMobileTabs } from '@/app/redux/slice/utilitySlice';

const MobileTabsContent = ({ latestMangaUpdate, popularTodayManga, bestRatingManga, recentlyAddManga }:any) => {
  const dispatch = useDispatch();
  const currentTab = useSelector((state: RootState) => state.utility.mobileTabs);

  const renderTabContent = () => {
    switch (currentTab) {
      case 'popular':
        return popularTodayManga;
      case 'best rating':
        return bestRatingManga;
      case 'recently':
        return recentlyAddManga;
      case 'latest':
      default:
        return latestMangaUpdate;
    }
  };

  return (
    <div>
      <MobileTabs currentTab={currentTab} setCurrentTab={(tab: string) => dispatch(toggleMobileTabs(tab))} />
      {renderTabContent()}
    </div>
  );
};

export default MobileTabsContent;
