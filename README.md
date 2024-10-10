# Price Calculator App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Getting Started

To run this project locally, follow these steps:

### Frontend Setup

1. Navigate into the project directory:
   cd price-calculator

2. Install dependencies: Run the following command to install all the required dependencies:
   npm install

3. Run the application:
   npm start

The app will be accessible at http://localhost:3000 in your browser.

### Backend Setup

This project requires a separate server to be run locally. You can find the backend repository here and clone it - https://github.com/uturn-now/fe-assignment-pc-server.

1. Navigate into the project directory:
   cd fe-assignment-pc-server-main

2. Install dependencies: Run the following command to install all the required dependencies:
   npm install

3. Run the server:
   npm run start

The server should now be up and running on http://localhost:9099.

### Environment Variables

Ensure that the frontend is correctly pointing to the server running at http://localhost:9099. This may be done through environment variables (e.g., REACT_APP_API_URL) in the frontend project.
Create a .env file in the root of frontend project and add this variable for development mode:
REACT_APP_API_URL=http://localhost:9099

## Additional Questions

1. **What could have helped you in making the assignment?**

While the API was clearly documented in Swagger, I focused primarily on the Price Calculator component. However, there was no explicit mention that all form fields were required. The input fields for 'start', 'delivery', and 'end' locations had a placeholder labeled "Search", which implied the need for an autocomplete feature and an additional API to search predefined locations.

2. **What would you have done differently if you had more time?**

If I had more time, I would have focused on refining the design by integrating a UI kit into the theme for consistent and polished styling. I would also improve the app's structure by breaking down the larger components into smaller, more reusable components. Additionally, I would implement better error handling throughout the app to improve user experience.

3. **If you didn’t add tests, what kind of tests would you add if you had more time?**

I would add unit tests for the utility functions and React components to ensure correctness.
