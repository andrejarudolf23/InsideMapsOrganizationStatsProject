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

        if (data.trim().length == 0) {
            //console.log("IT IS EMPTY");
            return res.json("Empty");            
        }

        try {
           // console.log("DATA IS: " + JSON.stringify(data));
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

router.get('/api/stats/:month/:orgId', (req, res) => {

    const yearMonth = req.params.month;
    const orgId = req.params.orgId;
    //console.log("yearMonth is: " + yearMonth);

    fs.readFile(statsFilePath, 'utf-8', (err, data) => {
        if (err){
            return res.status(500).json({ error: 'Error reading file' });
        }

        if (data.trim().length == 0) {
            //console.log("IT IS EMPTY");
            return res.json("Empty");            
        }

        try {
           // console.log("DATA IS: " + JSON.stringify(data));
            const stats = JSON.parse(data);

            const result = {};

            for (const key in stats) {   
                if (key == orgId) {
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