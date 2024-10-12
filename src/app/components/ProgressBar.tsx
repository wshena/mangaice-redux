'use client';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

const ProgressBar = ({ totalImages }: { totalImages: number }) => {
  const ChapterDisplaySetting = useSelector((state:RootState) => state.utility.ChapterDisplaySetting);
  const progress = useSelector((state:RootState) => state.readingProgress.progress);
  const theme = useSelector((state:RootState) => state.theme.theme);

  const [progressPercentage, setProgressPercentage] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      
      // Update progress percentage based on the current scroll position
      const scrolled = (scrollTop / scrollHeight) * 100;
      setProgressPercentage(scrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`fixed bottom-0 left-0 w-full bg-gray-300 h-2 mt-4 ${ChapterDisplaySetting !== 'Long Strip' && 'hidden'}`}>
      <div
        className={`${theme !== 'dracula' ? 'bg-lightOrange' : 'bg-lightPurple'} h-2 transition-all duration-300`}
        style={{ width: `${progressPercentage}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;
