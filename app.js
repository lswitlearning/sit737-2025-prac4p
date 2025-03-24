const express = require("express");
const winston = require("winston");
const fs = require("fs");

const app = express();
const port = 3000;

//Check if 'logs' directory exists, if not, create it
if (!fs.existsSync("logs")) {
  fs.mkdirSync("logs");
}

//configure winston logger
const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  defaultMeta: { service: "calculator-microservice" },
  transports: [
    new winston.transports.Console({ format: winston.format.simple() }),
    new winston.transports.File({ filename: "logs/error.log", level: "error" }),
    new winston.transports.File({ filename: "logs/combined.log" }),
  ],
});

// Middleware to log incoming requests
app.use((req, res, next) => {
  logger.info(`Incoming request: ${req.method} ${req.url}`);

  res.on("finish", () => {
    logger.info(`Request completed with statusCode: ${res.statusCode}`);
  });

  next();
});

// Addition route
app.get("/add", (req, res) => {
  try {
    const { num1, num2 } = req.query;

    // Check if any of the parameters is missing
    if (num1 === undefined || num2 === undefined || num1 === '' || num2 === '') {
      // logger.error(`Missing parameters: num1=${n1}, num2=${n2}`); same with below, we can use the logger.error
      logger.log({
        level: "error", // Log error if parameters are missing
        message: `Missing parameters: num1=${num1}, num2=${num2}`,
      });
      return res
        .status(400)
        .json({
          statuscode: 400,
          error: "Please provide num1 and num2 parameters",
        });
    }

    const n1 = parseFloat(num1);
    const n2 = parseFloat(num2);

    // Check if the parameters are valid numbers
    if (isNaN(n1) || isNaN(n2)) {
      logger.log({
        level: "error", // Log error if numbers are invalid
        message: `Invalid number input: num1=${n1}, num2=${n2}`,
      });
      return res
        .status(400)
        .json({ statuscode: 400, error: "Please provide valid numbers" });
    }

    // Perform the addition operation
    const result = n1 + n2;
    logger.log({
      level: "info", // Log successful addition operation
      message: `Addition operation: ${n1} + ${n2} = ${result}`,
    });

    return res.status(200).json({ statuscode: 200, Result: result });
  } catch (error) {
    // logger.error(`Internal server error: ${error.message}`);
    logger.log({
      level: "error", // Log internal server error
      message: `Internal server error: ${error.message}`,
    });
  }
});

// Subtraction route
app.get("/subtract", (req, res) => {
  try {
    const { num1, num2 } = req.query;

    if (num1 === undefined || num2 === undefined || num1 === '' || num2 === '') {
      //logger.error(`Missing parameters: num1=${n1}, num2=${n2}`);
      logger.log({
        level: "error", // Log error if parameters are missing
        message: `Missing parameters: num1=${num1}, num2=${num2}`,
      });
      return res
        .status(400)
        .json({
          statuscode: 400,
          error: "Please provide num1 and num2 parameters",
        });
    }

    const n1 = parseFloat(num1);
    const n2 = parseFloat(num2);

    if (isNaN(n1) || isNaN(n2)) {
      //logger.error(`Invalid number input: num1=${n1}, num2=${n2}`);
      logger.log({
        level: "error", // Log error if numbers are invalid
        message: `Invalid number input: num1=${n1}, num2=${n2}`,
      });
      return res
        .status(400)
        .json({ statuscode: 400, error: "Please provide valid numbers" });
    }

    const result = n1 - n2;
    //logger.info(`Subtract operation: ${n1} - ${n2} = ${result}`);
    logger.log({
      level: "info", // Log successful subtraction operation
      message: `Subtraction operation: ${n1} - ${n2} = ${result}`,
    });

    return res.status(200).json({ statuscode: 200, Result: result });
  } catch (error) {
    //logger.error(`Internal server error: ${error.message}`);
    logger.log({
      level: "error", // Log internal server error
      message: `Internal server error: ${error.message}`,
    });
  }
});

