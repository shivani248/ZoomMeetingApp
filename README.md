# Zoom Meeting Application

## Overview

This project is a Zoom Meeting Application built using the MERN stack (MongoDB, Express.js, React, Node.js). It includes features for user authentication, dashboard creation, meeting management, and integration with the Zoom API.

## Table of Contents

- [Zoom Meeting Application](#zoom-meeting-application)
  - [Overview](#overview)
  - [Table of Contents](#table-of-contents)
  - [Prerequisites](#prerequisites)
  - [Setup](#setup)
    - [Backend Setup](#backend-setup)

## Prerequisites

Ensure you have the following installed:

- Node.js (v14.x or later)
- npm (v6.x or later) or Yarn
- MongoDB (locally or a MongoDB Atlas account)

## Setup



##Start Application:
Run npm run dev command to run the Client and Server Concurrently 

Create a .env file in the client directory and add the following environment variables:
env
Copy code
MONGO_URI=mongodbURL
JWT_SECRET=your_jwt_secret
ZOOM_API_KEY=your_zoom_api_key
ZOOM_API_SECRET=your_zoom_api_secret
MONGO_URI: MongoDB connection string.
JWT_SECRET: Secret key for JWT authentication.
ZOOM_API_KEY: Your Zoom API Key.
ZOOM_API_SECRET: Your Zoom API Secret.





##Configuration
Zoom API Credentials
Go to the Zoom App Marketplace.
Sign in with your Zoom account.
Click on "Develop" and select "Build App".
Choose "JWT" as the app type.
Fill in the required details and click "Create".
Copy your API Key and API Secret from the app credentials page.
Add these credentials to your .env file as mentioned in the backend setup.
Running the Application
Ensure both the backend and frontend servers are running.
Open your browser and navigate to http://localhost:3000 to access the application.
