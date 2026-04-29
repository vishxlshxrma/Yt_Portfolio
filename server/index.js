const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { MongoClient } = require("mongodb");

dotenv.config({ override: true });

const PORT = Number(process.env.PORT || 5001);
const RAW_MONGODB_URI = process.env.MONGODB_URI;
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || "http://localhost:3000";

if (!RAW_MONGODB_URI) {
  throw new Error("MONGODB_URI is required in server/.env");
}

const validateMongoUriHost = (uri) => {
  try {
    const parsed = new URL(uri);
    const host = parsed.host || "";
    if (!host || /^\d+$/.test(host) || !host.includes(".")) {
      throw new Error(
        "Invalid MongoDB host in MONGODB_URI. Check server/.env and ensure it uses your Atlas host (example: cluster0.xxxxx.mongodb.net)."
      );
    }
  } catch (error) {
    throw new Error(
      `Invalid MONGODB_URI format. ${error.message}. Also ensure special characters in password are URL-encoded.`
    );
  }
};

const normalizeMongoUriCredentials = (uri) => {
  if (!uri || !uri.includes("://")) return uri;

  const [scheme, rest] = uri.split("://");
  if (!rest) return uri;

  const atIndex = rest.lastIndexOf("@");
  if (atIndex === -1) return uri;

  const authPart = rest.slice(0, atIndex);
  const hostPart = rest.slice(atIndex + 1);
  const colonIndex = authPart.indexOf(":");
  if (colonIndex === -1) return uri;

  const username = authPart.slice(0, colonIndex);
  const password = authPart.slice(colonIndex + 1);
  const encodedUsername = encodeURIComponent(decodeURIComponent(username));
  const encodedPassword = encodeURIComponent(decodeURIComponent(password));
  return `${scheme}://${encodedUsername}:${encodedPassword}@${hostPart}`;
};

const MONGODB_URI = normalizeMongoUriCredentials(RAW_MONGODB_URI);
validateMongoUriHost(MONGODB_URI);

const app = express();

const allowedOrigins = new Set([CLIENT_ORIGIN, "http://localhost:3000", "http://127.0.0.1:3000"]);

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.has(origin)) {
        callback(null, true);
        return;
      }
      callback(new Error("Not allowed by CORS"));
    },
  })
);
app.use(express.json({ limit: "1mb" }));

const mongoClient = new MongoClient(MONGODB_URI);
let db;

const getDatabaseName = (uri) => {
  try {
    const parsed = new URL(uri);
    const pathname = String(parsed.pathname || "").replace("/", "").trim();
    return pathname || "youtube_portfolio";
  } catch (error) {
    const uriWithoutQuery = String(uri || "").split("?")[0];
    const tail = uriWithoutQuery.split("/").filter(Boolean).pop();
    if (!tail || tail.includes("@") || tail.includes(":")) {
      return "youtube_portfolio";
    }
    return tail;
  }
};

const sanitizeString = (value) => {
  if (typeof value !== "string") return "";
  return value.trim();
};

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const ensureStatsDocument = async () => {
  const collection = db.collection("portfolio_stats");
  const existing = await collection.findOne({ key: "home" });

  if (existing) {
    // One-time migration from old seeded likes (126) to requested baseline (0).
    if (existing.likes === 126 && !existing.likesBaselineV2) {
      const now = new Date();
      const migrated = await collection.findOneAndUpdate(
        { key: "home" },
        {
          $set: {
            likes: 0,
            likesBaselineV2: true,
            updatedAt: now,
          },
        },
        { returnDocument: "after" }
      );
      return migrated?.value || migrated;
    }
    return existing;
  }

  const now = new Date();
  const initialDoc = {
    key: "home",
    views: 0,
    likes: 0,
    likesBaselineV2: true,
    createdAt: now,
    updatedAt: now,
  };
  await collection.insertOne(initialDoc);
  return initialDoc;
};

const getStatsResponse = (doc) => ({
  success: true,
  views: Number(doc?.views ?? 0),
  likes: Number(doc?.likes ?? 0),
});

