const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');

const statsFilePath = path.join(__dirname, '..', 'stats.json');

router.get('/api/stats/:month', (req, res) => {

    const yearMonth = req.params.month;
    //console.log("yearMonth is: " + yearMonth);

    fs.readFile(statsFilePath, 'utf-8', (err, data) => {
        if (err){
            return res.status(500).json({ error: 'Error reading file' });
        }

        try {
            const stats = JSON.parse(data);
            const result = {};

            for (const key in stats) {                
                if (stats[key][yearMonth]) {
                    result[key] = stats[key][yearMonth];
                }
            }

            res.json(result);

        } catch (error) {
            res.status(500).json({ error: 'Error parsing JSON 2323' });
        }
        

    })
})

module.exports = router;