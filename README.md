# Project Setup with Docker Compose

This project consists of a NestJS backend, a PostgreSQL database, and a ReactJS frontend. All services are orchestrated using Docker Compose to simplify local development.

## Prerequisites
- Docker and Docker Compose should be installed on your local machine.

## Getting Started

Follow these steps to get the project up and running:

### 1. Step to run project:
- Clone project:

Via HTTPS:
```sh
git clone https://github.com/marketenterprise/Training-Tin-Dang-Purchasing-Management.git
```
Or via SSH
```sh
git clone git@github.com:marketenterprise/Training-Tin-Dang-Purchasing-Management.git
```
- Access to project folder:
```sh
cd Training-Tin-Dang-Purchasing-Management
```
- Check out the branch to test:
```sh
git checkout <branch_name>
```
- To build and run all services:
```sh
chmod +x start.sh && ./start.sh
```
This command auto copy `.env_example` to `.evn` file to both `./backend` and `frontend` folder, then auto run 
`docker compose up --build` command to build and start container.
- To stop all running containers:
```sh
docker compose down
```

### 2 Access to app

- **Customer page**: Access the customer page at [http://localhost](http://localhost). In this page, tester can create the prodcuct via 3 step. If somes field invalid, it will show the error. View pricture for more detail.

  - Step 1: : Input product information (name, type of product).

    ![Step 1](https://i.ibb.co/nrq4VNb/Screenshot-2024-11-04-at-09-22-46.png)
  
  - Step 2:  Input product specifications (storage, RAM, condition).
  
    ![Step 2](https://i.ibb.co/KKShyzc/Screenshot-2024-11-04-at-09-17-56.png)
  
  - Step 3: Input customer information (name, email, phone number).
  
    ![Step 3](https://i.ibb.co/4YSTwmt/Screenshot-2024-11-04-at-09-18-21.png)
  - Show error if request have invalid field 

    ![Review](https://i.ibb.co/ZYKwbKH/Screenshot-2024-11-04-at-08-20-15.png)
  
  - Prevew: Confirm all the provided information before submission.
  
    ![Review](https://i.ibb.co/VN1623N/Screenshot-2024-11-04-at-09-18-36.png)
  
  - When submit sucessfully
  
    ![Create sucess](https://i.ibb.co/LgGZdV6/Screenshot-2024-11-04-at-09-18-43.png)
  
- **Admin page**: Access the customer page at [http://localhost/admin](http://localhost/admin).
  - If you weren't login before or the first access, application will redirect to login page. Default account for login testing:
  
      - Username
      ```sh
      superadmin@gmail.com
      ```
      - Password
      ```sh
      Super@admin123
      ```
    ![Create sucess](https://i.ibb.co/vdNRWSd/Screenshot-2024-11-04-at-08-21-10.png)
   - After authencation succesfully, you will see the admin page with products list. You can sort by `Approved` column, or click `Detail` button to view product's detail.
     ![Create sucess](https://i.ibb.co/km4ktvB/Screenshot-2024-11-04-at-08-19-24.png)
   - In the product's detail page, you will see full information of the product, and can update status by click the `Pending/Approve` button.
     ![Create sucess](https://i.ibb.co/YBmr3N8/Screenshot-2024-11-04-at-08-19-04.png)
- **Backend API**: You can access the backend API documentation at: [http://localhost/api/docs](http://localhost/api/docs).

  Access this api url with Swagger. Foreach enpoint, click **"Try it out"**, using example body data to test API. All api are documented in the Swagger page.

- **Using GA4 and Clarity to take measurements.**
  - For GA4: access [the GA4 url](https://analytics.google.com/analytics).
    - Select app name `MEVN Prurchase product App` -> Property name `Prurchase product App`
    - Select `Report` -> `Realtime overview` on the left navigation bar to see Overview Data of Product App include events (next step, prev step, form complete, avg session, active user...)
     ![Create sucess](https://i.ibb.co/Mnh23TJ/Screenshot-2024-11-04-at-09-05-25.png)
  - For Clarity: access [the Clarity url](https://clarity.microsoft.com/projects).
    - Select `Purchase Product App` project.
    - The `Dashboard` of project will be showed, you can view some type of data as `Headmaps`, `Recordings`, `Google Analytics`...
    ![Create sucess](https://i.ibb.co/7JNzSTC/Screenshot-2024-11-04-at-09-10-59.png)

### 3. Directory Structure
Ensure your project has the following structure:
```
Training-Tin-Dang-Purchasing-Management/
  ├── .docker/
  │     ├── backend/
  │     │       └── Dockerfile
  │     └── frontend/
  │             └──Dockerfile
  ├── backend/
  ├── frontend/
  └── docker-compose.yml
```

- `.docker/`: Contains Dockerfile of Frontend and Backend.
- `backend/`: Contains the NestJS source code.
- `frontend/`: Contains the ReactJS source code.
- `docker-compose.yml`: Defines the services for the entire stack.


This command `docker compose up --build` will:
- Build the Docker images for both the backend (NestJS) and the frontend (ReactJS).
- Set up a PostgreSQL database.
- Apply Prisma migrations and start the backend server.

### Notes
- **Ensure Docker**: Make sure Docker and Docker Compose are installed and running correctly.
- **Modify Ports**: If ports `3000` or `3001` are already in use, change them in the `docker-compose.yml` file.
- **PostgreSQL Data Persistence**: The PostgreSQL data is stored in a Docker volume named `postgres_data`, which ensures the data is not lost when the container stops.
- **Database Connection Issues**: Ensure the credentials in `docker-compose.yml` and `.env` file match.

- **Database URL**: The backend connects to the database using the following URL: `postgresql://<username>:<passsword>@<host_name>:<port>/<db_name>`
- **Automatic Prisma Migrations**: Prisma migrations are applied automatically at container startup to ensure the database schema is up to date.

