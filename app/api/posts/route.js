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
  const response = await axios.get(url);
  return NextResponse.json(response.data);
}
