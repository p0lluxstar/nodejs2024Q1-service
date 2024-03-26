# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Installation

1. Create a local copy of the repository at the specified URL on GitHub.
```
git clone https://github.com/p0lluxstar/nodejs2024Q1-service.git
```
2. Go to the directory named nodejs2024Q1-service.
```
cd nodejs2024Q1-service
```
3. Switch to the dev branch in the local copy of the repository
```
git checkout docker-postgresql
```
4. Install all project dependencies specified in the package.json file
```
npm install
```
5. Run all containers described in the docker-compose.yml file
```
npm run docker:up
```
6. Creating a new migration file
```
npm run migration:generate --name='create_tables'
```
7. Apply all pending migrations to the database
```
npm run migration:run
```

## Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm run test
```

To run only one of all test suites

```
npm run test -- <path to suite>
```

### Auto-fix and format

```
npm run lint
```

```
npm run format
```

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging
