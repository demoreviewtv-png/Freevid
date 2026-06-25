const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
app.use(cors()); // Allows your HTML page to talk to this server

const VIDEO_DIR = path.join(__dirname, 'videos'); // Path to your video folder

// 1. Automatically serves the actual video files
app.use('/files', express.static(VIDEO_DIR));

// 2. An API endpoint that dynamically reads and returns the video list
app.get('/api/videos', (req, res) => {
    fs.readdir(VIDEO_DIR, (err, files) => {
        if (err) return res.status(500).json({ error: "Cannot read folder" });
        // Filter out only video files
        const videoFiles = files.filter(file => /\.(mp4|webm|mkv|avi)$/i.test(file));
        res.json(videoFiles);
    });
});

app.listen(3000, () => console.log('Video server running on port 3000'));
