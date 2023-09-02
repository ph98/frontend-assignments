
# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npx cypress open`

Run the Cypress for End to End testing.\
You can see and edit the tests in `cypress/e2e` folder.\

See the section about [cypress](https://docs.cypress.io/guides/getting-started/opening-the-app) for more information.


### some limitations and notes: 
- I considered the csv file as our data and data structure, for example for age, it is better to store birthdays but as we don't have them I'll continue working with age.
- As we don't have any backend, I did not stored any data in the cloud.
- I've used Redux as it was mentioned in the document, but I would prefer to use `react-query` for something like this as it has more capabilities for data based applications.
- I've used Ant design because I wanted to deliver best user experience in the limited timeline.
- I considered USD is our currency.
- I considered emails as a unique item in our data.
- I didn't devote time having perfect tests.