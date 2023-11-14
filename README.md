# BlogPosting Platform
This project is a blog posting platform created as a study project, primarily developed using Nest.js for the backend. It aims to provide users with a comprehensive platform for sharing, exploring, and engaging with various blog posts and communities.

## Development Status
The project is still in a raw state but includes an extensive range of features that enhance the user experience. Although some aspects may require further refinement, the app offers a functional platform for users to explore and engage with blog posts and communities.

## Features
- Authentication System: The app offers a fully functional authentication system with role management, ensuring secure access for users with different privileges.
- Posts and Comments: Users can create, publish, and interact with posts, allowing for meaningful discussions through comments.
- Following Functionality: Users can follow other users or communities to stay updated on their content and activities.
- Rating System: Incorporates a rating feature for posts or comments to highlight quality content.
- Community Integration: Enables users to engage with different communities, fostering a sense of belonging and shared interests.
- Notifications: Provides notifications to keep users informed about interactions, activities, or updates.
- Reports and Bans: Empowers administrators with tools to manage user behavior by handling reports and applying bans when necessary.
- Searching: Elastic search synchronization for fast post search (WIP)

## Technologies Used
- Backend: Developed primarily using Nest.js and MikroORM
- Database: PostgreSQL
- Frontend: Still in Development [React, NextJS]
- Other Technologies: RabbitMQ, Ellasticsearch (ELK), NX, Microservices, Nodemailer, monorepo, firebase

## Getting Started [STILL UNDER DEVELOPMENT]
1. Run ELK the way you want, like a docker or local (https://github.com/deviantony/docker-elk)
2. Run RabbitMQ the way you want, like a docker or local (https://hub.docker.com/_/rabbitmq)
3. Run PostgreSQL the way you want, like a docker or local (https://hub.docker.com/_/postgres/)
4. Create a project in Firebase and create a storage in it (https://firebase.google.com/)
5. Add .env file and copy variables from .env.example, except change the values to match yours
6. Run ```npm install```
7. Run ``` npm run migration:up```
8. Run ```npm run nx run entities:build```
9. Run ```npm run nx run api:serve```
10. Run ```npm run nx run email-service:serve```

After this the app should be running and the swagger is available at http://localhost:4200/documentation

