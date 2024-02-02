# Project Overview

Welcome to our new GitHub repository! This is the basic structure set up for both the frontend and backend components. Below are instructions on how to check the interconnectedness of the frontend and backend:

## Steps to Check Interconnectedness

1. **Backend Setup:**
   - Navigate to the `root` folder.
   - Run `npm install` to install the required packages.
   - Run `npm run dev` to start the backend server. It will run on `localhost:4000`.

2. **Frontend Setup:**
   - Navigate to the `frontend` folder.
   - Run `npm install` to install the necessary dependencies.
   - Run `npm start` to start the React server. It will run on `localhost:3000`.
     - Note: You may encounter an error if the backend server is not running yet.

3. **Accessing the Frontend:**
   - Visit `localhost:3000/` in your browser. This should display the page.

   ![Frontend Screenshot](https://i.ibb.co/2ZbKgjJ/Screenshot-2024-01-28-173617.png)

   - The message "Data from backend" is fetched from the backend via the frontend.

To check you pages, you just have to put route.
   - Login: `localhost:3000/login`.
   - Dashboard: `localhost:3000/dashboard`.
   - Fill in the blanks: `localhost:3000/fill`.
   - Select the smallest: `localhost:3000/select`.
   - Match the following: `localhost:3000/match`.

