# Readable Project

Readable is a React+Redux SPA for managing posts, comments, and tracking likes to both. It has the following 3 routes:

* **/** : Home. Show all posts.

* **/:category** : Show posts filtered by :category.

* **/:category/:post_id** : Show post details for :post_id

## TL;DR

To get started developing right away:

### API server (Readable Project dependency)
* clone https://github.com/udacity/reactnd-project-readable-starter
* `cd api-server`
* `yarn install`
* `yarn start`

### Readable Project
* install all project dependencies with `yarn install`
* start the development server with `yarn start`
* build project for production with `yarn build`

## Project Specs

See https://review.udacity.com/#!/rubrics/1081/view

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `yarn build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Project additions

The following additional features were added to the project:

* **Material Design**: used *@material-ui/core* and *@material-ui/icons* packages to create user interface.
* **ESLint**: it was configured to enforce Udacity's JavaScript code style.
* **Flow**: used flow for type checking.
* **Pre-commit and Pre-push hooks**: used *husky* package to set pre-commit, pre-push scripts for enforcing lint and flow rules.
* **UUID**: used *uuid* package to provide unique ids for posts and comments.
* **Filter by Title, Date, or Score**: additional sorting rules.