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
        <div className='right-5 md:right-[200px] absolute lg:right-[450px] top-[24px]'>
          <NsfwSwitch />
        </div>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto mt-7'>
          <div className='md:col-span-2 order-last md:order-first'>
            <Types />
          </div>
          <Subreddits className='md:col-span-1' />
        </div>
      </NsfwContext.Provider>
    </SubRedditContext.Provider>
  );
};

export default HomePage;
