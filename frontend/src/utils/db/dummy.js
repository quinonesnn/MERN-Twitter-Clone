export const POSTS = [
	{
		_id: "1",
		text: "Today was a great day look at the sky! ",
		img: "/posts/sky.png",
		user: {
			username: "johndoe",
			profileImg: "/avatars/256_6.png",
			fullName: "John Doe",
		},
		comments: [
			{
				_id: "1",
				text: "It looks beautiful!",
				user: {
					username: "janedoe",
					profileImg: "/avatars/256_16.png",
					fullName: "Jane Doe",
				},
			},
		],
		likes: ["6658s891", "6658s892", "6658s893", "6658s894"],
	},
	{
		_id: "2",
		text: "Should I go for a walk or jog?",
		user: {
			username: "johndoe",
			profileImg: "/avatars/256_6.png",
			fullName: "John Doe",
		},
		comments: [
			{
				_id: "1",
				text: "Walk! Coffee later?",
				user: {
					username: "janedoe",
					profileImg: "/avatars/256_16.png",
					fullName: "Jane Doe",
				},
			},
		],
		likes: ["6658s891", "6658s892", "6658s893", "6658s894"],
	},
	{
		_id: "3",
		text: "Just got a new car. I love it!",
		img: "/posts/car.jpeg",
		user: {
			username: "johndoe",
			profileImg: "/avatars/256_14.png",
			fullName: "John Doe",
		},
		comments: [],
		likes: ["6658s891", "6658s892", "6658s893", "6658s894", "6658s895", "6658s896"],
	},
	{
		_id: "4",
		text: "The city of Chicago is beautiful!",
		img: "/posts/chicago.jpeg",
		user: {
			username: "johndoe",
			profileImg: "/avatars/256_7.png",
			fullName: "John Doe",
		},
		comments: [
			{
				_id: "1",
				text: "I love it there!",
				user: {
					username: "janedoe",
					profileImg: "/avatars/256_6.png",
					fullName: "Jane Doe",
				},
			},
		],
		likes: [
			"6658s891",
			"6658s892",
			"6658s893",
			"6658s894",
			"6658s895",
			"6658s896",
			"6658s897",
			"6658s898",
			"6658s899",
		],
	},
];

export const USERS_FOR_RIGHT_PANEL = [
	{
		_id: "1",
		fullName: "Simon Doe",
		username: "simondoe",
		profileImg: "/avatars/256_10.png",
	},
	{
		_id: "2",
		fullName: "Janet Ray",
		username: "janetray",
		profileImg: "/avatars/256_15.png",
	},
	{
		_id: "3",
		fullName: "Frank Rombro",
		username: "frankrombro",
		profileImg: "/avatars/256_5.png",
	},
	{
		_id: "4",
		fullName: "Jacob Quinones",
		username: "jacobquinones",
		profileImg: "/avatars/256_11.png",
	},
];