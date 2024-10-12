'use client'
import { setPublicationDemographic } from '@/app/redux/slice/filterSlice';
import { RootState } from '@/app/redux/store';
import { Demographic } from '@/app/utils/const';
import { sliceParagraph } from '@/app/utils/function';
import { UpDownAngleIcon } from '@/app/utils/Icon';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const DemographicFilter = () => {
  const dispatch = useDispatch()
  
  const {resetButtonClick} = useSelector((state: RootState) => state.filters);

  const [click, setClick] = useState(false); // Untuk mengontrol dropdown
  const [demographic, setDemographic] = useState<string[]>([]); // State untuk menyimpan opsi yang dipilih

  const handleSelection = (item: string) => {
    if (demographic.includes(item.toLowerCase())) {
      // Jika item sudah ada di array, hapus dari array
      setDemographic(demographic.filter((i) => i !== item.toLowerCase()));
    } else {
      // Jika item belum ada, tambahkan ke array
      setDemographic([...demographic, item.toLowerCase()]);
    }
  };

  useEffect(() => {
    dispatch(setPublicationDemographic(demographic))
  }, [demographic])

  // handle resetbutton
  useEffect(() => {
    if (resetButtonClick)
      setDemographic([])
  }, [resetButtonClick])

  return (
    <div className="w-full lg:w-fit flex flex-col gap-[10px] h-full">
      <h3 className='text-gray-500'>Demographic</h3>
      <div className="w-full lg:w-[290px] relative">
        <button
          onClick={() => setClick(!click)}
          className='flex items-center justify-between w-full p-[.5rem] rounded-[5px] bg-secondary'
        >
          <span className='capitalize'>
            {demographic.length > 0 ? sliceParagraph(demographic.join(', '), 3) : 'Any'}
          </span>
          <UpDownAngleIcon />
        </button>
        
        {/* Dropdown */}
        <div className={`w-full absolute left-0 top-[50px] ${click ? 'block' : 'hidden'} transition-all duration-300 ease-in-out flex flex-col rounded-[5px] bg-secondary z-20`}>
          {Demographic.map((item) => (
            <button
              key={item}
              onClick={() => handleSelection(item)}
              className={`text-start capitalize flex items-center justify-between hover:bg-lightGray p-[.3rem] ${
                demographic.includes(item.toLowerCase()) ? 'text-lightOrange' : ''
              }`}
            >
              <span>{item}</span>
              
              {/* Indicator: Show a dot or radio button if selected */}
              <span className="w-[10px] h-[10px] rounded-full" 
                    style={{ backgroundColor: demographic.includes(item.toLowerCase()) ? 'orange' : 'transparent' }}>
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DemographicFilter;
