import express from 'express';
import payload from 'payload';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
// const fetch = require('node-fetch');

// Load environment variables
dotenv.config();

// Initialize express app
const app = express();

// CORS configuration
const configureCORS = async () => {
  //  manually allowed CORS origins
  const allowedOrigins = process.env.MANUAL_CORS_ALLOWED_ORIGINS
    ? process.env.MANUAL_CORS_ALLOWED_ORIGINS.split(',')
    : [];

  // Fetch domain names from Vercel API
  // const response = await fetch(
  //   `https://api.vercel.com/v9/projects/${process.env.VERCEL_PROJECT_ID}/domains`,
  //   {
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${process.env.VERCEL_DOMAINS_ACCESS_TOKEN}`,
  //     },
  //     method: "GET",
  //   }
  // );

  // if (response.ok) {
  //   const data = await response.json();
  //   const domains = data.domains.map((domain) => domain.name);
  //   // combine manually allowed origins with vercel's fetched domains
  //   allowedOrigins = [...allowedOrigins, ...domains];
  // } else {
  //   console.error(
  //     "Failed to fetch domain names:",
  //     response.status,
  //     response.statusText
  //   );
  // }

  app.use(
    cors({
      origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);

        const originIsAllowed = allowedOrigins.some((allowedOrigin) =>
          origin ? origin.endsWith(allowedOrigin) : false,
        );
        if (originIsAllowed) {
          return callback(null, true);
        } else {
          return callback(new Error('Not allowed by CORS'));
        }
      },
    }),
  );
};

// Redirect root to Admin panel
const configureRoutes = () => {
  app.get('/', (_, res) => {
    res.redirect('/admin');
  });
};

// Initialize Payload
const initializePayload = async () => {
  // Serve static files from the assets folder
  app.use('/assets', express.static(path.resolve(__dirname, './assets')));

  await payload.init({
    secret: process.env.PAYLOAD_SECRET,
    express: app,
    onInit: async () => {
      payload.logger.info(`Payload Admin URL: ${payload.getAdminURL()}`);
    },
  });
};

// Start server
const startServer = async () => {
  try {
    await configureCORS();
    configureRoutes();
    await initializePayload();
    app.listen(3001);
  } catch (error) {
    console.error('An error occurred while starting the server:', error);
  }
};

startServer();
