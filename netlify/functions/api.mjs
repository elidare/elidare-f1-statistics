import express, { Router } from "express";
import serverless from "serverless-http";
import dotenv from 'dotenv';
import axios from "axios";
import path from 'path';
import cors from 'cors';
import { fileURLToPath } from 'url';

// API options
let options = {
    host: 'ergast.com',
    path: '/api/f1/',
    circuits: '/circuits.json'
}

dotenv.config();

// Netlify builds the modules as CommonJS, no matter what.
// ▲ [WARNING] "import.meta" is not available with the "cjs" output format and will be empty [empty-import-meta]
// https://github.com/netlify/cli/issues/4601
const __filename = process.env.IS_NETLIFY_PROD || process.env.IS_NETLIFY_DEV ? __filename : fileURLToPath(import.meta.url);  // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory

const api = express();
const router = Router();
const PORT = process.env.EXPRESS_PORT || 5000;

api.use(express.json());

router.post("/circuits", async (req, res) => {
    let year = req.body?.year || "2019"; // TODO magic numbers
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
// api.use(express.static(path.join(__dirname, '../../frontend')));  // TODO bundling

// Route to serve the React app
// api.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, '../../frontend/public', 'index.html'));
// }); // TODO site not found

// api.get('/', (req, res) => {
//     res.send('Hello'); // TODO delete
// });

export const handler = serverless(api);

// for local development
if (!process.env.IS_NETLIFY_PROD && !process.env.IS_NETLIFY_DEV) {
    api.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}
