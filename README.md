# Capstone Project: Travel Planner App

The app takes in a departure date and location, and uses the [Weatherbit.io](https://www.weatherbit.io/api/swaggerui/weather-api-v2), [GeoNames](https://www.geonames.org/export/web-services.html) and [pixabay](https://pixabay.com/api/docs/) APIs to gather and present various data.

## Table of Contents

- [Project Structure](#project-structure)
- [Tech Stack](#tech-stack)
- [Overview of Key Dependencies](#overview-of-key-dependencies)
- [Getting Started](#getting-started)
- [Testing](#testing)

## Project Structure

```
.
├── src
│   ├── client
│   │   ├── images
│   │   │   ├── favicon.png
│   │   │   ├── logo.png
│   │   │   └── not_found.png
│   │   ├── js
│   │   │   ├── __test__
│   │   │   │   └── app.test.js
│   │   │   ├── app.js
│   │   │   └── utils.js
│   │   ├── styles
│   │   │   ├── base.scss
│   │   │   ├── footer.scss
│   │   │   ├── header.scss
│   │   │   ├── main.scss
│   │   │   ├── resets.scss
│   │   │   └── responsive.scss
│   │   ├── views
│   │   │   └── index.html
│   │   └── index.js
│   └── server
│       ├── __test__
│       │   └── index.test.js
│       ├── apis.js
│       ├── countries.js
│       ├── index.js
│       └── routes.js
├── udacity-fend-capstone.postman_collection.json
├── webpack.dev.js
├── webpack.prod.js
├── README.md
├── babel.config.json
├── package-lock.json
└── package.json
```

## Tech Stack

Express for the server-side. Vanilla JavaScript, HTML, and CSS for the frontend. There is no persistent data store. All data is stored in memory. Additional data is fetched from third-party APIs [Weatherbit.io](https://www.weatherbit.io/api/swaggerui/weather-api-v2), [GeoNames](https://www.geonames.org/export/web-services.html) and [pixabay](https://pixabay.com/api/docs/).

## Overview of Key Dependencies

- [Node.js](https://nodejs.org/en/) - Node.js® is a JavaScript runtime built on Chrome's V8 JavaScript engine.
- [Express.js](https://expressjs.com/) - Fast, unopinionated, minimalist web framework for Node.js.
- [cors](https://www.npmjs.com/package/cors) - CORS is a Node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options.
- [jest](https://jestjs.io/) - Jest is a delightful JavaScript Testing Framework with a focus on simplicity.
- [webpack](https://webpack.js.org/) - webpack is a static module bundler for modern JavaScript applications.

## Getting Started

1. Ensure you have [Node.js](https://nodejs.org/en/download/) installed
2. Set the environment variables below to the relevant API keys and usernames by running:
   ```bash
   export WEATHERBIT_API_KEY=your_weatherbit_api_key;
   export PIXABAY_API_KEY=your_pixabay_api_key;
   export GEONAMES_USERNAME=your_geonames_username;
   ```
2. Clone this repository by navigating to a suitable directory and running:
   ```bash
   git clone https://github.com/fstubner/udacity-fend-capstone.git;
   ```
3. Navigate to the root directory `udacity-fend-capstone` and run:
   ```bash
   npm install;
   ```
4. To start the backend server, run:

   ```bash
   npm start;
   ```

   > _note:_ By default, the built-in web server will be available under http://localhost:8080.

## Testing

To run tests, run:
```bash
npm test;
```