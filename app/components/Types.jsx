'use client';

import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
  Button,
} from '@material-tailwind/react';
import {
  FireIcon,
  HandThumbUpIcon,
  RocketLaunchIcon,
  ArrowRightIcon,
  ArrowLeftIcon,
} from '@heroicons/react/24/outline';
import React, { useContext } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { SubRedditContext } from '../context/SubRedditContext';

const Types = () => {
  con;
  const [posts, setPosts] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
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

  const handlePagination = (isNext) => {
    if (isNext) {
      // NEXT
      // Add more posts to the array
      // Once you exhaust all the posts make new request for more posts
    } else {
      // PREV
      // Just traverse through the array
    }
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
    <>
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
      <div className='flex justify-center gap-5 my-2'>
        <Button ripple={true} onClick={handlePagination(false)}>
          <ArrowLeftIcon strokeWidth={2} className='h-5 w-5' />
        </Button>
        <Button ripple={true} onClick={handlePagination(true)}>
          <ArrowRightIcon strokeWidth={2} className='h-5 w-5' />
        </Button>
      </div>
    </>
  );
};

export default Types;
