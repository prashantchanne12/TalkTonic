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
  FireIcon as FireIconOutlined,
  HandThumbUpIcon as HandThumbUpIconOutlined,
  RocketLaunchIcon as RocketLaunchIconOutlined,
  ArrowRightIcon,
  ArrowLeftIcon,
} from '@heroicons/react/24/outline';
import {
  HeartIcon,
  FireIcon,
  RocketLaunchIcon,
  HandThumbUpIcon,
} from '@heroicons/react/24/solid';
import React, { useContext, useEffect, useState } from 'react';
import { SubRedditContext } from '../context/SubRedditContext';
import { NsfwContext } from '../context/NsfwContext';
import { spaceGrotesk } from '../utils/fonts';
import { convertToK, utcToLocal } from '../utils/date';
import Skeleton from './Skeleton';

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
      `/api/posts?type=${value}&limit=150&sub=${subReddit}&nsfw=${isNsfw}`
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
        `/api/posts?type=${type}&limit=150&sub=${subReddit}&nsfw=${isNsfw}`
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
      icon: FireIconOutlined,
    },
    {
      label: 'New',
      value: 'new',
      icon: RocketLaunchIconOutlined,
    },
    {
      label: 'Top',
      value: 'top',
      icon: HandThumbUpIconOutlined,
    },
  ];

  const getClasses = (value) => {
    if (value === 'new') {
      return 'text-[#2980b9] font-bold animate-pulse icon';
    }

    if (value === 'hot') {
      return 'text-[#e67e22] font-bold animate-pulse icon';
    }

    if (value === 'top') {
      return 'text-[#16a085] font-bold animate-pulse icon';
    }

    return '';
  };

  const getIcon = (value) => {
    if (value === 'new') {
      return RocketLaunchIcon;
    }

    if (value === 'hot') {
      return FireIcon;
    }

    if (value === 'top') {
      return HandThumbUpIcon;
    }

    return '';
  };

  return (
    <div>
      <Tabs id='custom-animation' value='hot'>
        <div className='sticky top-0'>
          <TabsHeader>
            {data.map(({ label, value, icon }) => (
              <Tab key={value} value={value} onClick={() => fetchPosts(value)}>
                <div className='flex items-center gap-2 py-1'>
                  {React.createElement(value === type ? getIcon(type) : icon, {
                    className: `w-5 h-5 ${value === type && getClasses(type)}`,
                  })}
                  <p className={value === type && getClasses(type)}>{label}</p>
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
              <Skeleton />
            ) : (
              posts.map((post) => (
                <TabPanel key={type} value={type}>
                  <div className='shadow-md rounded-lg pt-6 pl-6 pr-6 relative hover:scale-105 duration-700 transform transition-all ease-out'>
                    <h2 className='cursor-pointer text-lg font-bold text-black'>
                      <a
                        href={post.url}
                        target='_blank'
                        className={spaceGrotesk.className}
                      >
                        <span className='hover:text-indigo-500'>
                          {post.title}
                        </span>
                      </a>
                    </h2>
                    <div className='pb-8 pt-5 md:py-5'>
                      <p className='max-w-sm truncate md:text-sm text-gray-500'>
                        Posted by {'@' + post.author} {utcToLocal(post.created)}
                      </p>
                    </div>
                    <div className='flex items-center gap-1 absolute right-3 md:bottom-4'>
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
        <Button
          color='pink'
          ripple={true}
          onClick={() => handlePagination(false)}
          disabled={index - 5 <= 0}
        >
          <ArrowLeftIcon strokeWidth={2} className='h-5 w-5' />
        </Button>
        <Button
          color='pink'
          ripple={true}
          onClick={() => handlePagination(true)}
          disabled={index + 1 > allPosts.length}
        >
          <ArrowRightIcon strokeWidth={2} className='h-5 w-5' />
        </Button>
      </div>
    </div>
  );
};

export default Types;
