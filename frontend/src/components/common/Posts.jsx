import Post from "./Post";
import PostSkeleton from "../skeletons/PostSkeleton";

import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
const Posts = ({ feedType, username, userId }) => {
	const getPostEndpoint = () => {
		switch (feedType){
			case "forYou":
				return "/api/post/all";
			case "following":
				return "/api/post/feed";
			case "posts":
				return `/api/post/user/${username}`;
			case "likes":
				return `/api/post/likes/${userId}`;
			default:
				return "/api/post/all";
		}
	};

	const POST_ENDPOINT = getPostEndpoint();

	const { data:posts, isLoading, refetch, isRefetching} = useQuery({
		queryKey: ["posts"],
		queryFn: async () => {
			try{
				const res = await fetch(POST_ENDPOINT);
				const data = await res.json();
	
				if(!res.ok){
					throw new Error(data.error || "Failed to fetch posts");
				}
	
				return data;
			} catch (error) {
				throw new Error(error);
			}
		},
	})

	useEffect(() => {
		refetch();
	}, [feedType, refetch, username]);	

	return (
		<>
			{(isLoading || isRefetching) && (
				<div className='flex flex-col justify-center'>
					<PostSkeleton />
					<PostSkeleton />
					<PostSkeleton />
				</div>
			)}
			{!isLoading && !isRefetching && posts?.length === 0 && <p className='text-center my-4'>No posts in this tab. Switch to another tab</p>}
			{!isLoading && !isRefetching && posts && (
				<div>
					{posts.map((post) => (
						<Post key={post._id} post={post} />
					))}
				</div>
			)}
		</>
	);
};
export default Posts;