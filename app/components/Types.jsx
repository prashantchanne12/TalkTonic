'use client';

import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from '@material-tailwind/react';
import {
  FireIcon,
  HandThumbUpIcon,
  RocketLaunchIcon,
} from '@heroicons/react/24/outline';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

const Types = () => {
  const [posts, setPosts] = useState([]);
  const headers = {
    'User-Agent': 'Reddit Bot',
  };

  useEffect(() => {
    async function getPosts() {
      const response = await fetch('/api/posts');
      const posts = await response.json();
      console.log(posts);
      setPosts(posts);
    }

    getPosts();
  }, []);

  const data = [
    {
      label: 'Hot',
      value: 'hot',
      icon: FireIcon,
      desc: `It really matters and then like it really doesn't matter.
            What matters is the people who are sparked by it. And the people
            who are like offended by it, it doesn't matter.`,
    },
    {
      label: 'New',
      value: 'new',
      icon: RocketLaunchIcon,
      desc: `Because it's about motivating the doers. Because I'm here
            to follow my dreams and inspire other people to follow their dreams, too.`,
    },
    {
      label: 'Top',
      value: 'top',
      icon: HandThumbUpIcon,
      desc: `We're not always in the position that we want to be at.
            We're constantly growing. We're constantly making mistakes. We're
            constantly trying to express ourselves and actualize our dreams.`,
    },
  ];

  return (
    <>
      <Tabs id='custom-animation' value='html'>
        <TabsHeader>
          {data.map(({ label, value, icon }) => (
            <Tab key={value} value={value}>
              <div className='flex items-center gap-2'>
                {React.createElement(icon, { className: 'w-5 h-5' })}
                {label}
              </div>
            </Tab>
          ))}
        </TabsHeader>
        <TabsBody
          animate={{
            initial: { y: 250 },
            mount: { y: 0 },
            unmount: { y: 250 },
          }}
        >
          {data.map(({ value, desc }) => (
            <TabPanel key={value} value={value}>
              {desc}
            </TabPanel>
          ))}
        </TabsBody>
      </Tabs>
    </>
  );
};

export default Types;
