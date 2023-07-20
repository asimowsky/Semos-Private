Event Ticketing System
Introduction
Welcome to the Event Ticketing System project! This is a web application built with React, Node.js, and MongoDB that allows users to buy tickets for various events. The system supports two roles: admin and normal user. Admins have additional privileges to manage events, while normal users can browse and purchase tickets.

Features
User-friendly interface for browsing and purchasing event tickets- Secure authentication and authorization system with separate roles for admins and normal users.
Admin dashboard for managing events, including creating, updating, and deleting events.
Integration with MongoDB for storing event and user data.
Real-time updates on ticket availability and event details.
Responsive design for optimal viewing on different devices.
Installation
Prerequisites
Before installing the project, make sure you have the following software installed on your machine:

Node.js (version 12 or higher)
MongoDB
Steps

1. Clone the repository to your local machine using the following command:
   git clone https://github.com/your-username/Semos-Private.git
2. Navigate to the project directory:

cd ticketblaster

3. Install the dependencies for both the frontend and backend:

cd client
npm install
cd ../server
npm install

4. Configure the environment variables:

Create a .env file in the server directory.
Add the following variables to the .env file:

PORT=3000
MONGODB_URI=mongodb://localhost/event-ticketing-system
SECRET_KEY=your-secret-key

6. Start the backend server:
   npm run dev

7. Start the frontend development server:
   npm start

8. Open your web browser and visit http://localhost:3000 to access the Event Ticketing System.

Usage
Admin Role
access the admin dashboard, log in with an admin account.
From the dashboard, you can manage events by creating, updating, or deleting them.
You can also view a list of all users and their details.
Normal User Role
As a normal user, you can browse the available events on the home page.
Click on an event to view its details and ticket availability.
To purchase tickets, you need create an account or log in if you already have one.
After logging in, select the desired number of tickets and proceed to checkout.
Provide the necessary information and complete the payment process- Once the purchase is successful, you will receive a confirmation email with the ticket details.
Contributing
We welcome contributions to the Event Ticketing System project! you find any issues or have suggestions for improvements, please feel free to open an issue submit a pull request on our GitHub repository.

License
This project licensed under the MIT License.

Contact
If you have any questions or need further assistance, please contact us at [email protected]

Thank you for using the Event Ticketing System! We hope you enjoy the experience of buying tickets for exciting events.
