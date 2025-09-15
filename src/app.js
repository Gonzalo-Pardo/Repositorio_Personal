require("dotenv").config(); 
const express = require("express");
const { sequelize } = require("./src/models/databases"); 
const routes = require("./src/routes/api");              

const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.json());


async function startServer() {
  try {
    await sequelize.authenticate();
    console.log("Database connected");

    
    await sequelize.sync(); 
    console.log("DB is ready");

   
    app.use("/api", routes);

    
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });

  } catch (error) {
    console.error("Error al iniciar la app:", err);
  }
}

startServer();
