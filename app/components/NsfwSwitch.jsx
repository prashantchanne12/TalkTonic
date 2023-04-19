'use client';

import { Switch } from '@material-tailwind/react';
import { NsfwContext } from '../context/NsfwContext';
import { useContext } from 'react';

const NsfwSwitch = () => {
  const { setIsNsfw, isNsfw } = useContext(NsfwContext);

  return (
    <div>
      <div className='flex items-center mr-2'>
        <div>
          <p className='font-bold text-sm'>NSFW (18+)</p>
        </div>
        <div className='ml-2 mt-1'>
          <Switch
            color='pink'
            id='pink'
            defaultChecked
            onChange={(e) => {
              setIsNsfw(!isNsfw);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default NsfwSwitch;
