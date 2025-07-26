# Inventory Management Tool - Backend

This project is a backend application for a small business's inventory management tool, built with Node.js and Express. It provides REST APIs to manage users and product inventory.

---

## Features

* **User Authentication**: Secure user registration and login using JWT (JSON Web Tokens).
* **Product Management**: Add new products to the inventory.
* **Inventory Control**: Update the quantity of existing products.
* **Data Retrieval**: Fetch a paginated list of all products.

---

## Tech Stack

* **Backend**: Node.js, Express.js
* **Database**: MongoDB with Mongoose ODM
* **Authentication**: JSON Web Tokens (`jsonwebtoken`)
* **Password Hashing**: `bcryptjs`

---

## API Endpoints Summary

| Method | Endpoint                    | Description                  | Auth Required |
| :----- | :-------------------------- | :--------------------------- | :------------ |
| `POST` | `/api/register`             | Register a new user          | No            |
| `POST` | `/api/login`                | Login an existing user       | No            |
| `POST` | `/api/products`             | Add a new product            | Yes           |
| `GET`  | `/api/products`             | Get a list of all products   | Yes           |
| `PUT`  | `/api/products/:id/quantity`| Update a product's quantity  | Yes           |

---

## Prerequisites

Before you begin, ensure you have the following installed:
* [Node.js](https://nodejs.org/) (v14 or later recommended)
* [npm](https://www.npmjs.com/)
* [MongoDB](https://www.mongodb.com/try/download/community) (or a MongoDB Atlas account)
* [Python](https://www.python.org/downloads/) (for running the test script)

---

## Setup and Installation

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/your-username/inventory-project.git](https://github.com/your-username/inventory-project.git)
    cd inventory-project/backend
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Create an environment file:**
    Create a file named `.env` in the `backend` folder and add the following variables.

    ```env
    # Your MongoDB connection string
    MONGO_URL=mongodb+srv://<user>:<password>@<cluster-url>/inventory_management?retryWrites=true&w=majority

    # A strong, secret key for signing JWTs
    JWT_SECRET=your_super_strong_secret_key

    # The port for the server to run on
    PORT=5000
    ```

4.  **Start the server:**
    ```bash
    node index.js
    ```
    The server should now be running on `http://localhost:5000`.

---

## Testing

This project comes with a Python test script to validate all endpoints.

1.  **Install test dependencies:**
    ```bash
    pip install requests
    ```

2.  **Configure the test script:**
    Open the `test_api.py` file and ensure the `BASE_URL` is set to your server's address:
    ```python
    BASE_URL = "http://localhost:5000/api"
    ```

3.  **Run the tests:**
    Make sure your backend server is running, then execute the script from the project's root directory:
    ```bash
    py test_api.py
    ```

---

## API Documentation

For detailed information on all available endpoints, request bodies, and responses, please see the [API Documentation](./API_DOCUMENTATION.md) file.