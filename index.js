const express = require('express');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 5000;

app.get('/me', async (req, res) => {
    try {
        const factResponse = await axios.get('https://catfact.ninja/fact', {timeout: 5000});
        const catFact = factResponse.data.fact;
        console.log("Fetched cat fact:", catFact);
        // building the response obj
        const response = {
            status: "success",
            user: {
                email: "elijahvix695@gmail.com",
                name: "Elijah Victor",
                stack: "Node.js/Express"
            },
            timestamp: new Date().toISOString(),
            fact: catFact
        };

        res.status(200).json(response);
    } catch (error) {
        console.error("Error fetching cat fact:", error.message);
        
        // fallback
        const response = {
            status: "success",
            user: {
                email: "elijahvix695@gmail.com",
                name: "Elijah Victor",
                stack: "Node.js/Express"
            },
            timestamp: new Date().toISOString(),
            fact: "Cats facts are currently unavailable. Please try again later."
        };
        res.status(200).json(response);
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});