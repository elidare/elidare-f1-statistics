import express, { Router } from "express";
import serverless from "serverless-http";
import dotenv from 'dotenv';
import axios from "axios";
import path from 'path';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { parseBody } from "./utils.mjs";

dotenv.config();

console.log('process.env.NETLIFY', process.env.NETLIFY);
console.log('process.env.NODE_ENV', process.env.NODE_ENV);

// node .\netlify\functions\api.mjs
// process.env.NETLIFY undefined
// process.env.NODE_ENV development

// netlify dev
// process.env.NETLIFY undefined
// process.env.NODE_ENV development
//

const __filename = __filename; // get the resolved path to the file
// https://github.com/netlify/cli/issues/4601
// ▲ [WARNING] "import.meta" is not available with the "cjs" output format and will be empty [empty-import-meta]
// netlify builds the modules as CommonJS, no matter what.

const __dirname = path.dirname(__filename); // get the name of the directory

// console.log('import.meta.url: ', import.meta.url);
// console.log('__filename: ', __filename);
// console.log('__dirname: ', __dirname);

let options = {
    host: 'ergast.com',
    path: '/api/f1/',
    circuits: '/circuits.json'
}

const api = express();
const router = Router();
const PORT = process.env.EXPRESS_PORT || 5000;
const API_BASE_URL = process.env.API_BASE_URL || 'https://elidare-f1-statistics.netlify.app/.netlify/functions/api';

api.use(express.json());

router.post("/circuits", async (req, res) => {
    // let body = parseBody(req);
    let year = req.body?.year || "2019"; // TODO magic numbers // todo req.body
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

// TODO delete or rewrite
// for local development

// api.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });