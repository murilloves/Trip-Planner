## Live Link: https://murilloves.github.io/trip-planner/

# Getting Started with Trip Planner

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

To get started you just need to have Node JS installed, preferable the most updated version (v.16.13.1) and then run:

### `yarn install` or `npm install`

After that, in the project directory, you can run:

### `yarn start` or `npm start`

Runs the app in the development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.

### `yarn test` or `npm test`

Launches the test runner in the interactive watch mode (powered by Jest).

### `yarn build`

Builds the app for production to the `build` folder.
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.
Trip Planner is ready to be deployed!

## Project Details:

1 - Countries dashboard where:

	1.1 - User can select home country
	1.2 - User can pick 5 countries he wants to visit
    1.3 - User can see:
	    I   NAME OF THEIR HOME COUNTRY AND FAVORITES
	    II  COUNTRIES CAPITALS
	    III CURRENT EXCHANGE RATE AGAINST HOME CURRENCY
    1.4 - User can Add and Remove Countries from their list
    1.5 - User can Change Home Country

APIs Used
* Countries GraphQL API - https://github.com/trevorblades/countries
* Currency Exchange API - https://www.frankfurter.app/docs/


2 - Project setup:

	2.1 - Create React App (React JS v.17)
	2.2 - Packages (Apollo for GraphQL, Chakra UI for styling and Zustand for state management)
	2.3 - Atomic Design for components
	2.4 - Jest for testing

3 - Services to get the endpoints both GraphQL and Rest

4 - UI / UX, countries flags included, user can Search through input (not just a selector).
HTML5 Datalist was used for this purpose.

5 - State management for application

6 - Features:

    6.1 Separation of concerns for Components and Folders
    6.2 Responsiveness for mobile
    6.3 Local Storage for storing the user's Countries (doesn't vanish on page's refresh)
    6.4 Performance Optimization (good React JS practices)

7 - Some unit Tests written for helpers

## Further improvements

8 - Allow user to change currency amount

9 - Use Typescript on the application to prevent errors for Country Object

10 - Increase the showing data using some charts, analysis and more data about the countries
