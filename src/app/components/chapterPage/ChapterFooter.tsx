'use client';
import { RootState } from '@/app/redux/store';
import { getTitle } from '@/app/utils/function';
import Link from 'next/link';
import React from 'react'
import { useSelector } from 'react-redux';

const ChapterFooter = ({chapterData}:{chapterData:any}) => {
  const nextChapter = useSelector((state:RootState) => state.utility.nextChapter);
  const ChapterDisplaySetting = useSelector((state:RootState) => state.utility.ChapterDisplaySetting);
  const theme = useSelector((state:RootState) => state.theme.theme);

  const mangaRelationData = chapterData?.relationships?.find((rel:any) => rel.type === 'manga');

  return (
    <section className={`w-full text-white ${ChapterDisplaySetting === 'Single Page' && 'hidden'}`}>
      {nextChapter ? (
        <Link
          href={`/chapter/${nextChapter?.id}`}
          className={`block text-center w-full ${theme !== 'dracula' ? 'bg-lightOrange' : 'bg-lightPurple'} text-white font-bold p-[.8rem]`}
        >
          Next Chapter
        </Link>
      ) : (
        <Link
          href={`/title/${mangaRelationData?.id}/${getTitle(mangaRelationData?.attributes?.title)}`}
          className={`block text-center w-full ${theme !== 'dracula' ? 'bg-lightOrange' : 'bg-lightPurple'} text-white font-bold p-[.8rem]`}
        >
          Return to Title Page
        </Link>
      )}
    </section>
  )
}

export default ChapterFooter