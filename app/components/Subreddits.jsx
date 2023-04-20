'use client';

import { useState, useContext } from 'react';
import { RadioGroup } from '@headlessui/react';
import { SubRedditContext } from '../context/SubRedditContext';

const subReddits = [
  {
    name: 'r/askReddit',
  },
  {
    name: 'r/askMen',
  },
  {
    name: 'r/askWomen',
  },
];

const Subreddits = () => {
  const [selected, setSelected] = useState(subReddits[0]);
  const { setSubReddit } = useContext(SubRedditContext);

  const handleChange = (subReddit) => {
    setSelected(subReddit);
    setSubReddit(subReddit.name.split('/')[1]);
  };

  return (
    <div className='w-full px-4'>
      <div className='mx-auto w-full max-w-md'>
        <RadioGroup value={selected} onChange={handleChange}>
          <RadioGroup.Label className='sr-only'>Server size</RadioGroup.Label>
          <div className='space-y-2'>
            {subReddits.map((subReddit) => (
              <RadioGroup.Option
                key={subReddit.name}
                value={subReddit}
                className={({ active, checked }) =>
                  `${
                    active
                      ? 'ring-2 ring-white ring-opacity-60 ring-offset-2 ring-offset-[#FF2E63]'
                      : ''
                  }
                    ${
                      checked
                        ? 'bg-[#FF2E63] bg-opacity-75 text-white'
                        : 'bg-white'
                    }
                      relative flex cursor-pointer rounded-lg px-5 py-4 shadow-lg focus:outline-none hover:scale-105 trasnform transition-all duration-300 ease-out`
                }
              >
                {({ active, checked }) => (
                  <>
                    <div className='flex w-full items-center justify-between '>
                      <div className='flex items-center'>
                        <div className='text-sm'>
                          <RadioGroup.Label
                            as='p'
                            className={`text-[16px] ${
                              checked ? 'text-white' : 'text-gray-900'
                            }`}
                          >
                            {subReddit.name}
                          </RadioGroup.Label>
                        </div>
                      </div>
                      {checked && (
                        <div className='shrink-0 text-white'>
                          <CheckIcon className='h-6 w-6' />
                        </div>
                      )}
                    </div>
                  </>
                )}
              </RadioGroup.Option>
            ))}
          </div>
        </RadioGroup>
      </div>
    </div>
  );
};

export default Subreddits;

function CheckIcon(props) {
  return (
    <svg viewBox='0 0 24 24' fill='none' {...props}>
      <circle cx={12} cy={12} r={12} fill='#fff' opacity='0.2' />
      <path
        d='M7 13l3 3 7-7'
        stroke='#fff'
        strokeWidth={1.5}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
}
