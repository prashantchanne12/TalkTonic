import { NextResponse } from 'next/server';

export async function GET(request) {
  const response = await fetch('https://www.reddit.com/r/askreddit/top.json');
  let posts = await response.json();

  posts = posts.data.children.map((post) => {
    const newPost = {
      title: post.data.title,
      upvotes: post.data.ups,
      created: post.data.created,
      over_18: post.data.over_18,
      author: post.data.author,
      whitelist_status: post.data.whitelist_status,
      url: post.data.url,
    };
    return newPost;
  });

  return NextResponse.json(posts);
}

// TODO: NSFW Filter
// TODO: Pagination
// TODO: TAKE TYPE FROM FRONTEND
