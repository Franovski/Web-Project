# CSIS 228 Node.js with MariaDB Project

## 📌 Overview
This project is a **Node.js** application that interacts with a **MariaDB** database. It follows best practices for structuring a backend service and includes database management, RESTful API development, and authentication.

## 🛠 Prerequisites
Ensure you have the following installed on your system:
- [Node.js](https://nodejs.org/) (v16 or later recommended)
- [MariaDB](https://www.MariaDB.com/) (v8.0 or later recommended)
- [Postman](https://www.postman.com/) (for API testing, optional)

## 📂 Project Structure
```
/project-root
│── config                    # Configuration files
│── controllers               # Request handlers
│── models                    # ODM models
│── qr_codes                  # where the qr code images are generated
│── repositories              # Database access layer
│── routes                    # API route definitions
│── services                  # Business logic
│── utils                     # Helper functions
│── validators                # Request validation logic
│── .env                      # Environment variables
│── .gitignore                # Git ignored files
│── index.js                  # Application entry point
│── package.json              # Node.js dependencies
│── README.md                 # Documentation
│── TicketingBoxOffice.sql    # Database schema
```

## 🚀 Installation & Setup
1. **Clone the repository**
   ```
   git clone https://github.com/Franovski/Web-Project
   cd Web-Project
   ```

2. **Install dependencies**
   ```
   npm install
   ```

3. **Configure environment variables**
   Create a `.env` file in the root directory and add the following:
   ```env
    PORT = 3001
    DB_HOST = host
    DB_USER = user
    DB_PORT = 3306
    DB_PASS = password
    DB_NAME = name
    JWT_SECRET = SECRET
   ```

4. **Start MariaDB and create a database**
   ```sql
   CREATE DATABASE TicketingBoxOffice;
   ```

5. **Run database migrations (if applicable)**
   ```sh
   npm run migrate
   ```

6. **Start the server**
   ```sh
   npm start
   ```
   dev mode
   ```sh
   npm run dev
   ```
   The server will run on `http://localhost:3001`.

## 📌 API Endpoints
### Category Routes
| Method | Endpoint        | Description         |
|--------|----------------|---------------------|
| GET    | /api/categories/         | Get all categories      |
| GET    | /api/categories/:id     | Get category by ID     |
| GET    | /api/categories/name/:name    | Get category by name     |
| POST   | /api/categories/        | Create a new category  |
| PUT    | /api/categories/:id     | Update category       |
| DELETE | /api/categories/:id     | Delete category      |

### Event Routes
| Method | Endpoint        | Description         |
|--------|----------------|---------------------|
| GET    | /api/events/         | Get all events     |
| GET    | /api/events/:id     | Get event by ID     |
| GET    | /api/events/name/:name    | Get event by name     |
| GET    | /api/events/status/:status   | Get event by status    |
| GET    | /api/events/category/:categoryId   | Get event by category ID   |
| GET    | /api/events/date/:id   | Get event date by ID   |
| POST   | /api/events/        | Create a new event  |
| PUT    | /api/events/:id     | Update event      |
| DELETE | /api/events/:id     | Delete event      |

### Price Routes
| Method | Endpoint        | Description         |
|--------|----------------|---------------------|
| GET    | /api/prices/         | Get all prices      |
| GET    | /api/prices/:id     | Get price by ID     |
| POST   | /api/prices/        | Create a new price  |
| PUT    | /api/prices/:id     | Update price       |
| DELETE | /api/prices/:id     | Delete price      |

### Section Routes
| Method | Endpoint        | Description         |
|--------|----------------|---------------------|
| GET    | /api/sections/         | Get all sections      |
| GET    | /api/sections/:id     | Get section by ID     |
| GET    | /api/sections/name/:name    | Get section by name     |
| GET    | /api/sections/status/:status    | Get section by status     |
| POST   | /api/sections/        | Create a new section  |
| PUT    | /api/sections/:id     | Update section       |
| DELETE | /api/sections/:id     | Delete section      |

### Ticket Routes
| Method | Endpoint        | Description         |
|--------|----------------|---------------------|
| GET    | /api/tickets/         | Get all tickets      |
| GET    | /api/tickets/:id     | Get ticket by ID     |
| GET    | /api/tickets/status/:status    | Get ticket by status     |
| POST   | /api/tickets/        | Create a new ticket  |
| PUT    | /api/tickets/:id     | Update ticket       |
| DELETE | /api/tickets/:id     | Delete ticket      |

### Transaction Routes
| Method | Endpoint        | Description         |
|--------|----------------|---------------------|
| GET    | /api/transactions/         | Get all transactions      |
| GET    | /api/transactions/:id     | Get transaction by ID     |
| GET    | /api/transactions/status/:status    | Get transaction by status     |
| POST   | /api/transactions/        | Create a new transaction  |
| PUT    | /api/transactions/:id     | Update transaction       |
| DELETE | /api/transactions/:id     | Delete transaction      |

### User Routes
| Method | Endpoint        | Description         |
|--------|----------------|---------------------|
| GET    | /api/users/         | Get all users      |
| GET    | /api/users/:id     | Get user by ID     |
| GET    | /api/users/firstName/:firstName    | Get user by first name     |
| GET    | /api/users/lastName/:lastName    | Get user by last name     |
| GET    | /api/users/email/:email    | Get user by email   |
| GET    | /api/users/passByEmail/:email    | Get user password by email    |
| GET    | /api/users/ticket/:id    | Get user tickets by ID   |
| GET    | /api/users/role/:role    | Get user by role    |
| GET    | /api/users/roleById/:id   | Get user role by ID    |
| POST   | /api/users/        | Create a new user  |
| POST   | /api/users/login       | Logging in to the user  |
| PUT    | /api/users/:id     | Update user        |
| PUT    | /api/users/password/:email     | Change password     |
| DELETE | /api/users/:id     | Delete user        |

## 🛠 Technologies Used
- **Node.js** - Backend runtime
- **Express.js** - Web framework
- **MariaDB** - Relational database
- **dotenv** - Environment variable management
- **express-validator** - Request validation
- **bcrypt** - Password hashing
- **jsonwebtoken** - Token generator and authentication
- **moment** - Date and Time handling library
- **qr-image** - generate image for the qr code
- **inquirer** - create interactive command-line user interfaces
- **fs** - generates the qr_code folder and stores the images in it

## 🔍 Best Practices Followed
✔️ Follows MVC architecture  
✔️ Uses environment variables for security  
✔️ Implements error handling and validation  
✔️ Uses async/await for better promise handling

## 📝 License
This project is licensed under the MIT License.

---
Feel free to contribute by opening issues or submitting pull requests! 🚀
