import express, { Router } from "express";
import serverless from "serverless-http";
import axios from "axios";

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
    //let year = req.body?.year || "2024"; // TODO magic numbers
    let limit = req.query?.limit || "30";

    console.log(req.body, req.body?.year);

    let body;
    
    // Check if event.body exists and parse it if it's JSON
    if (req.body) {
        try {
            body = JSON.parse(req.body);
        } catch (error) {
            console.error("Invalid JSON", error);
            return {
                statusCode: 400,
                body: JSON.stringify({ message: "Invalid JSON" })
            };
        }
    }

    // Access the "year" property if it exists
    const year = body?.year;
    console.log("Year:", year); // Should display the value if parsed correctly

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
