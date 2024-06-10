
# Event Management System

The Event Management System is a web application designed to facilitate the creation, management, and booking of events. The system allows administrators to create new events and users to view event details and book tickets. The application uses Spring Boot for the backend and React for the frontend, providing a robust and scalable platform for event management.


## Features
### Admin Features


- Create Event: Admins can create new events with details such as name, venue, date, time, description, ticket price, maximum number of tickets, and an event photo.

- View Events: Admins can view a list of all events.

### User Features


- View Event Details: Users can view detailed information about events, including the event photo.

- Book Tickets: Users can book tickets for events.

- View Bookings: Users can view their booking history.



## Tech Stack

### Backend

- Spring Boot: A powerful, easy-to-use Java framework for building web applications.

- Spring Security: For securing the application.

- JWT (JSON Web Tokens): For secure authentication.

- Hibernate: For ORM (Object Relational Mapping).

- MySql Database: An in-memory database used for development and testing.

### Frontend

- React: A JavaScript library for building user interfaces.

- React Router: For navigation within the application.

- Axios: For making HTTP requests from the frontend to the backend.

- Bootstrap: For responsive and modern UI design.




## Prerequisties

- Java 11 or higher

- Node.js and npm

- Spring Boot CLI (optional)

- IDE (IntelliJ IDEA, Eclipse, VS Code, etc.)
## Deployment

Download the Project as a ZIP File

### Download the ZIP File:

- Click on the Code button (usually green) on the repository page.

- Select Download ZIP from the dropdown menu.
Save the ZIP file to your local machine.

Extract the ZIP File:

- Extract the downloaded ZIP file to a directory on your local machine.

### Set Up the Backend (Java Spring Boot)

Open a Terminal:

- Navigate to the directory where you extracted the backend part of the project.

Run the Spring Boot Application:

```bash
  ./mvnw spring-boot:run
```
- Ensure you have the necessary JDK installed (usually JDK 11 or 17).

### Set Up the Frontend (Vite + React)

Open Another Terminal:

- Navigate to the directory where you extracted the frontend part of the project.

Install Node.js and npm:

- Make sure you have Node.js and npm installed. You can download and install them from nodejs.org.

Install Project Dependencies:

- Run the following command to install the necessary dependencies:
```bash
  npm install
```
Start the React Application:

- Run the following command to start the development server:
```bash
  npm run dev
```


## Interface

![App Interface](https://drive.google.com/file/d/1BbHKPr_rgoDlTM2t4_insvRb_NQrgpl0/view?usp=drive_link)

