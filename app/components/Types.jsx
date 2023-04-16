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
import React, { useContext } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { SubRedditContext } from '../context/SubRedditContext';

const Types = () => {
  const [posts, setPosts] = useState([]);
  const [type, setType] = useState('hot');
  const [loading, setLoading] = useState(false);
  const { subReddit } = useContext(SubRedditContext);

  const fetchPosts = async (value) => {
    setLoading(true);
    setType(value);
    const response = await fetch(
      `/api/posts?type=${value}&limit=5&sub=${subReddit}`
    );
    const posts = await response.json();
    setPosts(posts);
    setLoading(false);
  };

  useEffect(() => {
    const fetchInitialPosts = async () => {
      const response = await fetch(
        `/api/posts?type=hot&limit=5&sub=${subReddit}`
      );
      const posts = await response.json();
      setPosts(posts);
    };
    fetchInitialPosts();
  }, [subReddit]);

  const data = [
    {
      label: 'Hot',
      value: 'hot',
      icon: FireIcon,
    },
    {
      label: 'New',
      value: 'new',
      icon: RocketLaunchIcon,
    },
    {
      label: 'Top',
      value: 'top',
      icon: HandThumbUpIcon,
    },
  ];

  return (
    <Tabs id='custom-animation' value='hot'>
      <TabsHeader>
        {data.map(({ label, value, icon }) => (
          <Tab key={value} value={value} onClick={() => fetchPosts(value)}>
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
        {/* {data.map(({ value, desc }) => (
            <TabPanel key={value} value={value}>
              {desc}
            </TabPanel>
          ))} */}

        {loading ? (
          <div>Loading...</div>
        ) : (
          posts.map((post) => (
            <TabPanel key={type} value={type}>
              <div className='shadow-md rounded p-6'>
                <h2 className='cursor-pointer text-lg font-bold text-black'>
                  {post.title}
                </h2>
              </div>
            </TabPanel>
          ))
        )}
      </TabsBody>
    </Tabs>
  );
};

export default Types;
