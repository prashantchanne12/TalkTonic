'use client';

import { useState } from 'react';
import Subreddits from './components/Subreddits';
import Types from './components/Types';
import { SubRedditContext } from './context/SubRedditContext';
import { NsfwContext } from './context/NsfwContext';
import NsfwSwitch from './components/NsfwSwitch';

const HomePage = () => {
  const [subReddit, setSubReddit] = useState('askReddit');
  const [isNsfw, setIsNsfw] = useState(true);

  return (
    <SubRedditContext.Provider value={{ subReddit, setSubReddit }}>
      <NsfwContext.Provider value={{ isNsfw, setIsNsfw }}>
        <div className='absolute right-[450px] top-[24px]'>
          <NsfwSwitch />
        </div>
        <div className='grid grid-cols-3 gap-4 max-w-7xl mx-auto mt-7'>
          <div className='col-span-2'>
            <Types />
          </div>
          <Subreddits className='col-span-1' />
        </div>
      </NsfwContext.Provider>
    </SubRedditContext.Provider>
  );
};

export default HomePage;
