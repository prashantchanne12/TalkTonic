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
import { HeartIcon } from '@heroicons/react/24/solid';
import React, { useContext, useEffect, useState } from 'react';
import { SubRedditContext } from '../context/SubRedditContext';
import { NsfwContext } from '../context/NsfwContext';
import { spaceGrotesk } from '../utils/fonts';
import { convertToK, utcToLocal } from '../utils/date';

const Types = () => {
  const [index, setIndex] = useState(5);
  const [posts, setPosts] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const [type, setType] = useState('hot');
  const [loading, setLoading] = useState(false);
  const { subReddit } = useContext(SubRedditContext);
  const { isNsfw } = useContext(NsfwContext);

  const fetchPosts = async (value) => {
    setLoading(true);
    setType(value);
    const response = await fetch(
      `/api/posts?type=${value}&limit=15&sub=${subReddit}&nsfw=${isNsfw}`
    );
    const posts = await response.json();
    setAllPosts(posts);
    setPosts(posts.slice(0, 5));
    setIndex(5);
    setLoading(false);
  };

  const handlePagination = (isNext) => {
    if (isNext) {
      const nextFivePosts = allPosts.slice(index, index + 5);
      setIndex(index + 5);
      setPosts(nextFivePosts);
    } else {
      const prevFivePosts = allPosts.slice(index - 10, index - 5);
      setIndex(index - 5);
      setPosts(prevFivePosts);
    }
  };

  useEffect(() => {
    const fetchInitialPosts = async () => {
      const response = await fetch(
        `/api/posts?type=${type}&limit=15&sub=${subReddit}&nsfw=${isNsfw}`
      );
      const posts = await response.json();
      setAllPosts(posts);
      setPosts(posts.slice(0, 5));
      setLoading(false);
    };

    setLoading(true);
    fetchInitialPosts();
  }, [subReddit, isNsfw]);

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
    <div>
      <Tabs id='custom-animation' value='hot'>
        <div className='sticky top-0'>
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
        </div>
        <div>
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
                  <div className='shadow-md rounded-lg pt-6 pl-6 pr-6 relative'>
                    <h2 className='cursor-pointer text-lg font-bold text-black'>
                      <a
                        href={post.url}
                        target='_blank'
                        className={spaceGrotesk.className}
                      >
                        {post.title}
                      </a>
                    </h2>
                    <div className='py-5'>
                      <p className='text-sm text-gray-500'>
                        Posted by {'@' + post.author} {utcToLocal(post.created)}
                      </p>
                    </div>
                    <div className='flex items-center gap-1 absolute right-3 bottom-2'>
                      <p className='text-gray-700'>
                        {convertToK(post.upvotes)}
                      </p>
                      <HeartIcon className='h-6 w-6' fill='#FF2E63' />
                    </div>
                  </div>
                </TabPanel>
              ))
            )}
          </TabsBody>
        </div>
      </Tabs>
      <div className='flex justify-center gap-5 my-2'>
        <Button ripple={true} onClick={() => handlePagination(false)}>
          <ArrowLeftIcon strokeWidth={2} className='h-5 w-5' />
        </Button>
        <Button ripple={true} onClick={() => handlePagination(true)}>
          <ArrowRightIcon strokeWidth={2} className='h-5 w-5' />
        </Button>
      </div>
    </div>
  );
};

export default Types;
