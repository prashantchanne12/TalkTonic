import { NextResponse } from "next/server";
import axios from "axios";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const subReddit = searchParams.get("sub");
  const type = searchParams.get("type");
  const limit = searchParams.get("limit");
  const after = searchParams.get("after");
  const isNsfw = searchParams.get("nsfw");

  const url = `https://www.reddit.com/r/${subReddit}/${type}.json?limit=${limit}&after=${after}`;
  const { data } = await axios.get(url);
  let posts = data;

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

  if (isNsfw === "false") {
    posts = posts.filter((post) => post.over_18 === false);
  }

  return NextResponse.json(posts);
}
