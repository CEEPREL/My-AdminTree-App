# Welcome to Tactology Assesment Full Stack Engineer Assignment Backend-Heavy

This project showcases a complete backend with frontend integration using modern TypeScript technologies.

## Tech Stack

### Backend

- **NestJS**
- **GraphQL**
- **TypeORM**
- **PostgreSQL**

### Frontend

- **Next.js (App Router)**
- **Apollo Client**
- **Tailwind**

### Authentication

- **JWT-based authentication**

### ☁️ Deployment

- Backend Hosted on **Render**
- Frontend Hosted on **Vercel**

### Database

- **PostgreSQL** via Render

### Features

- User Sign-Up & Login using JWT authentication
- Protected GraphQL mutations and queries via authentication middleware
- Creation of nested Departments and Sub-Departments
- Pagination for department listing
- Fully integrated UI with form validation and error handling

### Upcoming Features

- Edit department ans sub-department (in-progress)
- Stronger security on the frontend
- Deleting department ans sub-department (in-progress)

## 1. Clone the Repository

- File structure

```bash

tactology
├── server # Backend (GraphQL, NestJs.)
│ ├── src
│ └── (backend files and folders)
├
|── frontend # Frontend (Next.js, Tailwind.)
│ ├── public
│ ├── src
│ └── (frontend files)
│
└── README.md

```

- Clone the repo

```bash
git clone https://github.com/CEEPREL/tactology.git

npm install

```

### 2. Create a .env file in /backend:

- use this (always check for update. Note: Database should always be private.) or setup your database using render for free or any postgresql db

```bash
DATABASE_URL="postgresql://tactology:vB6up0PWVUcQMsE2f6qHig90UbTuEZE8@dpg-d089fjvgi27c738aqtfg-a.oregon-postgres.render.com/tact_database"


JWT_SECRET="tactology"

PORT=3000
```

### 3. Create a .env file in /frontend:

- Add your Server URL Locally or remote

```bash

NEXT_PUBLIC_BACKEND_GRAPHQL_URL="http://localhost:3000/graphql"

```

### 4. Start your server /Backend:

- Make sure you run on PORT:3000

```bash

npm start

```

### 5. Start your server /Frontend:

- Make sure you run on PORT:3001

```bash

npm run dev

```

### 5. Migrate your database:

- Migrating your database if you are setting up afresh, or generate if updating exisiting schema

```bash
//updating exisiting schema
npx prisma generate

//Migrating. Replace 'init' with a name of your choice
sudo npx prisma migrate dev --name init

```

### Here are some images that will help you

- Here is a sample of prisma studio to visual your database. You can spin-up prisma studio with this command.

```bash

npx prisma studio

```

- Image showing Prisma studio UI
  ![GraphQL - Create Department](https://raw.githubusercontent.com/CEEPREL/tactology/1ca36f28f49db78ca62c0e9a068fff3d74e7c458/frontend/public/Screenshot%202025-05-02%20at%2001.16.58.png)

![GraphQL - Login](https://raw.githubusercontent.com/CEEPREL/tactology/1ca36f28f49db78ca62c0e9a068fff3d74e7c458/frontend/public/Screenshot%202025-05-02%20at%2001.17.32.png)

- Image showing GraphQL - Sign-up  
  ![GraphQL - Sign-up](https://raw.githubusercontent.com/CEEPREL/tactology/1ca36f28f49db78ca62c0e9a068fff3d74e7c458/frontend/public/Screenshot%202025-05-02%20at%2001.18.29.png)

- Image showing GraphQL - Login  
  ![GraphQL - Login](https://raw.githubusercontent.com/CEEPREL/tactology/1ca36f28f49db78ca62c0e9a068fff3d74e7c458/frontend/public/Screenshot%202025-05-02%20at%2001.16.16.png)

- Image showing GraphQL - Create Department  
  ![GraphQL - Create Department](https://raw.githubusercontent.com/CEEPREL/tactology/1ca36f28f49db78ca62c0e9a068fff3d74e7c458/frontend/public/Screenshot%202025-05-02%20at%2001.19.26.png)

- Image showing GraphQL - Fetch All Departments  
  ![GraphQL - Fetch All Departments](https://raw.githubusercontent.com/CEEPREL/tactology/1ca36f28f49db78ca62c0e9a068fff3d74e7c458/frontend/public/Screenshot%202025-05-02%20at%2001.20.07.png)

- Image showing UI - Sign-up  
  ![UI - Sign-up](https://raw.githubusercontent.com/CEEPREL/tactology/1ca36f28f49db78ca62c0e9a068fff3d74e7c458/frontend/public/Screenshot%202025-05-02%20at%2001.16.24.png)

- Image showing UI - Login  
  ![UI - Login](https://raw.githubusercontent.com/CEEPREL/tactology/1ca36f28f49db78ca62c0e9a068fff3d74e7c458/frontend/public/Screenshot%202025-05-02%20at%2001.16.36.png)

- Image showing UI - Departments (Fetch, Create, Update, Delete)  
  ![UI - Departments CRUD](https://raw.githubusercontent.com/CEEPREL/tactology/1f0b9338e3e888eb39aa25eaf2be72402b10955f/frontend/public/Screenshot%202025-05-02%20at%2003.21.58.png)
