const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;

const app = express();
const port = process.env.PORT || 5000;

app.use(
  cors()
);
app.use(express.json());

const uri = `mongodb+srv://${process.env.EVENT_USER}:${process.env.EVENT_PASS}@nextauthdb.4uukzvs.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    const db = client.db("eventDB");
    const eventsCollection = db.collection("events");
    const usersCollection = db.collection("users");

    // User Registration
    app.post("/api/auth/register", async (req, res) => {
      try {
        const { name, email, password } = req.body;

        // Validation
        if (!name || !email || !password) {
          return res.status(400).json({ error: "All fields are required" });
        }

        if (password.length < 6) {
          return res
            .status(400)
            .json({ error: "Password must be at least 6 characters" });
        }

        // Check if user already exists
        const existingUser = await usersCollection.findOne({ email });
        if (existingUser) {
          return res
            .status(400)
            .json({ error: "User already exists with this email" });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 12);

        // Create user
        const user = {
          name,
          email,
          password: hashedPassword,
          role: "user",
          createdAt: new Date(),
          updatedAt: new Date(),
        };

        const result = await usersCollection.insertOne(user);

        res.status(201).json({
          message: "User created successfully",
          user: {
            id: result.insertedId,
            name: user.name,
            email: user.email,
          },
        });
      } catch (error) {
        console.error("Registration error:", error);
        res.status(500).json({ error: "Internal server error" });
      }
    });

    // User Login
    app.post("/api/auth/login", async (req, res) => {
      try {
        const { email, password } = req.body;

        // Validation
        if (!email || !password) {
          return res
            .status(400)
            .json({ error: "Email and password are required" });
        }

        // Find user
        const user = await usersCollection.findOne({ email });
        if (!user) {
          return res.status(400).json({ error: "Invalid email or password" });
        }

        // Check password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
          return res.status(400).json({ error: "Invalid email or password" });
        }

        res.json({
          message: "Login successful",
          user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
          },
        });
      } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ error: "Internal server error" });
      }
    });

    // Google OAuth registration/login
    app.post("/api/auth/google", async (req, res) => {
      try {
        const { name, email, provider } = req.body;

        if (!name || !email) {
          return res.status(400).json({ error: "Name and email are required" });
        }

        // Check if user exists
        const existingUser = await usersCollection.findOne({ email });

        if (existingUser) {
          // Update existing user with Google provider info
          await usersCollection.updateOne(
            { email: email },
            {
              $set: {
                provider: provider,
                updatedAt: new Date(),
              },
            }
          );

          return res.json({
            message: "User updated with Google OAuth",
            user: {
              id: existingUser._id,
              name: existingUser.name,
              email: existingUser.email,
              role: existingUser.role,
            },
          });
        } else {
          // Create new user for Google OAuth
          const user = {
            name,
            email,
            provider: provider,
            role: "user",
            createdAt: new Date(),
            updatedAt: new Date(),
          };

          const result = await usersCollection.insertOne(user);

          return res.json({
            message: "User created with Google OAuth",
            user: {
              id: result.insertedId,
              name: user.name,
              email: user.email,
              role: user.role,
            },
          });
        }
      } catch (error) {
        console.error("Google OAuth error:", error);
        res.status(500).json({ error: "Internal server error" });
      }
    });

    // Events API
    app.get("/api/events", async (req, res) => {
      try {
        const { search, category } = req.query;
        let query = {};

        if (search) {
          query.$or = [
            { title: { $regex: search, $options: "i" } },
            { description: { $regex: search, $options: "i" } },
          ];
        }

        if (category && category !== "all") {
          query.category = category;
        }

        const events = await eventsCollection.find(query).toArray();
        res.json(events);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    });

    app.get("/api/events/:id", async (req, res) => {
      try {
        const event = await eventsCollection.findOne({
          _id: new ObjectId(req.params.id),
        });

        if (!event) {
          return res.status(404).json({ error: "Event not found" });
        }

        res.json(event);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    });

    app.post("/api/events", async (req, res) => {
      try {
        const event = {
          title: req.body.title,
          shortDescription: req.body.shortDescription,
          fullDescription: req.body.fullDescription,
          price: parseFloat(req.body.price),
          date: new Date(req.body.date),
          category: req.body.category,
          location: req.body.location,
          imageUrl: req.body.imageUrl || "/default-event.jpg",
          organizer: req.body.organizer,
          createdAt: new Date(),
          updatedAt: new Date(),
        };

        // Validation
        if (!event.title || !event.shortDescription || !event.fullDescription) {
          return res.status(400).json({ error: "All fields are required" });
        }

        const result = await eventsCollection.insertOne(event);
        res.status(201).json({
          message: "Event created successfully",
          event: { ...event, _id: result.insertedId },
        });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    });

    app.put("/api/events/:id", async (req, res) => {
      try {
        const event = {
          title: req.body.title,
          shortDescription: req.body.shortDescription,
          fullDescription: req.body.fullDescription,
          price: parseFloat(req.body.price),
          date: new Date(req.body.date),
          category: req.body.category,
          location: req.body.location,
          imageUrl: req.body.imageUrl,
          organizer: req.body.organizer,
          updatedAt: new Date(),
        };

        const result = await eventsCollection.updateOne(
          { _id: new ObjectId(req.params.id) },
          { $set: event }
        );

        if (result.matchedCount === 0) {
          return res.status(404).json({ error: "Event not found" });
        }

        res.json({ message: "Event updated successfully" });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    });

    app.delete("/api/events/:id", async (req, res) => {
      try {
        const result = await eventsCollection.deleteOne({
          _id: new ObjectId(req.params.id),
        });

        if (result.deletedCount === 0) {
          return res.status(404).json({ error: "Event not found" });
        }

        res.json({ message: "Event deleted successfully" });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    });

    // Get event categories
    app.get("/api/categories", async (req, res) => {
      try {
        const categories = await eventsCollection.distinct("category");
        res.json(categories);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    });

    // await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
}

run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Event Management Server is running!");
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
