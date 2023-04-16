'use client';

import { useState } from 'react';
import Subreddits from './components/Subreddits';
import Types from './components/Types';
import { SubRedditContext } from './context/SubRedditContext';

const HomePage = () => {
  const [subReddit, setSubReddit] = useState('askReddit');

  return (
    <SubRedditContext.Provider value={{ subReddit, setSubReddit }}>
      <div className='grid grid-cols-3 gap-4 max-w-7xl mx-auto mt-7'>
        <div className='col-span-2'>
          <Types />
        </div>
        <Subreddits className='col-span-1' />
      </div>
    </SubRedditContext.Provider>
  );
};

export default HomePage;
