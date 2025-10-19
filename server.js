require("dotenv").config();
const express = require("express");
const axios = require("axios");

const app = express();
const PORT = process.env.PORT || 3000;

//Middleware
app.use(express.json());

// cors headers
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// rate limiting
const rateLimit = new Map();
const RATE_LIMIT_WINDOW = 60000;
const MAX_REQUESTS_PER_WINDOW = 30;

const rateLimiter = (req, res, next) => {
  const ip = req.ip || req.connection.remoteAddress;
  const now = Date.now();

  if (!rateLimit.has(ip)) {
    rateLimit.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return next();
  }

  const record = rateLimit.get(ip);

  if (now > record.resetTime) {
    record.count = 1;
    record.resetTime = now + RATE_LIMIT_WINDOW;
    return next();
  }

  if (record.count > MAX_REQUESTS_PER_WINDOW) {
    return res.status(429).json({
      status: "error",
      message: "Too many requests. Please try again later.",
    });
  }

  record.count++;
  next();
};

async function fetchCatFact() {
  try {
    const response = await axios.get("https://catfact.ninja/fact", {
      timeout: 5000,
      headers: {
        Accept: "application/json",
      },
    });
    return response.data.fact;
  } catch (error) {
    console.error("Error fetching cat fact:", error.message);
    // Fallback incase api fails
    return "Cats sleep for about 70% of their lives. (this is a fallback fact - external API unavailable)";
  }
}

// edpoint
app.get("/me", rateLimiter, async (req, res) => {
  try {
    const catFact = await fetchCatFact();

    const timestamp = new Date().toISOString();

    // response
    const response = {
      status: "success",
      user: {
        email: "elijahvix695@gmail.com",
        name: "Elijah Victor",
        stack: "Node.js/Express",
      },
      timestamp: timestamp,
      fact: catFact,
    };

    res.setHeader("Content-Type", "application/json");
    res.status(200).json(response);
  } catch (error) {
    console.error("Error in /me endpoint:", error);
    res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
});

// health check
app.get("/", (req, res) => {
  res.json({
    status: "ok",
    message: "Backend API task - Stage 0",
    endpoints: {
      profile: "/me",
    },
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    status: "error",
    message: "Endpoint not found",
  });
});

// start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📍 Profile endpoint: http://localhost:${PORT}/me`);
});

// SHUTDOWN
process.on("SIGTERM", () => {
  console.log("SIGTERM received. Shutting down gracefully...");
  process.exit(0);
});
