*Please view journey.txt: a file documenting the journey to build this application*
## Full Stack (MERN) Twitter Clone
### Learning Outcomes:

1. > Backend setup with Node.js and Express
2. > MongoDB database integration
3. > User authentication with JWT
4. > Frontend development with React
5. > Tailwind CSS and DaisyUI integration
6. > API integration with React Query
7. > Deployment considerations

___

### Project Structure:

##### Backend - Contains Node.js server-side code

- controllers - Handles API logic and database interactions
- routes - Defines API endpoints
- server.js - Main server file

##### frontend - Contains React frontend code

- src - Contains React components and utilities
- pages - Houses different application pages
- components - Reusable components used throughout the app
 -utils - Utility functions
 - Backend Development:

##### Database

Created a MongoDB deployment and cluster.
Established connection with Node.js using Mongoose driver.
Implemented environment variables for secure credential storage.

##### User Authentication:

Designed user model with email, username, password, etc.
Implemented signup, login, and logout functionalities.
Utilized JWT for token-based authentication.
Ensured secure password hashing with bcrypt.

##### API Routes:

Created separate routes for user management, posts, and notifications.
Implemented middleware (protectRoute) to restrict access for logged-in users.
--- 
### Frontend Development:

##### Project Setup:

Used Create React App and Vite for quick project initialization.
Installed Tailwind CSS and DaisyUI for styling.

##### Component Creation:

Developed reusable components for pages like signup, login, home, etc.
Implemented state management with React hooks (useState) for user input.

### Backend Development:

##### API Integration:

Installed TanStack Query for efficient API data fetching.
Configured a proxy in Vite to handle cross-origin requests.
Used useQuery and useMutation hooks for data fetching and modification.

##### Protected Routes:

Leveraged useQuery to check for authenticated user information.
Implemented conditional rendering to restrict access based on login status.

##### Additional Features:

Created functionalities for post creation, deletion, liking, and commenting.
Implemented user profile management and follow/unfollow functionality.
Integrated a notification system with basic display and deletion.

 ___
### Deployment:

##### Build Process:

- Added a build script to package.json to handle dependency installation and frontend build.

##### Server Configuration:

- Configured Express server to serve the built React app in production mode.

##### Deployment Platform:

- Used a platform like Render.com for deployment.
Set up build and start commands in the deployment configuration.
Added environment variables for sensitive information.

### Setup .env file

```js
MONGO_URI=...
PORT=...
JWT_SECRET=...
NODE_ENV=...
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
```

### Build the app

```shell
npm run build
```

### Start the app

```shell
npm start
```
