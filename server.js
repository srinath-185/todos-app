const express = require("express");
const { initializeDB, router } = require("./api");
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');

// Load the Swagger YAML file
const swaggerDocument = YAML.load('./swagger.yaml');

const app = express();
app.use(express.json()); // To parse JSON body

// Apply middleware globally to ensure the database is initialized before handling requests
app.use(async (req, res, next) => {
  if (!global.dbInitialized) {
    await initializeDB(); // Initialize DB if not already done
    global.dbInitialized = true; // Set the flag to prevent re-initialization
  }
  next();
});

// Use task routes from api.js
app.use("/api/task", router);

// Serve Swagger API documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/api-docs`);
});

app.get("/", (req, res) => {
  res.send("Server is running");
});
