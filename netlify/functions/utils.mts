// Netlify functions use AWS Lambda, which doesn’t automatically parse JSON bodies in the request.
// Unlike Express, Netlify requires you to parse req.body manually.
export function parseBody(event: any) {
    let body;

    // Check if event.body exists and parse it if it's JSON
    if (event.body) {
        try {
            body = JSON.parse(event.body);
        } catch (error) {
            console.error("Invalid JSON", error);
            return JSON.stringify({ message: "Invalid JSON" });
        }
    }

    return body;
};
