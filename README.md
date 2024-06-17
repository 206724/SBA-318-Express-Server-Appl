travel-agency-api/
├── public/
│   └── styles.css
├── views/
│   └── index.ejs
├── data/
│   ├── destinations.json
│   ├── packages.json
│   └── bookings.json
├── routes/
│   ├── destinations.js
│   ├── packages.js
│   └── bookings.js
├── middleware/
│   ├── errorHandler.js
│   └── logger.js
├── app.js
└── package.json


## Setup

1. **Clone the repository:**
   ```bash
   git clone[ https://github.co](https://github.com/206724/SBA-318-Express-Server-Appl.git



2. **Install dependencies:**
   
   npm install
 

3. **Run the application:**

   nodemon app.js


4. **Open your browser and navigate to:**

   http://localhost:3000


## API Endpoints

### Destinations

- **GET /api/destinations**
  - Get all destinations.

- **GET /api/destinations/:id**
  - Get a destination by ID.

- **POST /api/destinations**
  - Create a new destination.
  - Request body:
    ```json
    {
      "name": "Paris",
      "description": "The city of light.",
      "country": "France"
    }
    ```

- **PUT /api/destinations/:id**
  - Update a destination by ID.
  - Request body:
    ```json
    {
      "name": "Paris",
      "description": "The city of light.",
      "country": "France"
    }
    ```

- **DELETE /api/destinations/:id**
  - Delete a destination by ID.

- **GET /api/destinations/filter/:country**
  - Filter destinations by country.

### Packages

- **GET /api/packages**
  - Get all packages.

- **GET /api/packages/:id**
  - Get a package by ID.

- **POST /api/packages**
  - Create a new package.
  - Request body:
    ```json
    {
      "destinationId": 1,
      "name": "Romantic Paris",
      "price": 2000
    }
    ```

- **PUT /api/packages
