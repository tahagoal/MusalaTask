# Mustala Task

# Prerequisites

To build and run this app locally you will need a few things:

- Install [Node.js](https://nodejs.org/en/)
- Install [VS Code](https://code.visualstudio.com/)

# Getting started

- Clone the repository

```
git clone https://github.com/tahagoal/MustalaTask
```

# Backend

- Install dependencies

```
cd <project_name>/Back
npm install
```

- Build and run the backend project with auto reload (nodemon)

```
npm run server
```

- Build and run the project

```
npm run start
```

Finally, navigate to `http://localhost:5050/` and you should see the API running!


### Running the build

All the different build steps are orchestrated via [npm scripts](https://docs.npmjs.com/misc/scripts).
Npm scripts basically allow us to call (and chain) terminal commands via npm.
This is nice because most JavaScript tools have easy to use command line utilities allowing us to not need grunt or gulp to manage our builds.
If you open `package.json`, you will see a `scripts` section with all the different scripts you can call.
To call a script, simply run `npm run <script-name>` from the command line.
You'll notice that npm scripts can call each other which makes it easy to compose complex builds out of simple individual build scripts.
Below is a list of all the scripts this template has available:

| Npm Script     | Description                                                                                   |
| -------------- | --------------------------------------------------------------------------------------------- |
| `tsc`          | Transpiles TypeScript codes to JavaScript.                                                    |
| `watch-tsc`    | Transpiles TypeScript codes to JavaScript, with auto reload.                                  |
| `deploy`       | Runs node on `dist/server.js` which is the app's entry point.                                 |
| `watch-deploy` | Runs node on `dist/server.js` which is the app's entry point, with auto reload.               |
| `server`       | Transpiles TypeScript codes to JavaScript then run node on `dist/server.js` with auto reload. |
| `start`        | Transpiles TypeScript codes to JavaScript then run node on `dist/server.js`.                  |

Since we're developing with TypeScript, it is important for the codes to be transpiled first to JavaScript before running the node server. It is best to deploy the app using: `npm run server` or `npm run start` command.


# Frontend


```
cd <project_name>/Front
npm install
```