app.get("/api/health", (_req, res) => {
  res.json({
    success: true,
    message: "Portfolio backend is running",
  });
});

app.post("/api/contact", async (req, res) => {
  try {
    const payload = req.body || {};
    const type = sanitizeString(payload.type);
    const yourName = sanitizeString(payload.yourName);
    const email = sanitizeString(payload.email);
    const message = sanitizeString(payload.message);

    if (!type) {
      return res.status(400).json({ success: false, message: "Contact type is required." });
    }
    if (!yourName) {
      return res.status(400).json({ success: false, message: "Your name is required." });
    }
    if (!email) {
      return res.status(400).json({ success: false, message: "Email is required." });
    }
    if (!emailRegex.test(email)) {
      return res.status(400).json({ success: false, message: "Please provide a valid email." });
    }
    if (!message) {
      return res.status(400).json({ success: false, message: "Message is required." });
    }

    const contactDoc = {
      type,
      formData: {
        yourName,
        companyName: sanitizeString(payload.companyName),
        position: sanitizeString(payload.position),
        email,
        phone: sanitizeString(payload.phone),
        message,
        projectType: sanitizeString(payload.projectType),
        budget: sanitizeString(payload.budget),
        timeline: sanitizeString(payload.timeline),
        role: sanitizeString(payload.role),
        interests: sanitizeString(payload.interests),
        portfolio: sanitizeString(payload.portfolio),
        communication: sanitizeString(payload.communication),
      },
      source: "portfolio-contact-modal",
      status: "new",
      createdAt: new Date(),
      userAgent: sanitizeString(req.headers["user-agent"]),
      ip: sanitizeString(
        (req.headers["x-forwarded-for"] || "").toString().split(",")[0] || req.socket?.remoteAddress || ""
      ),
    };

    await db.collection("contacts").insertOne(contactDoc);

    return res.json({
      success: true,
      message: "Contact request saved successfully.",
    });
  } catch (error) {
    console.error("POST /api/contact error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to save contact request.",
    });
  }
});

app.get("/api/stats", async (_req, res) => {
  try {
    const statsDoc = await ensureStatsDocument();
    return res.json(getStatsResponse(statsDoc));
  } catch (error) {
    console.error("GET /api/stats error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch portfolio stats.",
    });
  }
});

app.post("/api/stats/view", async (_req, res) => {
  try {
    const now = new Date();
    const result = await db.collection("portfolio_stats").findOneAndUpdate(
      { key: "home" },
      {
        $inc: { views: 1 },
        $set: { updatedAt: now },
        $setOnInsert: {
          key: "home",
          likes: 0,
          likesBaselineV2: true,
          createdAt: now,
        },
      },
      { upsert: true, returnDocument: "after" }
    );
    const statsDoc = result?.value || result;
    return res.json(getStatsResponse(statsDoc));
  } catch (error) {
    console.error("POST /api/stats/view error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to increment view count.",
    });
  }
});

app.post("/api/stats/like", async (_req, res) => {
  try {
    const now = new Date();
    const result = await db.collection("portfolio_stats").findOneAndUpdate(
      { key: "home" },
      {
        $inc: { likes: 1 },
        $set: { updatedAt: now },
        $setOnInsert: {
          key: "home",
          views: 0,
          likesBaselineV2: true,
          createdAt: now,
        },
      },
      { upsert: true, returnDocument: "after" }
    );
    const statsDoc = result?.value || result;
    return res.json(getStatsResponse(statsDoc));
  } catch (error) {
    console.error("POST /api/stats/like error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to increment like count.",
    });
  }
});

const startServer = async () => {
  try {
    await mongoClient.connect();
    const dbName = getDatabaseName(MONGODB_URI);
    db = mongoClient.db(dbName);
    console.log(`Connected to MongoDB database: ${dbName}`);

    app.listen(PORT, () => {
      console.log(`Portfolio backend listening on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start backend:", error);
    process.exit(1);
  }
};

startServer();
