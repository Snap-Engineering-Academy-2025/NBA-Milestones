const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());

app.get('/api/players/:teamID', async (req, res) => {
    const { teamID } = req.params;

    try {
        const response = await fetch(`https://www.thesportsdb.com/api/v2/json/list/players/${teamID}`, {
            headers: {
                'X-API-KEY': '168966',
                'Accept': 'application/json'
            }
        });

        if (!response.ok) {
            const text = await response.text();   // get raw text response
            console.error(`TheSportsDB error: status ${response.status} — ${text}`);
            return res.status(500).json({ error: `TheSportsDB responded with status ${response.status}`, details: text });
        }

        const data = await response.json();
        res.json(data);

    } catch (error) {
        console.error('Fetch error:', error);
        res.status(500).json({ error: 'Fetch error from TheSportsDB', details: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Proxy server running at http://localhost:${PORT}`);
});