// Multiplication route
app.get("/multiply", (req, res) => {
  try {
    const { num1, num2 } = req.query;

    if (num1 === undefined || num2 === undefined || num1 === '' || num2 === '') {
      //logger.error(`Invalid number input: num1 = ${n1} num2 =${n2}`);
      logger.log({
        level: "error", // Log error if parameters are missing
        message: `Missing parameters: num1=${num1}, num2=${num2}`,
      });
      return res
        .status(400)
        .json({
          statuscode: 400,
          error: "Please provide num1 and num2 parameters",
        });
    }

    const n1 = parseFloat(num1);
    const n2 = parseFloat(num2);

    if (isNaN(n1) || isNaN(n2)) {
      //logger.error(`Invalid number input: num1 = ${n1} num2 = ${n2}`);
      logger.log({
        level: "error", // Log error if numbers are invalid
        message: `Invalid number input: num1=${n1}, num2=${n2}`,
      });
      return res
        .status(400)
        .json({ statuscode: 400, error: "Please provide valid numbers" });
    }

    const result = n1 * n2;
    //logger.info(`Multiply operation: ${n1} * ${n2} = ${result}`);
    logger.log({
      level: "info", // Log successful multiplication operation
      message: `Multiply operation: ${n1} * ${n2} = ${result}`,
    });
    return res.status(200).json({ statuscode: 200, Result: result });
  } catch (error) {
    //logger.error(`Internal server error: ${error.message}`);
    logger.log({
      level: "error", // Log internal server error
      message: `Internal server error: ${error.message}`,
    });
  }
});

// Division route
app.get("/divide", (req, res) => {
  try {
    const { num1, num2 } = req.query;

    if (num1 === undefined || num2 === undefined || num1 === '' || num2 === '') {
      //logger.error(`Invalid number input: num1 = ${n1} num2 =${n2}`)
      logger.log({
        level: "error", // Log error if parameters are missing
        message: `Missing parameters: num1=${num1}, num2=${num2}`,
      });
      return res
        .status(400)
        .json({ statuscode: 400, error: "Please provide num1 and num2 parameters" });
    }

    const n1 = parseFloat(num1);
    const n2 = parseFloat(num2);

    if (isNaN(n1) || isNaN(n2)) {
      //logger.error(`Invalid number input: num1 = ${n1} num2 =${n2}`)
      logger.log({
        level: "error", // Log error if numbers are invalid
        message: `Invalid number input: num1=${n1}, num2=${n2}`,
      });
      return res
        .status(400)
        .json({ statuscode: 400, error: "Please provide valid numbers" });
    }

    // Check for division by zero
    if (n2 === 0) {
      //logger.error(`Division by zero is not allowed" : num1 = ${n1}, num2 = ${n2}`)
      logger.log({
        level: "error", // Log error for division by zero
        message: `Division by zero: num1=${n1}, num2=${n2}`,
      });
      return res
        .status(400)
        .json({ statuscode: 400, error: "Division by zero is not allowed" });
    }

    const result = n1 / n2;
    //logger.info(`Divide operation: num1 = ${n1} / num2 = ${n2}`)
    logger.log({
      level: "info", // Log successful division operation
      message: `Divide operation: num1=${n1} / num2=${n2}`,
    });
    return res.status(200).json({ statuscode: 200, Result: result });
  } catch (error) {
    //logger.error(`Internal server error: ${error.message}`);
    logger.log({
      level: "error", // Log internal server error
      message: `Internal server error: ${error.message}`,
    });
  }
});

// Start the server and log the status
app.listen(port, () => {
  console.log(`Calculator microservice running at http://localhost:${port}`);
  //logger.info(`Server started on port ${port}`);
  logger.log({
    level: "info", // Log server startup with 'info' level
    message: `Server started on port ${port}`,
  });
});
