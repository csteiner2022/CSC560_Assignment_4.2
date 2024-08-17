import * as express from "express";
import { ObjectId } from "mongodb";
import { collections } from "./database";

export const playerRouter = express.Router();
playerRouter.use(express.json());

//Highest Scorer
playerRouter.get('/highest-scorer', async (req, res) => {
    try {
        const topPlayer = await collections?.players?.find().sort({ points_per_game: -1 }).limit(1).toArray();
        res.status(200).json(topPlayer);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

//Most Assists
playerRouter.get('/most-assists', async (req, res) => {
    try {
        const topPlayer = await collections?.players?.find().sort({ assists_per_game: -1 }).limit(1).toArray();
        res.status(200).json(topPlayer);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

//Lowest Scorer
playerRouter.get('/lowest-scorer', async (req, res) => {
    try {
        const topPlayer = await collections?.players?.find().sort({ points_per_game: 1 }).limit(1).toArray();
        res.status(200).json(topPlayer);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

//Small Forwards
playerRouter.get('/small-forwards', async (req, res) => {
    try {
        const topPlayer = await collections?.players?.find({position: "SF"}).toArray();
        res.status(200).json(topPlayer);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

//Top Five Stealers
playerRouter.get('/top-five-stealers', async (req, res) => {
    try {
        const topPlayer = await collections?.players?.find().sort({ steals_per_game: -1 }).limit(5).toArray();
        res.status(200).json(topPlayer);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

// GET all players
playerRouter.get("/", async (_req, res) => {
    try {
        const players = await collections?.players?.find({}).toArray();
        res.status(200).send(players);
    } catch (error) {
        res.status(500).send(error instanceof Error ? error.message : "Unknown error");
    }
});

// GET player by ID
playerRouter.get("/:id", async (req, res) => {
    try {
        const id = req?.params?.id;
        const query = { _id: new ObjectId(id) };
        const player = await collections?.players?.findOne(query);

        if (player) {
            res.status(200).send(player);
        } else {
            res.status(404).send(`Failed to find a player: ID ${id}`);
        }
    } catch (error) {
        res.status(404).send(`Failed to find a player: ID ${req?.params?.id}`);
    }
});

// POST a new player
playerRouter.post("/", async (req, res) => {
    try {
        const player = req.body;
        const result = await collections?.players?.insertOne(player);

        if (result?.acknowledged) {
            res.status(201).send(`Created a new player: ID ${result.insertedId}.`);
        } else {
            res.status(500).send("Failed to create a new player.");
        }
    } catch (error) {
        console.error(error);
        res.status(400).send(error instanceof Error ? error.message : "Unknown error");
    }
});

// PUT (update) an existing player by ID
playerRouter.put("/:id", async (req, res) => {
    try {
        const id = req?.params?.id;
        const player = req.body;
        const query = { _id: new ObjectId(id) };
        const result = await collections?.players?.updateOne(query, { $set: player });

        if (result && result.matchedCount) {
            res.status(200).send(`Updated a player: ID ${id}.`);
        } else if (!result?.matchedCount) {
            res.status(404).send(`Failed to find a player: ID ${id}`);
        } else {
            res.status(304).send(`Failed to update a player: ID ${id}`);
        }
    } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error";
        console.error(message);
        res.status(400).send(message);
    }
});

// DELETE a player by ID
playerRouter.delete("/:id", async (req, res) => {
    try {
        const id = req?.params?.id;
        const query = { _id: new ObjectId(id) };
        const result = await collections?.players?.deleteOne(query);

        if (result && result.deletedCount) {
            res.status(202).send(`Removed a player: ID ${id}`);
        } else if (!result) {
            res.status(400).send(`Failed to remove a player: ID ${id}`);
        } else if (!result.deletedCount) {
            res.status(404).send(`Failed to find a player: ID ${id}`);
        }
    } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error";
        console.error(message);
        res.status(400).send(message);
    }
});




