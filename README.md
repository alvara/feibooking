# Fei Booking System



## Introduction

Tool to book fei's favorite restaurants.

## How it works

1. Enter a list of URLs of restaurants that you want to book
2. CLick the start button to begin watching the availability of the restaurants
3. If a table is available, you will be notified via email

## Technology Stack

This application uses NextJS for client side processing to avoid server load.


## Technology

Powered by [PayloadCMS](https://github.com/payloadcms/payload).

See the official [Examples Directory](https://github.com/payloadcms/payload/tree/main/examples) for details on how to use Payload in a variety of different ways.

Vercel is used for deployment in order to achieve custom domains without requiring complex devops, and to reduce the need to communicate with an in between server for making DB calls, resulting in faster responses.

The database is PostgresDB being hosted and accessed through Supabase.

## Design

Design requires maximum flexibility because users will be able to define their own brand within their profile settings.

Tailwind is the framework used for styling. Due to the importance of perceived ease of use, UX, and the ability to offer users vast customization options, I opted out of any design library such as DaisyUI or MUI, and will avoid using global stylesheets outside of overriding third party libraries.

## Testing

N/A

## How to Start Development

To get the project up and running locally, follow these steps:

1. Begin by cloning the repository.
2. Navigate to your project repository with `cd YOUR_PROJECT_REPO` and copy the example environment file with `cp .env.example .env`.
3. Install the dependencies and start the development server with `yarn && yarn dev` (or use `docker-compose up`, see the [Docker](#docker) section for more details).
4. Open your web browser and navigate to `http://localhost:3000/admin` to access the admin panel.

And you're all set! Any changes you make in the `./src` directory will be automatically reflected in your app.

### Docker

As an alternative, you can utilize [Docker](https://www.docker.com) to quickly set up this project in a local environment. Here's how:

1. Begin by following [steps 1 and 2 from the Development section](#development). The `docker-compose` file will automatically utilize the `.env` file located in your project root.
2. Then, execute `docker-compose up`.

And that's all there is to it! The Docker instance not only simplifies the setup process but also ensures a standardized development environment across your team.

Note, the docker is within the `payload` directory, so when deploying elsewhere, must use custom build command:

```
docker build -f payload/Dockerfile .
```

## Production

To deploy Payload in a production environment, you'll need to build and serve the Admin panel. Here's how you can do it:

1. Start by executing the `payload build` script. You can do this by running `yarn build` or `npm run build` in your project root. This command generates a `./build` directory containing a production-ready admin bundle.
2. Next, run `yarn serve` or `npm run serve`. This command launches Node in a production mode and serves Payload from the `./build` directory.

```
## Adding a New Project

When adding a new project to this monorepo, follow these steps:

1. Create a new directory for your project in the root of the monorepo.
2. Set up the project with its own `package.json`, source files, and configuration.
3. Update the root `.eslintrc.cjs` file to include the new project:

```javascript
// In the 'overrides' section of .eslintrc.cjs
{
  files: ["newproject/**/*"],
  rules: {
    // Add any project-specific ESLint rules here
  },
},
```

4. Update the `lint` script in the root `package.json` to include the new project:

```json
"scripts": {
  "lint": "pnpm -C nextjs lint && pnpm -C payload lint && pnpm -C newproject lint"
},
```

5. If you want to focus on a specific project and exclude others from IntelliSense, update the `.vscode/settings.json` file:

```json
"search.exclude": {
  "**/node_modules": true,
  // Uncomment and modify as needed to exclude other projects
  // "**/nextjs/**": true,
  // "**/payload/**": true,
  // "**/newproject/**": true
}
```

By following these steps, you ensure that the new project is properly integrated into the monorepo's linting and development workflow.
