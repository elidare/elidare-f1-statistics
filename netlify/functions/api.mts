import express, { Router } from "express";
import serverless from "serverless-http";
import axios from "axios";
import { parseBody } from "./utils.mts";

let options = {
    host: 'ergast.com',
    path: '/api/f1/',
    circuits: '/circuits.json'
}

const api = express();
const router = Router();

// experimental, should be deleted later
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

router.post("/circuits", async (req, res) => {
    let body = parseBody(req);
    let year = body?.year || "2024"; // TODO magic numbers
    let limit = req.query?.limit || "30";

    try {
        let queryParams = { limit: limit };
        const apiUrl = `http://${options.host}${options.path}${year}${options.circuits}`; 
        const response = await axios.get(apiUrl, { params: queryParams });
        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while fetching data' });
    }
});

api.use("/api/", router);

export const handler = serverless(api);
