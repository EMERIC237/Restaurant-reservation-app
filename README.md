# Capstone: Restaurant Reservation System

#Link to the deployed APP:
[Restaurant Reservation APP] (https://resto-joy.herokuapp.com/dashboard)

### App story

> You have been hired as a full stack developer at _Periodic Tables_, a startup that is creating a reservation system for fine dining restaurants.
> The software is used only by restaurant personnel when a customer calls to request a reservation.
> At this point, the customers will not access the system online.

## Database setup

1. Set up four new ElephantSQL database instances - development, test, preview, and production - by following the instructions in the "PostgreSQL: Creating & Deleting Databases" checkpoint.
1. After setting up your database instances, connect DBeaver to your new database instances by following the instructions in the "PostgreSQL: Installing DBeaver" checkpoint.

### Knex

Run `npx knex` commands from within the `back-end` folder, which is where the `knexfile.js` file is located.

## Installation

1. Fork and clone this repository.
1. Run `cp ./back-end/.env.sample ./back-end/.env`.
1. Update the `./back-end/.env` file with the connection URL's to your ElephantSQL database instance.
1. Run `cp ./front-end/.env.sample ./front-end/.env`.
1. You should not need to make changes to the `./front-end/.env` file unless you want to connect to a backend at a location other than `http://localhost:5000`.
1. Run `npm install` to install project dependencies.
1. Run `npm run start:dev` to start your server in development mode.

If you have trouble getting the server to run, reach out for assistance.

## Running tests

This project has unit, integration, and end-to-end (e2e) tests. You have seen unit and integration tests in previous projects.
End-to-end tests use browser automation to interact with the application just like the user does.
Once the tests are passing for a given user story, you have implemented the necessary functionality.

Test are split up by user story. You can run the tests for a given user story by running:

`npm run test:X` where `X` is the user story number.

Have a look at the following examples:

- `npm run test:1` runs all the tests for user story 1 (both frontend and backend).
- `npm run test:3:backend` runs only the backend tests for user story 3.
- `npm run test:3:frontend` runs only the frontend tests for user story 3.

### Create and list reservations

As a restaurant manager<br/>
I want to create a new reservation when a customer calls<br/>
so that I know how many customers will arrive at the restaurant on a given day.
I only want to allow reservations to be created on a day when we are open<br/>
so that users do not accidentally create a reservation for days when we are closed.<br/>
I only want to allow reservations to be created during business hours, up to 60 minutes before closing<br/>
so that users do not accidentally create a reservation for a time we cannot accommodate.

#### Screenshots

![Create Reservation](front-end/.screenshots/us-01-submit-before.png)

### Seat reservation

As a restaurant manager, <br/>
When a customer with an existing reservation arrives at the restaurant<br/>
I want to seat (assign) their reservation to a specific table<br/>
so that I know which tables are occupied and free.

#### Screenshots

![Seat Reservation](front-end/.screenshots/us-04-dashboard-seat-button-before.png)
![Seat Reservation](front-end/.screenshots/us-06-seated-before.png)
![Seat Reservation](front-end/.screenshots/us-04-seat-reservation-start.png)

### US-05 Finish an occupied table

As a restaurant manager<br/>
I want to free up an occupied table when the guests leave<br/>
so that I can seat new guests at that table.<br/>

#### Screenshots

![Finish Occupied tables](front-end/.screenshots/us-06-finish-after.png)

### US-06 Reservation Status

As a restaurant manager<br/>
I want a reservation to have a status of either booked, seated, or finished<br/>
so that I can see which reservation parties are seated, and finished reservations are hidden from the dashboard.

#### Screenshots

![Reservation status](front-end/.screenshots/us-06-seated-before.png)

### US-07 Search for a reservation by phone number

As a restaurant manager<br/>
I want to search for a reservation by phone number (partial or complete)<br/>
so that I can quickly access a customer's reservation when they call about their reservation.<br/>

#### Screenshots

![Reservation search](front-end/.screenshots/us-07-search-reservations-submit-valid-after.png)

### US-08 Change an existing reservation

As a restaurant manager<br/>
I want to be able to modify a reservation if a customer calls to change or cancel their reservation<br/>
so that reservations are accurate and current.

#### Screenshots

![Reservation status](front-end/.screenshots/us-08-edit-reservation-submit-before.png)

### API

There are two datasets that are a part of this project: reservations and tables.

You can view all the data inside of the Restaurant-reservation-app\back-end\src\db\data\seeds folder. Each data set can be accessed via a named property in this file. The following is a partial listing of the data in data/db.json:

reservation: {
"first_name": "Rick",
"last_name": "Sanchez",
"mobile_number": "202-555-0164",
"reservation_date": "2020-12-31",
"reservation_time": "20:00:00",
"people": 6,
"created_at": "2020-12-10T08:30:32.326Z",
"updated_at": "2020-12-10T08:30:32.326Z"
},

Table : { table_name: "Bar #1", capacity: 1 },

## API methods

# Reservations

| Methods |                Urls                 |                                     Actions |
| :------ | :---------------------------------: | ------------------------------------------: |
| GET     |            /reservations            |                        get all reservations |
| GET     |    /reservations/:reservation_id    |           get reservation by reservation_id |
| POST    |            /reservations            |                       add a new reservation |
| PUT     |    /reservations/:reservation_id    |        update reservation by reservation_id |
| PUT     | reservations/:reservation_id/status | update reservation status by reservation_id |

# Tables

| Methods |          Urls           |                                         Actions |
| :------ | :---------------------: | ----------------------------------------------: |
| GET     |         /tables         |                                  get all tables |
| POST    |         /tables         |                                 add a new table |
| PUT     | /tables/:table_id/seat  |     assign a reservation to a table by table_id |
| DELETE  | tables/:table_id/status | Unassigned a reservation to a table by table_id |

### Technology

Here, we use full-stack React + Node.js + Express + PostgreSQL to create a CRUD Application. The back-end server uses Node.js + Express for REST APIs, front-end side is a React.js client with React Router, fetch & Bootstrap. And the database is save in a PostgreSQL database system.

### React, Node.js Express, PostgreSQL Architecture

The architecture of our system:
![architecture system](/Screenshots/architecture.png)
– Node.js Express exports REST APIs & interacts with PostgreSQL Database using Sequelize ORM.
– React Client sends HTTP Requests and retrieves HTTP Responses using fetch, consume data on the components. React Router is used for navigating to pages.
