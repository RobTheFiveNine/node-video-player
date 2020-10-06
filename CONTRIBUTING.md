Guidelines
----------
If you would like to contribute to this project, please ensure:

- You maintain the existing whitespace style (2 space indents)
- Your changes don't introduce any warnings from eslint
- You create unit tests for any additions using Jest
- You ensure all existing unit tests still pass

Using Webpack Dev Server
------------------------
Rather than running `yarn build` every time you make a change to the React.js application, it is possible to use webpack dev server by running `yarn start:dev` - this will run webpack dev server and serve the React application from port 8080 and setup a proxy to port 3000 for the API requests; meaning you can also run `yarn start` to start the API server on port 3000 in another terminal.

By doing this, all the changes you make to the React.js application will automatically be reflected in your browser window, and you won't need to do a rebuild every time you have a change to make.