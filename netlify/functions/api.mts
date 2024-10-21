import express, { Router } from "express";
import serverless from "serverless-http";
import axios from "axios";

let options = {
    host: 'ergast.com',
    port: 80,
    path: '/api/f1/circuits.json',
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  }

const api = express();

const router = Router();
router.get("/hello", (req, res) => {
    res.send("Hello World!")
});

router.get("/data", async (req, res) => {
    try {
        const apiUrl = `http://${options.host}${options.path}`;
        const response = await axios.get(apiUrl);
        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while fetching data' });
    }
});

api.use("/api/", router);

export const handler = serverless(api);
