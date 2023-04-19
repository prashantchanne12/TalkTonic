'use client';

import { useState } from 'react';
import { Switch } from '@material-tailwind/react';

const NsfwSwitch = () => {
  const [enabled, setEnabled] = useState(false);

  return (
    <div className='flex items-center mr-2'>
      <div>
        <p className='font-bold text-sm'>NSFW (18+)</p>
      </div>
      <div className='ml-2 mt-1'>
        <Switch
          color='pink'
          id='pink'
          value={enabled}
          defaultChecked={false}
          onChange={(e) => {
            setEnabled(!enabled);
          }}
        />
      </div>
    </div>
  );
};

export default NsfwSwitch;
