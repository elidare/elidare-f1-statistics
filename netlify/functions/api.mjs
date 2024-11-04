import express, { Router } from "express";
import serverless from "serverless-http";
import axios from "axios";
import path from 'path';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { parseBody } from "./utils.mjs";

const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory
let options = {
    host: 'ergast.com',
    path: '/api/f1/',
    circuits: '/circuits.json'
}

const api = express();
const router = Router();

api.use(express.json());

router.post("/circuits", async (req, res) => {
    let body = parseBody(req);
    let year = body?.year || "2019"; // TODO magic numbers // todo req.body
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

// Allow CORS from any origin (use with caution)
api.use(cors());

api.use("/api/", router);

// Serve the static files from the React app
api.use(express.static(path.join(__dirname, '../../frontend')));  // TODO bundling

// Route to serve the React app
api.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontend/public', 'index.html'));
});

export const handler = serverless(api);

// // TODO delete or rewrite
// // for local development
// const PORT = process.env.PORT || 3000;
// api.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });